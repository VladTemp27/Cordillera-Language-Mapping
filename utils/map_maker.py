"""
Cordillera Administrative Region (CAR) Map Maker

This script generates an interactive map of the Cordillera Administrative Region
with Baguio City highlighted as a separate feature.

Note: this might be changed based on the frontend requirements (React-leaflet)

Programmer: Benny Gil A. Lactaotao
"""

import os
import sys
import shapely
import folium
import geopandas as gpd
import pandas as pd
from folium.features import GeoJsonTooltip
from shapely.ops import unary_union
from shapely.geometry import Polygon, MultiPolygon, LinearRing

# Get the absolute path to the project directory
PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Import local modules
sys.path.append(PROJECT_DIR) 
from utils.map_filter import load_or_prepare_data, load_baguio_data

# Constants
REGION_CODE = "14"  # CAR region
REGION_NAME = "Cordillera Administrative Region (CAR)"

# Define data directory within utils
UTILS_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(UTILS_DIR, "data")

# Create data directory if it doesn't exist
os.makedirs(DATA_DIR, exist_ok=True)

# Fix shapefile path - use correct path structure without duplicate extensions
SHAPEFILE_PATH = os.path.join(DATA_DIR, "PH_Adm2_ProvDists.shp")
if not os.path.exists(SHAPEFILE_PATH):
    # Alternative path options if first path doesn't exist
    SHAPEFILE_PATH = os.path.join(PROJECT_DIR, "data", "PH_Adm2_ProvDists.shp")
    if not os.path.exists(SHAPEFILE_PATH):
        SHAPEFILE_PATH = os.path.join(PROJECT_DIR, "PH_Adm2_ProvDists.shp")

# Output paths
OUTPUT_DIR = DATA_DIR
OUTPUT_GEOJSON = os.path.join(OUTPUT_DIR, "car_provinces.geojson")
BAGUIO_GEOJSON = os.path.join(OUTPUT_DIR, "baguio.geojson")
MODIFIED_GEOJSON = os.path.join(OUTPUT_DIR, "car_region.json")
OUTPUT_MAP = os.path.join(PROJECT_DIR, "CAR_map.html")

# Map styling
REGION_STYLE = {
    "fillColor": "#540000",  # Maroon
    "color": "#000000",
    "fillOpacity": 0.7,
    "weight": 0.5,
}


def calculate_map_center(gdf):
    """Calculate the center point for the map."""
    # Convert to projected CRS for accurate centroid calculation
    projected_gdf = gdf.to_crs(epsg=3857)
    center_projected = [
        projected_gdf.geometry.centroid.y.mean(),
        projected_gdf.geometry.centroid.x.mean(),
    ]

    # Convert back to lat/long for folium
    center_gdf = gpd.GeoDataFrame(
        geometry=gpd.points_from_xy([center_projected[1]], [center_projected[0]]),
        crs=3857,
    )
    center_gdf = center_gdf.to_crs(epsg=4326)
    return [center_gdf.geometry.y[0], center_gdf.geometry.x[0]]


def add_region_layer(m, gdf, region_name):
    """Add region GeoJSON layer to the map."""
    region_tooltip = GeoJsonTooltip(
        fields=["adm2_en"],
        aliases=["Province:"],
        localize=True,
        sticky=False,
        labels=True,
    )

    folium.GeoJson(
        gdf,
        name=region_name,
        style_function=lambda x: REGION_STYLE,
        tooltip=region_tooltip,
    ).add_to(m)


def ensure_right_hand_rule(gdf):
    """
    Ensure all polygons follow the right-hand rule (exterior rings counterclockwise,
    interior rings clockwise) as required by GeoJSON specification.
    """
    def fix_polygon(geom):
        if isinstance(geom, Polygon):
            # Get exterior ring and make it counterclockwise
            exterior = geom.exterior
            if not exterior.is_ccw:
                exterior = LinearRing(list(exterior.coords)[::-1])
            
            # Get interior rings and make them clockwise
            interiors = []
            for interior in geom.interiors:
                if interior.is_ccw:
                    interior = LinearRing(list(interior.coords)[::-1])
                interiors.append(interior)
            
            return Polygon(exterior, interiors)
        
        elif isinstance(geom, MultiPolygon):
            return MultiPolygon([fix_polygon(part) for part in geom.geoms])
        
        return geom

    # Apply the fix to each geometry in the GeoDataFrame
    gdf['geometry'] = gdf['geometry'].apply(fix_polygon)
    return gdf


def process_baguio_cutout(gdf, baguio_gdf):
    """Process Baguio cutout from the region."""
    # Find which province contains Baguio
    baguio_centroid = baguio_gdf.geometry.centroid
    baguio_point = gpd.GeoDataFrame(geometry=baguio_centroid, crs=baguio_gdf.crs)
    joined = gpd.sjoin(baguio_point, gdf, how="left", predicate="within")

    if joined.empty:
        print("Warning: Couldn't determine which province contains Baguio")
        return gdf

    province_name = joined.iloc[0].get("adm2_en", "Unknown")
    print(f"Baguio is within province: {province_name}")

    # Get the province geometry
    province_mask = gdf["adm2_en"] == province_name
    if not province_mask.any():
        print(f"Warning: Province '{province_name}' not found in data")
        return gdf

    # Create a copy of the original GeoDataFrame
    gdf_modified = gdf.copy()

    # Get the province containing Baguio
    province_geometry = gdf.loc[province_mask, "geometry"].iloc[0]

    # Create a cutout by differencing the province geometry with Baguio
    baguio_union = unary_union(baguio_gdf.geometry)
    updated_province = province_geometry.difference(baguio_union)

    # Update the province geometry in the GeoDataFrame
    gdf_modified.loc[province_mask, "geometry"] = updated_province
    
    # Prepare Baguio data to be added to the result
    # Create a new row for Baguio with all necessary properties
    baguio_row = baguio_gdf.iloc[0].copy()
    
    # Add any missing properties that exist in gdf but not in baguio_gdf
    for col in gdf.columns:
        if col not in baguio_row:
            if col == "adm2_en":
                baguio_row[col] = baguio_row.get("name", "City of Baguio")
            elif col == "geo_level":
                baguio_row[col] = "City"
            else:
                baguio_row[col] = None
    
    # Add Baguio as a new row to the modified dataframe
    baguio_df = gpd.GeoDataFrame([baguio_row], geometry="geometry", crs=gdf_modified.crs)
    gdf_modified = gpd.GeoDataFrame(pd.concat([gdf_modified, baguio_df], ignore_index=True))
    
    # Ensure all geometries follow the right-hand rule before saving
    gdf_modified = ensure_right_hand_rule(gdf_modified)
    
    # Save the modified GeoJSON for inspection
    # Use to_crs(epsg=4326) to ensure proper GeoJSON format without old CRS style
    os.makedirs(os.path.dirname(MODIFIED_GEOJSON), exist_ok=True)
    
    # Make sure to convert to EPSG:4326 which is standard for GeoJSON
    if gdf_modified.crs and gdf_modified.crs != "EPSG:4326":
        gdf_modified = gdf_modified.to_crs(epsg=4326)
    
    # Save without including the CRS specification in the GeoJSON output
    gdf_modified.to_file(MODIFIED_GEOJSON, driver="GeoJSON", crs=None)
    print(f"Created modified GeoJSON with Baguio cutout at {MODIFIED_GEOJSON}")

    return gdf_modified


def add_baguio_layer(m, baguio_gdf):
    """Add Baguio City as a separate layer to the map."""
    # Determine the best field to use for the tooltip
    name_field = next(
        (f for f in ["name", "adm3_en"] if f in baguio_gdf.columns),
        baguio_gdf.columns[0],
    )

    baguio_tooltip = GeoJsonTooltip(
        fields=[name_field], aliases=["City:"], localize=True, sticky=False, labels=True
    )

    folium.GeoJson(
        baguio_gdf,
        name="Baguio City",
        style_function=lambda x: REGION_STYLE,
        tooltip=baguio_tooltip,
    ).add_to(m)


def create_map(gdf, center, region_name, baguio_path=None, output_file="CAR_map.html"):
    """Create and save an interactive Folium map with Baguio City cutout."""
    # Create a Folium map
    m = folium.Map(location=center, zoom_start=9, tiles="CartoDB positron")

    # Process Baguio cutout if available
    print(f"Looking for Baguio data at: {baguio_path}")
    baguio_gdf = load_baguio_data(baguio_path, gdf.crs) if baguio_path else None

    if baguio_gdf is not None:
        print(f"Baguio data loaded successfully with {len(baguio_gdf)} features")
        try:
            # Process Baguio cutout and add layers
            gdf_modified = process_baguio_cutout(gdf, baguio_gdf)
            add_region_layer(m, gdf_modified, region_name)
            add_baguio_layer(m, baguio_gdf)
        except Exception as e:
            print(f"Error processing Baguio cutout: {e}")
            # Fall back to regular mapping without cutout
            add_region_layer(m, gdf, region_name)
    else:
        print("Creating map without Baguio layer")
        add_region_layer(m, gdf, region_name)

    # Add layer control and save
    folium.LayerControl().add_to(m)
    m.save(output_file)
    print(f"Map saved to {output_file}")


def main():
    """Load data and create the CAR map with Baguio City cutout."""
    # First check if GeoJSON exists
    if os.path.exists(OUTPUT_GEOJSON):
        print(f"Using existing GeoJSON file: {OUTPUT_GEOJSON}")
        try:
            gdf = gpd.read_file(OUTPUT_GEOJSON)
            
            # Fix the CRS issue - ensure we're using EPSG:4326 for GeoJSON
            if gdf.crs and gdf.crs != "EPSG:4326":
                gdf = gdf.to_crs(epsg=4326)
                
            # Ensure geometries follow right-hand rule
            gdf = ensure_right_hand_rule(gdf)
            
            # Re-save the file with proper format
            gdf.to_file(OUTPUT_GEOJSON, driver="GeoJSON", crs=None)
            print(f"Fixed and re-saved GeoJSON file at: {OUTPUT_GEOJSON}")
        except Exception as e:
            print(f"Error loading GeoJSON data: {e}")
            return
    else:
        # If GeoJSON doesn't exist, check if shapefile exists
        if not os.path.exists(SHAPEFILE_PATH):
            print(f"Warning: Neither GeoJSON nor shapefile found.")
            print(f"- GeoJSON not found at: {OUTPUT_GEOJSON}")
            print(f"- Shapefile not found at: {SHAPEFILE_PATH}")
            print("Please download the required data or generate GeoJSON file.")
            print(f"Current working directory: {os.getcwd()}")
            
            # Search for alternative data files
            geojson_files = [f for f in os.listdir('.') if f.endswith('.geojson') or f.endswith('.json')]
            shp_files = [f for f in os.listdir('.') if f.endswith('.shp')]
            
            if geojson_files:
                print(f"Found these GeoJSON files: {geojson_files}")
                print("Try changing OUTPUT_GEOJSON to use one of these files.")
            if shp_files:
                print(f"Found these shapefiles: {shp_files}")
                print("Try changing SHAPEFILE_PATH to use one of these files.")
            return
        
        # Load data from shapefile
        try:
            print(f"GeoJSON not found, preparing from shapefile: {SHAPEFILE_PATH}")
            gdf = load_or_prepare_data(SHAPEFILE_PATH, REGION_CODE, OUTPUT_GEOJSON)
        except Exception as e:
            print(f"Error loading data from shapefile: {e}")
            return

    # Calculate map center and create map
    center = calculate_map_center(gdf)
    create_map(gdf, center, REGION_NAME, BAGUIO_GEOJSON, OUTPUT_MAP)


if __name__ == "__main__":
    main()
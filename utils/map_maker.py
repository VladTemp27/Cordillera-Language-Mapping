"""
Cordillera Administrative Region (CAR) Map Maker

This script generates an interactive map of the Cordillera Administrative Region
with Baguio City highlighted as a separate feature.

Note: this might be changed based on the frontend requirements (React-leaflet)

Programmer: Benny Gil A. Lactaotao
"""

import os
import geopandas as gpd
import pandas as pd
import folium
from folium.features import GeoJsonTooltip
from shapely.ops import unary_union
from map_filter import load_or_prepare_data, load_baguio_data

# Constants
REGION_CODE = "14"  # CAR region
REGION_NAME = "Cordillera Administrative Region (CAR)"
SHAPEFILE_PATH = "PH_Adm2_ProvDists.shp/PH_Adm2_ProvDists.shp.shp"
OUTPUT_DIR = "data"
OUTPUT_GEOJSON = f"{OUTPUT_DIR}/car_provinces.geojson"
BAGUIO_GEOJSON = f"{OUTPUT_DIR}/baguio.geojson"
MODIFIED_GEOJSON = f"{OUTPUT_DIR}/car_region.json"
OUTPUT_MAP = "CAR_map.html"

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
    
    # Save the modified GeoJSON for inspection
    os.makedirs(os.path.dirname(MODIFIED_GEOJSON), exist_ok=True)
    gdf_modified.to_file(MODIFIED_GEOJSON, driver="GeoJSON")
    print("Created modified GeoJSON with Baguio cutout")

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
    baguio_gdf = load_baguio_data(baguio_path, gdf.crs) if baguio_path else None
    
    if baguio_gdf is not None:
        try:
            # Process Baguio cutout and add layers
            gdf_modified = process_baguio_cutout(gdf, baguio_gdf)
            add_region_layer(m, gdf_modified, region_name)
            add_baguio_layer(m, baguio_gdf)
            
            # Ensure modified GeoJSON is saved
            os.makedirs(os.path.dirname(MODIFIED_GEOJSON), exist_ok=True)
            gdf_modified.to_file(MODIFIED_GEOJSON, driver="GeoJSON")
            print(f"Modified GeoJSON with Baguio cutout saved to {MODIFIED_GEOJSON}")
            
        except (IOError, ValueError, TypeError) as e:
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
    # Load existing data or create new filtered data
    gdf = load_or_prepare_data(SHAPEFILE_PATH, REGION_CODE, OUTPUT_GEOJSON)

    # Calculate map center and create map
    center = calculate_map_center(gdf)
    create_map(gdf, center, REGION_NAME, BAGUIO_GEOJSON, OUTPUT_MAP)


if __name__ == "__main__":
    main()
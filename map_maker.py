import geopandas as gpd
import folium
from folium.features import GeoJsonTooltip
import os

def prepare_data(shapefile_path, region_code, output_path='data/car_region.geojson'):
    """
    Load shapefile, filter by region code, and save as GeoJSON.
    
    Args:
        shapefile_path: Path to the original shapefile
        region_code: String prefix for PSGC code filtering
        output_path: Path to save the filtered GeoJSON
    
    Returns:
        GeoDataFrame of the filtered region
    """
    # Ensure data directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Load the original shapefile
    shp_file = gpd.read_file(shapefile_path)
    
    # Filter for specified region
    filtered_region = shp_file[shp_file['psgc_code'].astype(str).str.startswith(region_code)]
    
    # Save only the filtered region data as GeoJSON
    filtered_region.to_file(output_path, driver='GeoJSON')
    # Created filtered GeoJSON file. Original size: 1642 features, Filtered size: 77 features
    
    return filtered_region

def calculate_map_center(gdf):
    """
    Calculate the center point for the map.
    
    Args:
        gdf: GeoDataFrame containing geometries
    
    Returns:
        List [lat, lon] of center coordinates
    """
    # Convert to projected CRS for accurate centroid calculation
    projected_gdf = gdf.to_crs(epsg=3857)
    center_projected = [projected_gdf.geometry.centroid.y.mean(), projected_gdf.geometry.centroid.x.mean()]
    
    # Convert back to lat/long for folium
    center_gdf = gpd.GeoDataFrame(
        geometry=gpd.points_from_xy([center_projected[1]], [center_projected[0]]), 
        crs=3857
    )
    center_gdf = center_gdf.to_crs(epsg=4326)
    return [center_gdf.geometry.y[0], center_gdf.geometry.x[0]]

def create_map(gdf, center, region_name, output_file='CAR_map.html'):
    """
    Create and save an interactive Folium map.
    
    Args:
        gdf: GeoDataFrame containing region data
        center: List [lat, lon] for map center
        region_name: String name for the region layer
        output_file: Path to save the HTML map
    """
    # Create a Folium map
    m = folium.Map(location=center, zoom_start=9, tiles='CartoDB positron')
    
    # Add the GeoJSON data to the map
    tooltip = GeoJsonTooltip(
        fields=['name'],  # TODO add language and dialect population fields from db
        aliases=['Municipality:'],
        localize=True,
        sticky=False,
        labels=True
    )
    
    folium.GeoJson(
        gdf,
        name=region_name,
        style_function=lambda x: {
            'fillColor': '#0000ff',
            'color': '#000000',
            'fillOpacity': 0.7,
            'weight': 1
        },
        tooltip=tooltip
    ).add_to(m)
    
    # Add layer control
    folium.LayerControl().add_to(m)
    
    # Save the map as an HTML file
    m.save(output_file)

def main():

     # NOTE: this is removed from the repo due to size
    SHAPEFILE_PATH = 'data/Municities.shp.shp'
    REGION_CODE = '14'  # CAR region
    
    REGION_NAME = "Cordillera Administrative Region (CAR)"
    OUTPUT_GEOJSON = 'data/car_region.geojson'
    OUTPUT_MAP = 'CAR_map.html'
    
    # Check if filtered data already exists to avoid reprocessing
    if os.path.exists(OUTPUT_GEOJSON):
        print(f"Using existing filtered data from {OUTPUT_GEOJSON}")
        gdf = gpd.read_file(OUTPUT_GEOJSON)
    else:
        # NOTE if we proceed to a diffent region, change the region code
        gdf = prepare_data(SHAPEFILE_PATH, REGION_CODE, OUTPUT_GEOJSON)
    
    # Calculate map center
    center = calculate_map_center(gdf)
    
    # Create and save map
    create_map(gdf, center, REGION_NAME, OUTPUT_MAP)

if __name__ == "__main__":
    main()
"""
Data filtering module for Cordillera Language Mapping

This module handles the loading, filtering, and preparation of geospatial data
for the Cordillera Administrative Region (CAR) mapping project.

Programmer: Benny Gil A. Lactaotao
"""

import os
import geopandas as gpd


def prepare_data(shapefile_path, region_code, output_path):
    """
    Load shapefile, filter by region code, and save as GeoJSON.
    
    Args:
        shapefile_path: Path to the input shapefile
        region_code: PSGC region code to filter by (e.g., "14" for CAR)
        output_path: Path where filtered GeoJSON will be saved
        
    Returns:
        GeoDataFrame containing only the filtered region data
    """
    # Ensure data directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Load the original shapefile
    shp_file = gpd.read_file(shapefile_path)

    # Filter for specified region
    filtered_region = shp_file[
        shp_file["adm2_psgc"].astype(str).str.startswith(region_code)
    ]

    # Save only the filtered region data as GeoJSON
    filtered_region.to_file(output_path, driver="GeoJSON")
    print(f"Created filtered GeoJSON: {len(filtered_region)} features")

    return filtered_region


def load_or_prepare_data(shapefile_path, region_code, output_path):
    """
    Load existing filtered data if available, otherwise create it.
    
    Args:
        shapefile_path: Path to the input shapefile
        region_code: PSGC region code to filter by (e.g., "14" for CAR)
        output_path: Path where filtered GeoJSON will be saved
        
    Returns:
        GeoDataFrame containing the region data
    """
    if os.path.exists(output_path):
        print("Using existing filtered data")
        return gpd.read_file(output_path)
    else:
        return prepare_data(shapefile_path, region_code, output_path)


def load_baguio_data(baguio_path, target_crs=None):
    """
    Load Baguio City GeoJSON data.
    
    Args:
        baguio_path: Path to Baguio GeoJSON file
        target_crs: Target coordinate reference system to convert to (if needed)
        
    Returns:
        GeoDataFrame containing Baguio data, or None if file doesn't exist
    """
    if not os.path.exists(baguio_path):
        print(f"Baguio GeoJSON not found at: {baguio_path}")
        return None
        
    try:
        baguio_gdf = gpd.read_file(baguio_path)
        
        # Convert CRS if needed and if target CRS is provided
        if target_crs and baguio_gdf.crs != target_crs:
            baguio_gdf = baguio_gdf.to_crs(target_crs)
            
        return baguio_gdf
    except Exception as e:
        print(f"Error loading Baguio data: {e}")
        return None
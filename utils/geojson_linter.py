import json
import os
import sys
import geopandas as gpd
from shapely.geometry import shape, mapping

def fix_geojson(input_file, output_file=None):
    """
    Fix common GeoJSON issues:
    1. Remove old-style CRS
    2. Fix polygon winding order to follow right-hand rule
    """
    if output_file is None:
        output_file = input_file
    
    print(f"Processing file: {input_file}")
    
    try:
        # Use geopandas to load and fix the file
        gdf = gpd.read_file(input_file)
        
        # Convert to EPSG:4326 for GeoJSON standard
        if gdf.crs and gdf.crs != "EPSG:4326":
            gdf = gdf.to_crs(epsg=4326)
            print("Converted CRS to EPSG:4326")
        
        # Fix right-hand rule issues using shapely
        def fix_polygon(geom):
            from shapely.geometry import Polygon, MultiPolygon, LinearRing
            
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
        print("Fixed polygon winding order to follow right-hand rule")
        
        # Save without including the CRS specification in the GeoJSON output
        gdf.to_file(output_file, driver="GeoJSON", crs=None)
        print(f"Fixed GeoJSON saved to {output_file}")
        return True
        
    except Exception as e:
        print(f"Error fixing GeoJSON: {e}")
        return False

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python geojson_linter.py <input_file> [output_file]")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None
    
    if fix_geojson(input_file, output_file):
        print("Successfully fixed GeoJSON file!")
    else:
        print("Failed to fix GeoJSON file.")
        sys.exit(1)
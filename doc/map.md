# Cordillera Administrative Region (CAR) Map Visualization

## Data Source
The dataset is acquired from: [Philippines PSGC Shapefiles](https://github.com/altcoder/philippines-psgc-shapefiles)

Specifically from the [Municities](https://github.com/altcoder/philippines-psgc-shapefiles/blob/main/data/2023/Municities/phl_admbnda_adm3_psa_namria_20231106.shp) and [Provinces](https://github.com/altcoder/philippines-psgc-shapefiles/blob/main/dist/PH_Adm2_ProvDists.shp.zip) dataset which contains shapefiles of all provinces, municipalities, and cities in the Philippines.

## About the Philippine Standard Geographic Code (PSGC)
The PSGC is a coding scheme of geographic areas in the Philippines. 

![PSGC Coding Scheme](img/shp_codes.png)

## Map Generation Process

This visualization focuses on the Cordillera Administrative Region (CAR) with PSGC codes starting with "14":

1. **Data Preparation**:
   - Loaded provincial shapefiles
   - Filtered for CAR region (PSGC: 14*)
   - Converted to GeoJSON format for improved web compatibility

2. **Spatial Processing**:
   - Projected to Web Mercator (EPSG:3857) for accurate centroid calculation
   - Created Baguio City cutout from its containing province
   - Calculated region center using geometry centroids
   - Converted back to WGS84 (EPSG:4326) for web mapping compatibility

3. **Map Creation using Folium**:
   - Built interactive Folium map centered on CAR
   - Used CartoDB positron basemap for clean visualization
   - Applied maroon styling with black borders for provinces
   - Added province name tooltips for user interaction
   - Incorporated layer controls to toggle visibility of Baguio City

4. **Output**:
   - Saved as interactive "CAR_map.html"
   ![CAR Region Map](img/map.png)

## Notes
- The original shapefile is excluded from the repository due to size constraints
- The processed geojson files are saved for reuse and inspection
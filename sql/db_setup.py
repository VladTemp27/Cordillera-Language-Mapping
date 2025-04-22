# This script is now deprecated. Use the init-db.sql instead.
import psycopg2
import json
import os

# TODO: Move these to a config file
DB_NAME = "car_languages"
DB_USER = "amalzen"
DB_PASSWORD = "amalzen"
DB_HOST = "localhost"
DB_PORT = "5432"

# Load data from JSON file
data_file = os.path.join(os.path.dirname(__file__), "data", "province_languages.json")
with open(data_file, "r") as f:
    data = json.load(f)

try:
    # Connect to PostgreSQL
    conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT)
    cursor = conn.cursor()

    # Create tables
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS provinces (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS languages (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS province_languages (
            id SERIAL PRIMARY KEY,
            province_id INT REFERENCES provinces(id) ON DELETE CASCADE,
            language_id INT REFERENCES languages(id) ON DELETE CASCADE,
            household_count INT NOT NULL,
            percentage DECIMAL(5,2) NOT NULL,
            UNIQUE(province_id, language_id)
        );
    """)

    conn.commit()

    # Insert provinces and languages
    for province, languages in data.items():
        # Insert a province and get its ID
        cursor.execute("INSERT INTO provinces (name) VALUES (%s) ON CONFLICT (name) DO NOTHING;", (province,))
        cursor.execute("SELECT id FROM provinces WHERE name=%s;", (province,))
        province_id = cursor.fetchone()[0]

        for lang, count, percentage in languages:
            # Insert language and get its ID
            cursor.execute("INSERT INTO languages (name) VALUES (%s) ON CONFLICT (name) DO NOTHING;", (lang,))
            cursor.execute("SELECT id FROM languages WHERE name=%s;", (lang,))
            lang_id = cursor.fetchone()[0]

            # Insert the relationship with province, language and data
            cursor.execute("""
                INSERT INTO province_languages
                    (province_id, language_id, household_count, percentage)
                VALUES (%s, %s, %s, %s)
                ON CONFLICT (province_id, language_id)
                DO UPDATE SET household_count = %s, percentage = %s;
            """, (province_id, lang_id, count, percentage, count, percentage))

    conn.commit()
    print("Database setup complete!")
except Exception as e:
    print("Error:", e)
finally:
    if 'cursor' in locals():
        cursor.close()
    if 'conn' in locals():
        conn.close()
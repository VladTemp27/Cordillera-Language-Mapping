-- Create tables
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

-- Insert provinces
INSERT INTO provinces (name) VALUES
('Abra'),
('Apayao'),
('Benguet'),
('Baguio'),
('Ifugao'),
('Kalinga'),
('Mountain Province')
ON CONFLICT (name) DO NOTHING;

-- Insert languages
INSERT INTO languages (name) VALUES
('Ilocano'), ('Itneg/Tinguian-Maeng'), ('Itneg/Tinguian-Masadiit'),
('Itneg/Tinguian-Adasen'), ('Itneg/Tinguian-Inlaud'), ('Isnag'),
('Malaueg'), ('Kalinga'), ('Tagalog'), ('Kankanaey'), ('Ibaloi/Ibaloy'),
('English'), ('Pangasinan'), ('Tuwali'), ('Ayangan'), ('Kalanguya'),
('Ayangan-Henanga'), ('Baliwon'), ('Sinadanga'), ('Applai'), ('Bontok'),
('Balangao')
ON CONFLICT (name) DO NOTHING;

-- Insert province-language relationships
-- Abra
INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 44501, 75.5
FROM provinces p, languages l
WHERE p.name = 'Abra' AND l.name = 'Ilocano'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 44501, percentage = 75.5;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 3090, 5.2
FROM provinces p, languages l
WHERE p.name = 'Abra' AND l.name = 'Itneg/Tinguian-Maeng'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 3090, percentage = 5.2;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 2097, 3.6
FROM provinces p, languages l
WHERE p.name = 'Abra' AND l.name = 'Itneg/Tinguian-Masadiit'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 2097, percentage = 3.6;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 1816, 3.1
FROM provinces p, languages l
WHERE p.name = 'Abra' AND l.name = 'Itneg/Tinguian-Adasen'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 1816, percentage = 3.1;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 1384, 2.3
FROM provinces p, languages l
WHERE p.name = 'Abra' AND l.name = 'Itneg/Tinguian-Inlaud'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 1384, percentage = 2.3;

-- Apayao
INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 17673, 61.2
FROM provinces p, languages l
WHERE p.name = 'Apayao' AND l.name = 'Ilocano'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 17673, percentage = 61.2;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 7939, 27.5
FROM provinces p, languages l
WHERE p.name = 'Apayao' AND l.name = 'Isnag'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 7939, percentage = 27.5;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 1077, 3.7
FROM provinces p, languages l
WHERE p.name = 'Apayao' AND l.name = 'Malaueg'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 1077, percentage = 3.7;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 687, 2.4
FROM provinces p, languages l
WHERE p.name = 'Apayao' AND l.name = 'Kalinga'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 687, percentage = 2.4;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 332, 1.2
FROM provinces p, languages l
WHERE p.name = 'Apayao' AND l.name = 'Tagalog'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 332, percentage = 1.2;

-- Benguet
INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 42333, 36.3
FROM provinces p, languages l
WHERE p.name = 'Benguet' AND l.name = 'Kankanaey'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 42333, percentage = 36.3;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 39527, 33.9
FROM provinces p, languages l
WHERE p.name = 'Benguet' AND l.name = 'Ilocano'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 39527, percentage = 33.9;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 19227, 16.5
FROM provinces p, languages l
WHERE p.name = 'Benguet' AND l.name = 'Ibaloi/Ibaloy'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 19227, percentage = 16.5;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 8532, 7.3
FROM provinces p, languages l
WHERE p.name = 'Benguet' AND l.name = 'Tagalog'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 8532, percentage = 7.3;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 3365, 2.9
FROM provinces p, languages l
WHERE p.name = 'Benguet' AND l.name = 'Kalanguya'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 3365, percentage = 2.9;

-- Baguio
INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 44623, 44.5
FROM provinces p, languages l
WHERE p.name = 'Baguio' AND l.name = 'Tagalog'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 44623, percentage = 44.5;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 44172, 44.1
FROM provinces p, languages l
WHERE p.name = 'Baguio' AND l.name = 'Ilocano'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 44172, percentage = 44.1;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 4311, 4.3
FROM provinces p, languages l
WHERE p.name = 'Baguio' AND l.name = 'Kankanaey'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 4311, percentage = 4.3;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 1892, 1.9
FROM provinces p, languages l
WHERE p.name = 'Baguio' AND l.name = 'English'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 1892, percentage = 1.9;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 968, 1.0
FROM provinces p, languages l
WHERE p.name = 'Baguio' AND l.name = 'Pangasinan'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 968, percentage = 1.0;

-- Ifugao
INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 15739, 32.3
FROM provinces p, languages l
WHERE p.name = 'Ifugao' AND l.name = 'Tuwali'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 15739, percentage = 32.3;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 13598, 27.9
FROM provinces p, languages l
WHERE p.name = 'Ifugao' AND l.name = 'Ayangan'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 13598, percentage = 27.9;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 9566, 19.6
FROM provinces p, languages l
WHERE p.name = 'Ifugao' AND l.name = 'Ilocano'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 9566, percentage = 19.6;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 5473, 11.2
FROM provinces p, languages l
WHERE p.name = 'Ifugao' AND l.name = 'Kalanguya'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 5473, percentage = 11.2;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 2128, 4.4
FROM provinces p, languages l
WHERE p.name = 'Ifugao' AND l.name = 'Ayangan-Henanga'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 2128, percentage = 4.4;

-- Kalinga
INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 25178, 52.4
FROM provinces p, languages l
WHERE p.name = 'Kalinga' AND l.name = 'Kalinga'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 25178, percentage = 52.4;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 21149, 44.0
FROM provinces p, languages l
WHERE p.name = 'Kalinga' AND l.name = 'Ilocano'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 21149, percentage = 44.0;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 780, 1.6
FROM provinces p, languages l
WHERE p.name = 'Kalinga' AND l.name = 'Tagalog'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 780, percentage = 1.6;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 153, 0.32
FROM provinces p, languages l
WHERE p.name = 'Kalinga' AND l.name = 'Baliwon'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 153, percentage = 0.32;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 146, 0.3
FROM provinces p, languages l
WHERE p.name = 'Kalinga' AND l.name = 'Sinadanga'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 146, percentage = 0.3;

-- Mountain Province
INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 11777, 31.3
FROM provinces p, languages l
WHERE p.name = 'Mountain Province' AND l.name = 'Kankanaey'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 11777, percentage = 31.3;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 6744, 17.9
FROM provinces p, languages l
WHERE p.name = 'Mountain Province' AND l.name = 'Applai'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 6744, percentage = 17.9;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 5475, 14.6
FROM provinces p, languages l
WHERE p.name = 'Mountain Province' AND l.name = 'Bontok'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 5475, percentage = 14.6;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 4989, 13.3
FROM provinces p, languages l
WHERE p.name = 'Mountain Province' AND l.name = 'Ilocano'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 4989, percentage = 13.3;

INSERT INTO province_languages (province_id, language_id, household_count, percentage)
SELECT p.id, l.id, 2535, 6.7
FROM provinces p, languages l
WHERE p.name = 'Mountain Province' AND l.name = 'Balangao'
ON CONFLICT (province_id, language_id) DO UPDATE SET household_count = 2535, percentage = 6.7;
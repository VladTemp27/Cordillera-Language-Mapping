import React, {useEffect, useState} from "react";
import LanguageTable from "./LanguageTable";
import "./Language.css";
import axios from "axios";

// Correctly access environment variables in Vite
const apiUrl ="https://cordielleramap-benny-gils-projects.vercel.app/";

const columnsForTable1 = [
    {header: "Dialect", accessor: "dialect"},
    {header: "Household", accessor: "household_count"},
    {header: "Percentage", accessor: "percentage"},
];

/**
 * Essentially, data will be used in the table rows must be in the form of an array.
 *
 * Elements in the array must be objects with keys that match the accessors defined in the columns.
 * Example: dialect: "Ilocano", household_count: 44501, percentage: 75.50
 *  */

const Language = ({provinceName}) => {
    const [provinceID, setProvinceID] = useState(null);
    const [provinceLanguages, setProvinceLanguages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!provinceName) {
            setProvinceID(null);
            setProvinceLanguages(null);
            return;
        }
        
        setLoading(true);
        setError(null);
        
        async function fetchData() {
            try {
                const id = await fetchProvinceID(provinceName);
                setProvinceID(id);

                if (id) {
                    const languageData = await fetchLanguagesByProvince(id);
                    setProvinceLanguages(languageData);
                    console.log("Languages by Province:", languageData);
                } else {
                    setError(`Province "${provinceName}" not found`);
                }
            } catch (error) {
                console.error("Error loading data:", error);
                setError("Failed to load language data");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [provinceName]);

    return (
        <div className="language-content">
            {loading ? (
                <p>Loading language data...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : provinceLanguages ? (
                <>
                    <LanguageTable
                        columns={columnsForTable1}
                        data={provinceLanguages.dialect}
                    />
                </>
            ) : (
                <p>Select a province to view language data</p>
            )}
        </div>
    );
};

export default Language;

// Update the helper functions to make direct API calls without the proxy
function fetchProvinceID(provinceName) {
    console.log("Fetching Province Data");
    const endpoint = `${apiUrl}api/provinces/getAll`;
    
    return axios
        .get(endpoint)
        .then((response) => {
            const provinces = response.data.provinces;
            const matched = provinces.find((p) => p.name === provinceName);
            return matched ? matched.id : null;
        })
        .catch((error) => {
            console.error("Error fetching provinces:", error);
            return null;
        });
}

function fetchLanguagesByProvince(provinceID) {
    console.log(`Fetching language data for ${provinceID}`);
    const endpoint = `${apiUrl}api/languages/raw/province/${provinceID}`;
    
    return axios
        .get(endpoint)
        .then((response) => {
            const formatted = response.data.map((lang) => ({
                dialect: lang.name,
                household_count: lang.household_count,
                percentage: `${parseFloat(lang.percentage)}%`,
            }));
            return {dialect: formatted};
        })
        .catch((error) => {
            console.error("Error fetching language data:", error);
            return {dialect: []};
        });
}
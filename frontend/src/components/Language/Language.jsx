import React, {useEffect, useState} from "react";
import LanguageTable from "./LanguageTable";
import "./Language.css";
import axios from "axios";

const columnsForTable1 = [
    {header: "Dialect", accessor: "dialect"},
    {header: "Household", accessor: "household_count"},
    {header: "Percentage", accessor: "percentage"},
];

// Subject to change
const columnsForTable2 = [
    {header: "English", accessor: "english"},
    {header: "Translation", accessor: "translation"},
];

/**
 * Essentially, data will be used in the table rows must be in the form of an array.
 *
 * Elements in the array must be objects with keys that match the accessors defined in the columns.
 * Example: dialect: "Ilocano", household_count: 44501, percentage: 75.50
 *  */

const Language = ({ provinceName }) => {
  const [provinceID, setProvinceID] = useState(null);
  const [provinceLanguages, setProvinceLanguages] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const id = await fetchProvinceID(provinceName);
        setProvinceID(id);

        if (id) {
          const languageData = await fetchLanguagesByProvince(id);
          setProvinceLanguages(languageData);
          console.log("Languages by Province:", languageData);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    fetchData();
  }, [provinceName]);

  return (
      <div className="language-content">
        {provinceLanguages ? (
            <>
              <LanguageTable
                  columns={columnsForTable1}
                  data={provinceLanguages.dialect}
              />

              <h2>**Language**</h2>
              <LanguageTable columns={columnsForTable2} />
            </>
        ) : (
            <p>Loading data...</p>
        )}
      </div>
  );
};

export default Language;

// Keep these helper functions the same
function fetchProvinceID(provinceName) {
  console.log("Fetching Province Data");
  return axios
      .get("http://localhost/api/provinces/getAll")
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
  return axios
      .get(`http://localhost/api/languages/raw/province/${provinceID}`)
      .then((response) => {
        const formatted = response.data.map((lang) => ({
          dialect: lang.name,
          household_count: lang.household_count,
          percentage: parseFloat(lang.percentage),
        }));
        return { dialect: formatted };
      })
      .catch((error) => {
        console.error("Error fetching language data:", error);
        return { dialect: [] };
      });
}
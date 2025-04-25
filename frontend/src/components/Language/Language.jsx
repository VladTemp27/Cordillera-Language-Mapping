import React from "react";
import LanguageTable from "./LanguageTable";
import "./Language.css";

const columnsForTable1 = [
  { header: "Dialect", accessor: "dialect" },
  { header: "Household", accessor: "household_count" },
  { header: "Percentage", accessor: "percentage" },
];

// Subject to change
const columnsForTable2 = [
  { header: "English", accessor: "english" },
  { header: "Translation", accessor: "translation" },
];

/**
 * Essentially, data will be used in the table rows must be in the form of an array.
 * 
 * Elements in the array must be objects with keys that match the accessors defined in the columns.
 * Example: dialect: "Ilocano", household_count: 44501, percentage: 75.50
 *  */
const sampleData = {
  dialect: [
    {
      dialect: "Ilocano",
      household_count: 44501,
      percentage: 75.50
    },
    {
      dialect: "Itneg/Tinguian-Maeng",
      household_count: 44501,
      percentage: 75.50
    },
    {
      dialect: "Isnag",
      household_count: 44501,
      percentage: 75.50
    },
  ],
};

const Language = () => {

  return (
    <div className="language-content">
      <LanguageTable 
        columns={columnsForTable1} 
        data={sampleData.dialect}
      />

      <h2>**Language**</h2>
      <LanguageTable 
        columns={columnsForTable2} 
      />
    </div>
  );
};

export default Language;
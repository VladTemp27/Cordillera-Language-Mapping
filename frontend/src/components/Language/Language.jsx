import React from "react";
import LanguageTable from "./LanguageTable";
import "./Language.css";

const columnsForTable1 = [
  { header: "Dialect", accessor: "dialect" },
  { header: "Household", accessor: "household_count" },
  { header: "Percentage", accessor: "percentage" },
];

const columnsForTable2 = [
  { header: "English", accessor: "english" },
  { header: "Translation", accessor: "translation" },
];

const Language = () => {

  return (
    <div className="language-content">
      <LanguageTable 
        columns={columnsForTable1} 
      />

      <h2>**Language**</h2>
      <LanguageTable 
        columns={columnsForTable2} 
      />
    </div>
  );
};

export default Language;
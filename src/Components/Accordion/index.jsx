import React, { useState } from "react";
import data from "./data";

const Accordion = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (expandId) => {
    setSelectedId(selectedId == expandId ? null : expandId);
  };

  const handleMultiSelection = (getCurrentId) => {
    let cpyMutiple = [...multiple];
    const findIndexOfCurrentId = cpyMutiple.indexOf(getCurrentId);

    console.log(findIndexOfCurrentId);
    if (findIndexOfCurrentId === -1) cpyMutiple.push(getCurrentId);
    else cpyMutiple.splice(findIndexOfCurrentId, 1);

    setMultiple(cpyMutiple);
  };

  return (
    <div className="wrapper">
      <div className="accordion-wrapper">
        <button
          className="enable-disable-button"
          onClick={() => setEnableMultiSelection(!enableMultiSelection)}
        >
          {enableMultiSelection
            ? "Disable Multi Selection"
            : "Enable Multiple Selection"}
        </button>
        {data && data.length > 0 ? (
          data.map((item) => (
            <div className="accordion" key={item.id}>
              {/* header */}
              <div className="accordion-header">
                <p>{item.question}</p>
                <button
                  className="accordion-button"
                  onClick={
                    enableMultiSelection
                      ? () => handleMultiSelection(item?.id)
                      : () => handleSingleSelection(item?.id)
                  }
                >
                  +
                </button>
              </div>
              {/* body */}
              {enableMultiSelection
                ? multiple.indexOf(item?.id) !== -1 && (
                    <div className="acc-content ">{item?.answer}</div>
                  )
                : selectedId === item?.id && (
                    <div className="acc-content ">{item?.answer}</div>
                  )}
              {/* {selected === dataItem.id ||
              multiple.indexOf(dataItem.id) !== -1 ? (
                <div className="content">{dataItem.answer}</div>
              ) : null} */}
            </div>
          ))
        ) : (
          <h1>No data Found</h1>
        )}
      </div>
    </div>
  );
};

export default Accordion;

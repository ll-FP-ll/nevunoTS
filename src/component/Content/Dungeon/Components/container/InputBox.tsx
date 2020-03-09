import React, { useState, useEffect, ChangeEvent } from "react";

type Props = {
  title: string;
  boxType: string;
  boxId: string;
  handleDataSetup: (id: string, data: any) => void;
};

export const InputBox = ({ title, boxType, boxId, handleDataSetup }: Props) => {
  const [inputValue, setValue] = useState<string | number>("");

  useEffect(
    () =>
      setValue(boxType === "number" ? (title === "Health" ? 15 : 5) : "Johnny"),
    []
  );
  useEffect(() => handleDataSetup(boxId, inputValue));

  function handleSetup(e: ChangeEvent<HTMLInputElement>) {
    setValue(
      boxType === "number"
        ? isNaN(parseInt(e.target.value))
          ? 1
          : parseInt(e.target.value)
        : e.target.value
    );
  }

  return (
    <div className="App-Input-Pair">
      <div style={{ flexGrow: 1 }}></div>
      <label>{title}:</label>
      <input
        onChange={e => handleSetup(e)}
        type={boxType}
        min={boxType === "number" ? 0 : undefined}
        value={inputValue}
      ></input>
    </div>
  );
};

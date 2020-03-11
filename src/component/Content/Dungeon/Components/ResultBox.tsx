import React, { useState, useEffect } from "react";

type Props = {
  result: any;
};

export const ResultBox = ({ result }: Props) => {
  const [copy, setCopy] = useState<any>();
  const [copyDisplay, setCopyDisplay] = useState<string>("Copy");

  useEffect(() => prepareCopyResult());

  function prepareCopyResult() {
    let copyMaterial = result.join("");
    setCopy(copyMaterial);
    setTimeout(() => {
      setCopyDisplay("Copy");
    }, 2000);
  }

  function copyResult() {
    navigator.clipboard.writeText(copy);
    setCopyDisplay("Copied!");
  }

  return (
    <div className="App-Container-light">
      <button className="Dungeon-Btn" onClick={() => copyResult()}>
        {copyDisplay}
      </button>
      <div className="App-Result-Area">
        <div>
          {result.map((i: any, k: number) => (
            <p key={k}>{i}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

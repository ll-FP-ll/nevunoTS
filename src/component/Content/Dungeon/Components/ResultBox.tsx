import React from "react";

type Props = {
  result: any;
};

export const ResultBox = ({ result }: Props) => {
  return (
    <div className="App-Container-light">
      <div className="App-Result-Area">{result}</div>
    </div>
  );
};

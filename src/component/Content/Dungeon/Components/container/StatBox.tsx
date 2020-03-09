import React from "react";

import {InputBox} from "./InputBox"
type Props = {
  handleStatSetup: (id: string, data: number) => void;
 
}

export const StatBox = ({handleStatSetup}: Props) => {
  return (
    <div className="App-SettingBox">
      <InputBox
          title={"Health"}
          boxType={"number"}
          boxId={"hp"}
          handleDataSetup={(id,data) => handleStatSetup(id,data)}
        />
        <InputBox
          title={"Luck"}
          boxType={"number"}
          boxId={"luck"}
          handleDataSetup={(id,data) => handleStatSetup(id,data)}
          
        /><br />
        <InputBox
          title={"Attack"}
          boxType={"number"}
          boxId={"dmg"}
          handleDataSetup={(id,data) => handleStatSetup(id,data)}
        />
        <InputBox
          title={"Defense"}
          boxType={"number"}
          boxId={"def"}
          handleDataSetup={(id,data) => handleStatSetup(id,data)}
        />
    </div>
  );
};

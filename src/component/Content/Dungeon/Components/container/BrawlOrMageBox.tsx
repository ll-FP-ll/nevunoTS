import React, { useState } from "react";

import icon_brawl from "../../../../../assets/icon/sword.png";
import icon_mage from "../../../../../assets/icon/mage.png";

type Props = {
  handleDataSetup: (id: string, data: string) => void;
  setSkillType:(type:string) => void;
}

export const BrawlOrMageBox = ({handleDataSetup, setSkillType}:Props) => {
  const [isActive, setActive] = useState<String>("");

  function isItActive(imgId: string): string {
    return isActive === imgId ? "1" : "0.3";
  }

  function handleClick(imgId: string) {
      setActive(imgId)
      handleDataSetup("type", imgId)
      setSkillType(imgId)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        margin: "5px"
      }}
    >
      <div style={{ flexGrow: 1 }}> </div>
      <img
        src={icon_brawl}
        style={{ opacity: isItActive("brawl") }}
        className="brawlOrMageIcon"
        title={"Brawler"}
        alt="brawl"
        id="brawl"
        onClick={() => alert("Not implemented yet!")}
      />
      <div style={{ flexGrow: 1 }}> </div>

      <img
        src={icon_mage}
        style={{ opacity: isItActive("mage") }}
        className="brawlOrMageIcon"
        title={"Mage"}
        alt="mage"
        id="mage"
onClick={() => handleClick("mage")}
/>
      <div style={{ flexGrow: 1 }}> </div>
    </div>
  );
};

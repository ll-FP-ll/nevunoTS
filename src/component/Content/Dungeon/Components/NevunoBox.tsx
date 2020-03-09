import React, { useState } from "react";

import { InputBox } from "./container/InputBox";
import { StatBox } from "./container/StatBox";
import { BrawlOrMageBox } from "./container/BrawlOrMageBox";
import { SkillBox } from "./container/SkillBox";

type Props = {
  handleDataSetup: (id: string, data: string | number) => void;
  handleStatSetup: (id: string, data: number) => void;
  handleSkillSetup: (id: string, data: any) => void;
  setVisibilityDungeon: (id: string) => void;
  nevuno: any;
};

export const NevunoBox = ({
  handleDataSetup,
  handleSkillSetup,
  handleStatSetup,
  setVisibilityDungeon,
  nevuno
}: Props) => {
  const [skillType, setType] = useState<string>("");

  function setSkillType(type: string) {
    setType(type);
  }

  return (
    <div className="App-Container-Light">
      <h3>Set up your Challenger ...</h3>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <InputBox
          title={"Name:"}
          boxType={"text"}
          boxId={"name"}
          handleDataSetup={(id, data) => handleDataSetup(id, data)}
        />
        <StatBox handleStatSetup={(id, data) => handleStatSetup(id, data)} />
      </div>

      <BrawlOrMageBox
        handleDataSetup={(id, data) => handleDataSetup(id, data)}
        setSkillType={type => setSkillType(type)}
      />
      {skillType !== "" ? (
        <SkillBox
          mageOrBrawl={skillType}
          handleSkillSetup={(id, data) => handleSkillSetup(id, data)}
          nevuno={nevuno}
          setVisibilityDungeon={setVisibilityDungeon}
        />
      ) : null}
    </div>
  );
};

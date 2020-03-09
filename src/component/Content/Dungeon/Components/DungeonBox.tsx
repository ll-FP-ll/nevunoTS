import React, { useState, useEffect } from "react";
import { DungeonSelectBox } from "./DungeonSelectBox";
import { StageSelectBox } from "./StageSelectBox";
import { MobBox } from "./MobBox";

import { dungeonList } from "../../../../data/Dungeon";

type Props = {
  getSelectedMob: (mob: any) => void;
};

export const DungeonBox = ({ getSelectedMob }: Props) => {
  const [selectedDungeon, setSelectedDungeon] = useState<any>(dungeonList[0]);
  const [selectedStage, setSelectedStage] = useState<number>(1);

  useEffect(() => getSelectedMob(selectedDungeon.mob[selectedStage - 1]));

  function handleDungeonSelection(dungeon: any) {
    
    setSelectedStage(1);
    setSelectedDungeon(dungeon);
  }

  function handleStageSelection(stage: number) {
    setSelectedStage(stage);
  }

  return (
    <div className="App-Container-Dark">
      <h3>Choose a dungeon...</h3>
      <DungeonSelectBox
        handleDungeonSelection={dungeon => handleDungeonSelection(dungeon)}
      />
      <StageSelectBox
        selectedStage={selectedStage}
        selectedDungeon={selectedDungeon}
        handleStageSelection={stage => handleStageSelection(stage)}
      />
      <MobBox mob={selectedDungeon.mob[selectedStage - 1]} />
    </div>
  );
};

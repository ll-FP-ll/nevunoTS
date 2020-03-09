import React, { useState, useEffect } from "react";

type Props = {
  selectedDungeon: any;
  selectedStage: number;
  handleStageSelection: (dungeon: any) => void;
};

export const StageSelectBox = ({
  selectedDungeon,
  selectedStage,
  handleStageSelection
}: Props) => {
  const [activeStage, setActiveStage] = useState<number>(1);

  useEffect(() => {
    if (activeStage !== selectedStage) {
      setActiveStage(1);
    }
  });

  function isItActive(i: number): number {
    return i === activeStage ? 1 : 0.5;
  }

  function setStageSelect(i: number) {
    setActiveStage(i);
    handleStageSelection(i);
  }

  return (
    <div className="Stage-Slot">
      {selectedDungeon.stages.map((i: number, k: number) => (
        <div
          className="Stage-Btn"
          style={{ opacity: isItActive(i) }}
          onClick={() => setStageSelect(i)}
          key={k}
        >
          {i}
        </div>
      ))}
    </div>
  );
};

import React, { useState, useEffect } from "react";

import { dungeonList } from "../../../../data/Dungeon";

type Props = {
  handleDungeonSelection: (dungeon: any) => void;
};

export const DungeonSelectBox = ({ handleDungeonSelection }: Props) => {
  const [toggleDungeonList, setToggleDungeonList] = useState<boolean>(false);
  const [displayedDungeon, setDisplayedDungeon] = useState<any>(dungeonList[0]);

  function selectDungeon(dungeon: any) {
    setDisplayedDungeon(dungeon);
    handleDungeonSelection(dungeon);
    setToggleDungeonList(toggleDungeonList ? false : true)
  }

  return (
    <div className="Dungeon-Slot">
      <div
        className="Dungeon-Btn"
        onClick={() => setToggleDungeonList(toggleDungeonList ? false : true)}
      >
        {displayedDungeon.title}
        <br /> Lv {displayedDungeon.lvl}
      </div>
      {toggleDungeonList
        ? dungeonList
            .filter(i => i !== displayedDungeon)
            .map((i, k) => (
              <div
                className="Dungeon-Btn"
                key={k}
                onClick={() => selectDungeon(i)}
              >
                {i.title} <br />
                Lv {i.lvl}
              </div>
            ))
        : null}
    </div>
  );
};

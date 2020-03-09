import React, { useState } from "react";

import { dungeonList } from "../../../../data/Dungeon";

type Props = {
  mob: any;
};

export const MobBox = ({ mob }: Props) => {
  return (
    <div className="Mob-Box">
      <div className="Mob-Img">
        <img className="Mob-Thumb" src={mob.thumb} alt={mob.name} />
        <span className="Mob-El-Info" style={{ textAlign: "center" }}>
          {mob.element.map((i: number, k: number) => (
            <span key={k} className="Mob-El">{i} </span>
          ))}
        </span>
      </div>
      <div className="Mob-Info">
        <span>{mob.name}</span>
        <span>Lv {mob.stats.lvl}</span>

        <span>
          HP: {mob.stats.hp} | Luck: {mob.stats.luck}{" "}
        </span>
        <span>
          Atk: {mob.stats.atk} | Def: {mob.stats.def}
        </span>
        <span style={{ textAlign: "left" }}>Drops:</span>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";

import { NevunoBox } from "./Components/NevunoBox";
import { DungeonBox } from "./Components/DungeonBox";
import { ResultBox } from "./Components/ResultBox";

import { dungeonList } from "../../../data/Dungeon";

import { encounterFunction } from "../../../properties/combatCalculation";
import { skill } from "../../../data/Skills";

export const Dungeon = () => {
  const [nev, setNev] = useState<object>({
    name: "Johnny",
    element: ["electricity"],
    stats: {
      hp: 10,
      atk: 5,
      def: 5,
      luck: 5
    },
    type: "mage",
    skillSet: {
      oneBase: skill.fire_ball,
      oneSpecial: null,
      twoBase: null,
      twoSpecial: null,
      ultimate: null
    }
  });
  const [mob, setMob] = useState<any>(dungeonList[0].mob[0]);

  const [visibilityDungeon, setVisibilityDungeon] = useState<boolean>(false);
  const [visibilityResult, setVisbilityResult] = useState<boolean>(false);

  const [result, setResult] = useState<any>("99 lil bugs in the code");

  function setVisibility(id: string) {
    if (id === "dungeon") {
      setVisibilityDungeon(true);
    } else {
      setVisbilityResult(true);
    }
  }

  function handleDataSetup(id: string, data: string | number) {
    let oldNev = nev;
    let newNev = Object.assign(oldNev);
    newNev[id] = data;
    setNev(newNev);
  }

  function handleStatSetup(id: string, data: number) {
    let oldNev = nev;
    let newNev = Object.assign(oldNev);
    newNev.stats[id] = data;
    setNev(newNev);
  }

  function handleSkillSetup(id: string, data: any) {
    let oldNev = nev;
    let newNev = Object.assign(oldNev);
    newNev.skillSet[id] = data;
    setNev(newNev);
  }

  function getSelectedMob(mob: any) {
    setMob(mob);
  }

  function handleResultButtonClick() {
    setResult(encounterFunction(nev, mob));
    setVisbilityResult(true);
  }

  return (
    <div className="App-Content">
      <NevunoBox
        handleDataSetup={(id, data) => handleDataSetup(id, data)}
        handleStatSetup={(id, data) => handleStatSetup(id, data)}
        handleSkillSetup={(id, data) => handleSkillSetup(id, data)}
        nevuno={nev}
        setVisibilityDungeon={id => setVisibility(id)}
      />
      {visibilityDungeon ? (
        <DungeonBox getSelectedMob={mob => getSelectedMob(mob)} />
      ) : null}
      {visibilityDungeon ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "2vh"
          }}
        >
          <h3>Let them fight ... </h3>
          <button
            className="App-Btn"
            id="Result-Btn"
            onClick={() => handleResultButtonClick()}
          >
            Battle on!
          </button>
          {visibilityResult ? <ResultBox result={result} /> : null}
        </div>
      ) : null}
    </div>
  );
};

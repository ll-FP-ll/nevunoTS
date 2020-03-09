import React, { useEffect, useState } from "react";

import { SkillSlotBox } from "./SkillSlotBox";
import { UltimateBox } from "./UltimateBox";

import { mageSkillTree, ultimateMap } from "../../../../../data/Skills";

type Props = {
  mageOrBrawl: string;
  handleSkillSetup: (id: string, data: any) => void;
  nevuno: any;
  setVisibilityDungeon: (id: string) => void;
};

export const SkillBox = ({
  mageOrBrawl,
  handleSkillSetup,
  nevuno,
  setVisibilityDungeon
}: Props) => {
  const [skillList, setSkillList] = useState<any>([]);
  const [skillOne, setSkillOne] = useState<any>();
  const [skillTwo, setSkillTwo] = useState<any>();
  const [skillUlt, setSkillUlt] = useState<any>();
  const [visibilityUlt, setVisibilityUlt] = useState<boolean>(false);

  const [activeDropDownSet, setActiveDropDownSet] = useState<number>(1);

  useEffect(() => {
    loadSkillList();
    checkAndSetUpUltimate();
  });

  function loadSkillList() {
    // Currently there is no brawlSkillTree, so to not break the code, I gotta duplicate
    setSkillList(mageOrBrawl === "brawl" ? mageSkillTree : mageSkillTree);
  }

  function handleSkillSelect(id: number, skill: any) {
    // Prevents Double SkillSelection
    switch (id) {
      case 1: {
        setSkillOne(skill);
        setVisibilityDungeon("dungeon");
        break;
      }
      case 2:
        setSkillTwo(skill);
        break;
      case 3:
        setSkillUlt(skill);
        break;
    }
  }

  function checkAndSetUpUltimate() {
    if (skillOne && skillTwo) {
      let comboOne = `${skillOne.name},${skillTwo.name}`;
      let comboTwo = `${skillTwo.name},${skillOne.name}`;

      let ultimate = ultimateMap.get(comboOne) || ultimateMap.get(comboTwo);

      if (ultimate) {
        setVisibilityUlt(true);
        setSkillUlt(ultimate);
      } else {
        setVisibilityUlt(false);
        handleSkillSetup("ultimate", null);
      }
    }
  }

  function checkActiveDropDownSet(slot: number) {
    // Prevents Double DropDown
    setActiveDropDownSet(slot);
  }

  return (
    <div>
      <h3 id="SkillBoxTitle">{mageOrBrawl} Skills</h3>
      <SkillSlotBox
        skillList={skillList.filter((a: any) => a !== skillTwo)}
        set={1}
        activeDropDownSet={activeDropDownSet}
        checkActiveDropDownSet={slot => checkActiveDropDownSet(slot)}
        handleSkillSelect={(id, skill) => handleSkillSelect(id, skill)}
        handleSkillSetup={(id, data) => handleSkillSetup(id, data)}
      />
      {skillOne ? (
        <SkillSlotBox
          skillList={skillList.filter((a: any) => a !== skillOne)}
          set={2}
          activeDropDownSet={activeDropDownSet}
          checkActiveDropDownSet={slot => checkActiveDropDownSet(slot)}
          handleSkillSelect={(id, skill) => handleSkillSelect(id, skill)}
          handleSkillSetup={(id, data) => handleSkillSetup(id, data)}
        />
      ) : null}
      {visibilityUlt ? (
        <UltimateBox
          set={3}
          ultimate={skillUlt}
          handleSkillSetup={handleSkillSetup}
        />
      ) : null}
    </div>
  );
};

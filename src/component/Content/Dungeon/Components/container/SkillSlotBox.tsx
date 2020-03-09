import React, { useEffect, useState } from "react";

type Props = {
  skillList: any;
  set: number;

  activeDropDownSet: number;
  checkActiveDropDownSet: (slot: number) => void;
  handleSkillSetup: (id: string, data: any) => void;
  handleSkillSelect: (id: number, skill: any) => void;
};

export const SkillSlotBox = ({
  skillList,
  set,
  activeDropDownSet,
  checkActiveDropDownSet,
  handleSkillSetup,
  handleSkillSelect
}: Props) => {
  const [toggle, setToggle] = useState<Boolean>(false);
  const [selectedSkill, selectSkill] = useState<any>();
  const [specialActive, setSpecialActive] = useState<Boolean>(false);

  useEffect(() => {
    // Prevents doubled active DropDown Menu
    if (set !== activeDropDownSet) {
      setToggle(false);
    }
  });

  function handleToggling() {
    // Handles the DropDown Menu && Presets the Prevention for double dropDown
    setToggle(toggle ? false : true);
    checkActiveDropDownSet(set);
  }

  function handleSkillSelection(skill: any) {
    handleToggling();
    setSpecialActive(false);

    // Prepare necessary filter for SkillSlot #2
    if (skill !== "nilch") {
      handleSkillSelect(set,skill);
    }

    // Handle Skill Setup & Clearing of unneeded Skills
    if (skill !== "none" && skill !== "nilch") {
      selectSkill(skill);
      handleSkillSetup(set === 1 ? "oneBase" : "twoBase", skill.skills[0]);
    } else if (skill === "none") {
      selectSkill(undefined);
      handleSkillSetup("twoBase", null);
    }
  }

  function handleSpecialSelect() {
    setSpecialActive(specialActive ? false : true);
    specialActive
      ? handleSkillSetup(set === 1 ? "oneSpecial" : "twoSpecial", null)
      : handleSkillSetup(
          set === 1 ? "oneSpecial" : "twoSpecial",
          selectedSkill.skills[1]
        );
  }

  return (
    <div className="App-SkillBox ">
      <div className="App-SkillSlot">
        <p
          className="Skill-Btn"
          onClick={() =>
            handleSkillSelection(selectedSkill ? selectedSkill : "nilch")
          }
        >
          <span
            style={{
              color: `rgb(${
                selectedSkill ? selectedSkill.skills[0].rgb : "250,250,250"
              })`
            }}
          >
            &#x2B24;&nbsp;&nbsp;
          </span>

          {selectedSkill ? selectedSkill.skills[0].name : "Skill Select"}
        </p>

        {toggle ? (
          <div className="Skill-DropDown">
            {skillList.map((i: any, k: number) => (
              <p
                key={k}
                className="Skill-Btn"
                style={{
                  backgroundColor: `rgb(${i.skills[0].rgb})`,
                  zIndex: 5000
                }}
                onClick={() => handleSkillSelection(i)}
              >
                {i.name}
              </p>
            ))}
            {set === 2 ? (
              <p
                className="Skill-Btn"
                style={{ border: "1px solid white" }}
                onClick={() => handleSkillSelection("none")}
              >
                None
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
      <div
        className="App-SkillSlot"
        style={{ opacity: specialActive ? 1 : 0.5 }}
      >
        {selectedSkill ? (
          <p className="Skill-Btn" onClick={() => handleSpecialSelect()}>
            <span
              style={{
                color: `rgb(${
                  selectedSkill ? selectedSkill.skills[1].rgb : "250,250,250"
                })`
              }}
            >
              &#x2756;&nbsp;&nbsp;
            </span>
            {selectedSkill.skills[1].name}
          </p>
        ) : null}
      </div>
    </div>
  );
};

import React, { useState } from "react";

type Props = {
  ultimate: any;
  set: number;
  handleSkillSetup: (id: string, data: any) => void;
};

export const UltimateBox = ({ ultimate, set, handleSkillSetup }: Props) => {
  const [ultActive, setUltActive] = useState<Boolean>(false);

  function handleClick() {

    // Select or Deselect the ultimate attack, as well as hide or show the selection

    if (ultActive) {
      setUltActive(false);
      handleSkillSetup("ultimate", null);
    } else {
      setUltActive(true);
      handleSkillSetup("ultimate", ultimate);
    }
  }

  return (
    <div
      className="App-SkillSlot"
      style={{ opacity: ultActive ? 1 : 0.5 }}
      onClick={() => handleClick()}
    >
      <p className="Skill-Btn">
        <span
          style={{
            color: `rgb(${ultimate.rgb})`
          }}
        >
          &#10056;&nbsp;&nbsp;
        </span>
        {ultimate.name}
        <span
          style={{
            color: `rgb(${ultimate.rgb})`
          }}
        >
          &nbsp;&nbsp;&#10056;
        </span>
      </p>
    </div>
  );
};

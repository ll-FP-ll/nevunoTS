import React from "react";

import { elementalBalance } from "../data/ElementalBalance";

function randomizer(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dmgFormula(atk: any, foe: any): number {
  let dmgMultiplier;
  let minDmg;

  switch (atk.tier) {
    case 0:
      {
        dmgMultiplier = 10;
        minDmg = 1;
      }
      break;
    case 1:
      {
        dmgMultiplier = 20;
        minDmg = 5;
      }
      break;
    case 2:
      {
        dmgMultiplier = 35;
        minDmg = 15;
      }
      break;
    default: {
      dmgMultiplier = 10;
      minDmg = 1;
    }
  }

  let elementalDmg = 0;

  console.log(...elementalBalance[0].wA)

  const random = Math.floor(Math.random() * dmgMultiplier + minDmg);

  return random;
}

function returnDmg(atk: any, foe: any): any {
  return [dmgFormula(atk, foe)];
}

function encounterRoundCalculation(combatant: any, foe: any): any {
  let hitOrMiss = Math.ceil(
    Math.random() * 100 + (combatant[0].stats.luck - foe[0].stats.luck / 2)
  );

  let ultThreshold = combatant[1] <= Math.floor((combatant[0].hp / 100) * 20);

  let randomSkill = randomizer(0, 1);

  let atkNormal = [
    combatant[0].skillSet.oneBase,
    combatant[0].skillSet.twoBase
      ? combatant[0].skillSet.twoBase
      : combatant[0].skillSet.oneBase
  ];

  let atkSpecial = [
    combatant[0].skillSet.oneSpecial
      ? combatant[0].skillSet.oneSpecial
      : combatant[0].skillSet.oneBase,
    combatant[0].skillSet.twoSpecial
      ? combatant[0].skillSet.twoSpecial
      : combatant[0].skillSet.oneSpecial
      ? combatant[0].skillSet.oneSpecial
      : combatant[0].skillSet.oneBase
  ];

  let atkUlt = ultThreshold
    ? combatant[0].skillSet.ultimate
    : combatant[0].skillSet.oneBase;

  let atkNormalDmg = returnDmg(atkNormal[randomSkill], foe);
  let atkSpecialDmg = returnDmg(atkSpecial[randomSkill], foe);
  let atkUltDmg = returnDmg(atkUlt, foe);
}

function encounterFunction(nev: any, mob: any): any {
  let roundNumber = 0;
  let drawThreshold = 20;

  let totalDmg = 0;

  let fightResult = [];

  let nevHP = nev.stats.hp;
  let mobHP = mob.hp;

  let combatant = nev.stats.luck >= mob.luck ? [nev, nevHP] : [mob, mobHP];
  let foe = combatant[0] === nev ? [mob, mobHP] : [nev, nevHP];

  let drawCheck;

  do {
    // Prevent endless loop while developing

    nevHP -= 10;
    let roundEncounter = encounterRoundCalculation(combatant, foe);
    let oldCombatant = combatant[0];
    let oldFoe = foe[0];
  } while (nevHP > 0 && mobHP > 0);

  /*let roundInc = 0;
  let drawLine = 20;
  let totalDmg = 0;
  let fight = [];
  let nevHP = nev.hp;
  let mobHP = mob.hp;
  let combatant = nev.luck < mob.luck ? [nev, nevHP] : [mob, mobHP];
  let foe = combatant[0] === nev ? [mob, mobHP] : [nev, nevHP];
  let draw;
  do {
    let roundEncounter = encounterRound(combatant, foe);
    let oldCombatant = combatant[0];
    let oldFoe = foe[0];

    let combatantDisplay = `${oldCombatant.name} (${combatant[1]}/${oldCombatant.hp})`;
    let damageDealt = Math.floor(roundEncounter[1] - oldFoe.def / 2);

    let itCrit = Math.floor(Math.random() * 100);

    let critIt =
      damageDealt > 0 && parseInt(Math.floor(itCrit + oldCombatant.luck)) > 95
        ? `!!!CRIT!!!`
        : ``;
    damageDealt =
      damageDealt <= 0
        ? 0
        : parseInt(Math.floor(itCrit + parseInt(oldCombatant.luck))) > 95
        ? parseInt(damageDealt * 2)
        : damageDealt;

    let dmgReply = `- ${oldFoe.name} takes ${damageDealt} damage!`;
    let blockReply = `- ${oldFoe.name} blocks the attack!`;
    let missReply = `${oldFoe.name} has dodged skillfully.`;

    function getDmg() {
      if (roundEncounter.indexOf(`but misses.`) !== -1) {
        return missReply;
      } else if (damageDealt < 1) {
        return blockReply;
      } else {
        return dmgReply;
      }
    }
    let roundDisplay = splitIt(
      `${combatantDisplay} uses ${roundEncounter[2]}: ${critIt} ${
        roundEncounter[0]
      } ${getDmg()}`
    );

    fight.push(roundDisplay);
    totalDmg += damageDealt;
    if (oldCombatant === nev) {
      mobHP -= damageDealt;
      combatant = [mob, mobHP];
      foe = [nev, nevHP];
    } else {
      nevHP -= damageDealt;
      combatant = [nev, nevHP];
      foe = [mob, mobHP];
    }
    draw = roundInc >= drawLine && totalDmg <= 0;
    if (draw) {
      break;
    }
    roundInc++;
  } while (nevHP > 0 && mobHP > 0);
  let winner = nevHP <= 0 ? mob : nev;
  let looser = nevHP <= 0 ? nev : mob;
  let nevWon = `${nev.name} can be very proud of themself.`;
  let nevLost = `${nev.name} must retreat for now, but may come back later.`;
  if (draw) {
    fight.push(
      splitIt(
        `After ${drawLine} rounds it becomes clear this is a draw!!! ${nev.name} and ${mob.name} musst retreat for now!`
      )
    );
  } else {
    let encounterResolve = `${winner.name} has triumphed over ${looser.name}! ${
      winner === nev ? nevWon : nevLost
    }`;
    fight.push(encounterResolve);
  }
  return fight; */
}

export { encounterFunction };

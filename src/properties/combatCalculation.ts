import React from "react";

import { elementalBalance } from "../data/ElementalBalance";

function randomizer(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dmgFormula(atk: any, foe: any, combatant:any): any {
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

  let atkElement = elementalBalance.filter(el => el.name === atk.element)[0];

  foe[0].element.map((i: any, k: number) => {
    if (atkElement.sA.indexOf(i) >= 0) {
      elementalDmg += 5;
    }
    if (atkElement.wA.indexOf(i) >= 0) {
      elementalDmg -= 5;
    }
  });

  const random = Math.floor(Math.random() * dmgMultiplier + minDmg + (combatant[0].stats.atk*5));

  return [random + elementalDmg, random, elementalDmg];
}

function returnDmg(atk: any, foe: any, combatant:any): any {
  return [dmgFormula(atk, foe, combatant), atk.name];
}

function encounterRoundCalculation(combatant: any, foe: any): any {
  let hitOrMiss = Math.ceil(
    Math.random() * 100 + (combatant[0].stats.luck - (foe[0].stats.luck / 2))
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

  let atkNormalDmg = returnDmg(atkNormal[randomSkill], foe, combatant);
  let atkSpecialDmg = returnDmg(atkSpecial[randomSkill], foe, combatant);
  let atkUltDmg = returnDmg(atkUlt, foe, combatant);

  let miss = [[0], "an attack but misses"];

  if (hitOrMiss <= 10) {
    return miss;
  } else if (hitOrMiss <= 50) {
    return atkNormalDmg;
  } else if (hitOrMiss <= 90) {
    return atkSpecialDmg;
  } else {
    return atkUltDmg;
  }
}

function encounterFunction(nev: any, mob: any): any {
  let roundNumber = 0;
  let drawThreshold = 20;

  let totalDmg = 0;

  let fightResult = [];

  let nevHP = nev.stats.hp;
  let mobHP = mob.stats.hp;

  let combatant = nev.stats.luck >= mob.stats.luck ? [nev, nevHP] : [mob, mobHP];
  let foe = combatant[0] === nev ? [mob, mobHP] : [nev, nevHP];

  let drawCheck;

  let fightInitial = `<b>${nev.name}</b> challenges <b>${mob.name}</b> ${`\n`}`;
  fightResult.push(fightInitial)

  do {
    // Prevent endless loop while developing

    let roundEncounter = encounterRoundCalculation(combatant, foe);
    let oldCombatant = combatant[0];
    let oldFoe = foe[0];
    let combatantDisplay = `${oldCombatant.name} (${combatant[1]}/${oldCombatant.stats.hp})`;
    let damageDealt = roundEncounter[0][0];

    let itCrit = Math.floor(Math.random() * 100);

    let critIt =
      damageDealt > 0 && Math.floor(itCrit + oldCombatant.stats.luck) > 95
        ? `!!!CRIT!!!`
        : ``;

    damageDealt =
      damageDealt <= 0
        ? 0
        : Math.floor(itCrit + oldCombatant.stats.luck) > 95
        ? damageDealt * 2
        : damageDealt;


    let dmgReply = `${oldFoe.name} takes ${damageDealt} damage!`;
    let blockReply = `${oldFoe.name} blocks the attack!`;
    let missReply = `${oldFoe.name} has dodged skillfully.`;

    let reply;

    if (roundEncounter[1].indexOf(`an attack but misses`) !== -1) {
      reply = missReply;
    } else if (damageDealt < 1) {
      reply = blockReply;
    } else {
      reply = dmgReply;
    }

    let roundDisplay = `<li>${combatantDisplay} uses ${
      roundEncounter[1]
    }: ${critIt} -  ${reply}</li>`;

    fightResult.push(roundDisplay);
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
    drawCheck = roundNumber >= drawThreshold && totalDmg <= 0;
    if (drawCheck) {
      break;
    }
    roundNumber++;

    // Do the itCrit tomorrow
  } while (nevHP > 0 && mobHP > 0);

  console.log(nevHP, totalDmg);
  let winner = nevHP < 0 ? mob : nev;
  let looser = nevHP < 0 ? nev : mob;
  let nevWon = `${nev.name} can be very proud of themself.`;
  let nevLost = `${nev.name} must retreat for now, but may come back later.`;

  if (drawCheck) {
    fightResult.push(
      `After ${drawThreshold} rounds it becomes clear this is a draw!!! ${nev.name} and ${mob.name} musst retreat for now!`
    );
  } else {
    let encounterResolve = `<b>${winner.name}</b> has triumphed over <u>${looser.name}</u>! ${
      winner === nev ? nevWon : nevLost
    }`;
    fightResult.push(encounterResolve);
  }
  return fightResult;
}

export { encounterFunction };

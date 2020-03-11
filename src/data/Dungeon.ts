import { skill } from "./Skills";
import MOBCrabKng from "../assets/icon/MOBCrabKng.png";
import MOBLobsterPrc from "../assets/icon/MOBLobsterPrc.png";
import MOBShrimpling from "../assets/icon/MOBShrimpling.png";
import MOBBeeLicious from "../assets/icon/MOBBeeLicious.png";

class Mobs {
  name: string;
  element: Array<any>;
  lvl: number;
  stats : {
    hp: number,
    atk: number,
    def: number,
    luck: number
  };
  skillSet: {
    oneBase: any,
    oneSpecial: any,
    ultimate: any
  };
  warcry: string;
  drop: Array<any>;
  thumb: string;

  constructor(
    name: string,
    element: Array<any>,
    lvl: number,
    hp: number,
    atk: number,
    def: number,
    luck: number,
    skills: any,
    warcry: string,
    drop: Array<any>,
    thumb: string
  ) {
    this.name = name;
    this.element = element;
    this.lvl = lvl;
    this.stats = {
        hp : hp,
        atk : atk,
        def : def,
        luck : luck};

    this.skillSet = {
      oneBase: skills[0],
      oneSpecial: skills[1] ? skills[1] : skills[0],
      ultimate: skills[1] && skills[2] ? skills[2] : skills[0]
    };
    this.warcry = warcry;
    this.drop = drop;
    this.thumb = thumb;
  }
}

function stageIt(arg: number): Array<any> {
  let arr = [];
  for (let i = 1; i <= arg; i++) {
    arr.push(i);
  }
  return arr;
}

class DungeonCat {
  title: string;
  stages: any;
  lvl: number;
  mob: any;

  constructor(title: string, stages: number, lvl: number, mob: any) {
    this.title = title;
    this.stages = stageIt(stages);
    this.lvl = lvl;
    this.mob = mob;
  }
}

const dungeonList = [
  new DungeonCat("Test Dungeon", 1, 3, [
    new Mobs(
      "Fluffy Bumblebee",
      ["water"],
      1,
      15,
      5,
      5,
      5,
      [skill.attack],
      "Nyoom Nyoom",
      ["Love"],
      MOBBeeLicious
    )
  ]),
  new DungeonCat("Beach Shrine", 3, 5, [
    new Mobs(
      "Shrimpling",
      ["neutral"],
      3,
      120,
      25,
      60,
      5,
      [skill.tail_slap],
      "Blubber Blubber",
      ["Fisch"],
      MOBShrimpling
    ),
    new Mobs(
      "Lobster Prince",
      ["water"],
      5,
      160,
      45,
      60,
      5,
      [skill.chivalrous_swipe],
      "Angry Rat Noises",
      ["Whiskers"],
      MOBLobsterPrc
    ),
    new Mobs(
      "Crab King",
      ["water", "earth"],
      9,
      240,
      80,
      100,
      5,
      [skill.attack, skill.sand_blast, skill.royal_snip],
      "Nibble",
      ["Crab King"],
      MOBCrabKng
    )
  ])
];

export { dungeonList };

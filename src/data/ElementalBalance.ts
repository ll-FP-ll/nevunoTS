import { skill } from "./Skills";

class Element {
  name: string;
  attacks: any;
  sA: any;
  wA: any;

  constructor(name: string, strongAgainst: any, weakAgainst: any) {
    this.name = name;
    this.attacks = Object.keys(skill).filter(el => el === this.name);
    this.sA = strongAgainst;
    this.wA = weakAgainst;
  }
}

const elementalBalance = [
  new Element("fire", ["air"], ["water", "metal"]),
  new Element("air", ["earth"], ["fire", "ice"]),
  new Element("water", ["fire"], ["earth", "electricity"]),
  new Element("earth", ["water"], ["air","levitation"]),

  new Element("electricity", ["metal","water"], ["levitation"]),
  new Element("metal", ["ice","fire"], ["electricity","fire"]),
  new Element("levitation", ["electricity","earth"], ["ice"]),
  new Element("ice", ["levitation","air"], ["metal"]),

  new Element("growth", ["decay"], [""]),
  new Element("decay", ["growth"], [""]),

  new Element("healing", ["decay", "death"], [""]),
  new Element("death", ["growth", "healing"], [""]),

  new Element("creation_magic",["earth","water","levitation","air","ice","fire"],[""]),
  new Element("lava_magic",["air","water","metal","ice","fire"],[""]),
  new Element("storm_magic",["fire","air","metal","water","levitation","air"],[""]),
  new Element("blood_magic",["fire","levitation","air","decay","death"],[""]),
  new Element("necromancy_magic",["growth","healing","decay","death"],[""])
];

export { elementalBalance };

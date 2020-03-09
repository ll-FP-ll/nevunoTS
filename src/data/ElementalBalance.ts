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

const elementalBalance = [new Element("fire", ["earth"], ["water"])];

export { elementalBalance };

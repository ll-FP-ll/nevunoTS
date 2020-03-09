let mageSkills: Array<any> = [];
let fighterSkills: Array<any> = [];
let mobSkills: Array<any> = [];

class Skill {
  name: string;
  type: string;
  element: string;
  tier: number;
  desc: string;
  rgb: string;

  constructor(
    name: string,
    type: string,
    element: string,
    tier: number,
    desc: string,
    rgb: string
  ) {
    this.name = name;
    this.type = type;
    this.element = element;
    this.tier = tier;
    this.desc = desc;
    this.rgb = rgb;

    if (type === "brawl") {
      fighterSkills.push(this);
    } else if (type === "mage") {
      mageSkills.push(this);
    } else {
      mobSkills.push(this);
    }
  }
}

const skill = {
  // Mage Skills
  fire_ball: new Skill(
    "Fire Ball",
    "mage",
    "fire",
    0,
    "You hit the enemy with your fiercy Fire Ball.",
    "226,88,34"
  ),
  thunder_bolt: new Skill(
    "Thunder Bolt",
    "mage",
    "electricity",
    1,
    "Zapp Zapp! You fry the enemy in front of you with your mighty Thunder Bolt.",
    "253,208,34"
  ),
  air_slash: new Skill(
    "Air Slash",
    "mage",
    "air",
    0,
    "You attack your enemy with blades made from wind.",
    "209,241,255"
  ),
  levitational_pull: new Skill(
    "Levitational Pull",
    "mage",
    "levitation",
    1,
    "You use whatever lies around to throw at your enemy.",
    "195,230,223"
  ),
  rock_throw: new Skill(
    "Rock Throw",
    "mage",
    "earth",
    0,
    "You throw rocks at your enemy.",
    "96,74,50"
  ),
  metal_spikes: new Skill(
    "Metal Spikes",
    "mage",
    "metal",
    1,
    "You put your paws on the ground and metal spikes breach the ground beneath your enemy.",
    "169,169,169"
  ),
  water_blast: new Skill(
    "Water Blast",
    "mage",
    "water",
    0,
    "You summon water to blast your enemy with.",
    "63,0,255"
  ),
  icicle_hail: new Skill(
    "Icicle Hail",
    "mage",
    "ice",
    1,
    "A hail of icicles rains down on your enemy.",
    "240,248,255"
  ),
  tendril_rampage: new Skill(
    "Tendril Rampage",
    "mage",
    "growth",
    0,
    "You make vines grow to entrap your enemy.",
    "164,198,57"
  ),
  purification: new Skill(
    "Purification",
    "mage",
    "healing",
    1,
    "Your purificate your enemy, trying to remove their taint.",
    "251,204,241"
  ),
  corrosion: new Skill(
    "Corrosion",
    "mage",
    "decay",
    0,
    "You attack your enemy with a corrosion magic, letting it eat away at them slowly.",
    "48,25,52"
  ),
  withering_shot: new Skill(
    "Withering Shot",
    "mage",
    "death",
    1,
    "You hit your enemy with a withering shot, making them rot from the inside!",
    "53,56,57"
  ),
  // Mage Ultimates
  creation_magic: new Skill(
    "Creation Magic",
    "mage",
    "air,earth",
    3,
    "You use your powers to summon a random anvil from the sky",
    "50,50,50"
  ),
  lava_magic: new Skill(
    "Lava Magic",
    "mage",
    "earth, fire",
    3,
    "You use your powers to break open the ground and flood your enemy with lava.",
    "50,50,50"
  ),
  storm_magic: new Skill(
    "Storm Magic",
    "mage",
    "fire,water",
    3,
    "You call upon the skies to hit your enemy with a mighty storm.",
    "50,50,50"
  ),
  blood_magic: new Skill(
    "Blood Magic",
    "mage",
    "healing,water",
    3,
    "You try to manipulate your enemies blood with your Blood Magic",
    "50,50,50"
  ),
  necromancy_magic: new Skill(
    "Necromancy",
    "mage",
    "healing,death",
    3,
    "You use your Necromancy skills to summon those who fell a long time ago to attack your foe.",
    "50,50,50"
  ),

  // Brawler Skills
  stab: new Skill(
    "Stab",
    "brawl",
    "swordman",
    0,
    "Placeholder as this is not allowed to be empty",
    "250,250,250"
  ),

  // Mob Skills
  attack: new Skill(
    "Attack",
    "mob",
    "neutral",
    0,
    "The mob charges at you.",
    ""
  ),
  tail_slap: new Skill(
    "Tail Slap",
    "shrimpling",
    "water",
    1,
    "The Shrimpling looks at you fiercy and hits you with their tail. *pap*",
    ""
  ),
  chivalrous_swipe: new Skill(
    "Chivalrous Swipe",
    "lobsterPrince",
    "water",
    1,
    "The Lobster Prince gracefully swipes you with their claws.",
    ""
  ),
  sand_blast: new Skill(
    "Sand Blast",
    "kingCrab",
    "earth",
    1,
    "The Crab King blows sand into your face. Dang, there were stones in it too!",
    ""
  ),
  royal_snip: new Skill(
    "Royal Snip",
    "kingCrab",
    "water",
    2,
    "Do you even need that anymore? *snip*",
    ""
  )
};

// SkillTrees (do not touch!)

class SkillTree {
  name: string;
  skills: Array<any>;

  constructor(name: string, skills: Array<any>) {
    this.name = name;
    this.skills = skills;
  }
}

const mageSkillTree = [
  new SkillTree("fire", [skill.fire_ball, skill.thunder_bolt]),
  new SkillTree("air", [skill.air_slash, skill.levitational_pull]),
  new SkillTree("earth", [skill.rock_throw, skill.metal_spikes]),
  new SkillTree("water", [skill.water_blast, skill.icicle_hail]),
  new SkillTree("growth", [skill.tendril_rampage, skill.purification]),
  new SkillTree("decay", [skill.corrosion, skill.withering_shot])
];

const ultimateMap = new Map();
ultimateMap.set("air,earth", skill.creation_magic);
ultimateMap.set("earth,fire", skill.lava_magic);
ultimateMap.set("fire,water", skill.storm_magic);
ultimateMap.set("water,growth", skill.blood_magic);
ultimateMap.set("growth,decay", skill.necromancy_magic);

export {
  mageSkills,
  fighterSkills,
  mobSkills,
  mageSkillTree,
  ultimateMap,
  skill
};

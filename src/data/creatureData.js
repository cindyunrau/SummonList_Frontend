const spider = {
    name: "Spider",
    description:"Tiny beast, unaligned",
    base: true,
    cr: 0,
    str: 2,
    dex: 14,
    con: 8,
    int: 1,
    wis: 10,
    cha: 2,
    skills: [ 
        ["Stealth","+4"],
    ],
    senses: [ 
        ["Darkvision","30 Ft."],
        ["Passive Perception","12"],
    ],
    actions: [
        ["Bite","Melee Weapon Attack"," +4 to hit, reach 5 ft., one creature.","Hit: (1d1) piercing damage plus (1d4)poison damage. The target must succeed on a DC 9 Constitution saving throw or take the poison damage."]
    ],
    traits: [
        ["Spider Climb","The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."],
        ["Web Sense","While in contact with a web, the spider knows the exact Location of any other creature in contact with the same web."],
        ["Web Walker","The spider ignores Movement restrictions caused by webbing."]
    ]
};

const skeleton = {
    "name": "Skeleton",
    "description":"Medium undead , lawful evil",
		"base": true,
    "cr": "1/4 (50 XP)",
		"hp": "13 (2d8)",
		"ac": 13,
		"speed": 30,
		"abilities": {
			"str": 10,
			"dex": 14,
			"con": 15,
			"int": 6,
			"wis": 8,
			"cha": 5
		},
		"vulnerabilities": [ 
			["bludgeoning"]
    ],
		"resistances": [ 
			[]
    ],
		"immunities": [ 
			["poison"]
    ],
    "skills": [ 
        ["Stealth","+4"]
    ],
    "senses": [ 
        ["Darkvision","60 Ft."],
        ["Passive Perception","9"]
    ],
	"languages": [ 
				["understands all languages it spoke in life but can't speak"]
    ],
    "actions": [
        ["Shortsword","Melee Weapon Attack","+4 to hit, reach 5 ft., one target.","Hit:","5 (1d6 + 2) piercing damage."],
				["Shortbow","Ranged Weapon Attack","+4 to hit, range 80/320 ft., one target.","Hit:","5 (1d6 + 2) piercing damage."]	
    ],
    "traits": [
    ]
}
const aboleth = {
    "name": "Aboleth",
    "slug": "aboleth",
    "challenge_rating": 10,
    "size": "Large",
    "type": "Aberration",
    "subtype": "",
    "alignment": "Lawful Evil",
    "armor_class": {
      "value": 17,
      "description": "natural armor"
    },
    "hit_points": {
      "max": 135,
      "dice": [
        {
          "sides": 10,
          "count": 18,
          "mod": 36
        }
      ]
    },
    "speed": {
      "Walk": 10,
      "Burrow": false,
      "Climb": 0,
      "Fly": false,
      "Hover": false,
      "Swim": 40
    },
    "ability_scores": {
      "str": 21,
      "dex": 9,
      "con": 15,
      "int": 18,
      "wis": 15,
      "cha": 18
    },
    "saving_throws": {
      "str": false,
      "dex": false,
      "con": 6,
      "int": 8,
      "wis": 6,
      "cha": false
    },
    "properties": {
      "Athletics": false,
      "Acrobatics": false,
      "Stealth": false,
      "Arcana": false,
      "History": 12,
      "Investigation": false,
      "Nature": false,
      "Religion": false,
      "Insight": false,
      "Medicine": false,
      "Perception": 10,
      "Survival": false,
      "Deception": false,
      "Intimidation": false,
      "Performance": false,
      "Persuasion": false
    },
    "languages": [
      "Deep Speech",
      "Telepathy 120 Ft."
    ],
    "senses": {
      "Darkvision": "120 ft."
    },
    "traits": [
      {
        "name": "Amphibious",
        "description": "The aboleth can breathe air and water.",
        "attack_bonus": 0
      },
      {
        "name": "Mucous Cloud",
        "description": "While underwater, the aboleth is surrounded by transformative mucus. A creature that touches the aboleth or that hits it with a melee attack while within 5 ft. of it must make a DC 14 Constitution saving throw. On a failure, the creature is diseased for 1d4 hours. The diseased creature can breathe only underwater.",
        "attack_bonus": 0
      },
      {
        "name": "Probing Telepathy",
        "description": "If a creature communicates telepathically with the aboleth, the aboleth learns the creature's greatest desires if the aboleth can see the creature.",
        "attack_bonus": 0
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The aboleth makes three tentacle attacks.",
        "attack_bonus": 0
      },
      {
        "name": "Tentacle",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Constitution saving throw or become diseased. The disease has no effect for 1 minute and can be removed by any magic that cures disease. After 1 minute, the diseased creature's skin becomes translucent and slimy, the creature can't regain hit points unless it is underwater, and the disease can be removed only by heal or another disease-curing spell of 6th level or higher. When the creature is outside a body of water, it takes 6 (1d12) acid damage every 10 minutes unless moisture is applied to the skin before 10 minutes have passed.",
        "attack_bonus": 9,
        "damage_dice": {
          "sides": 6,
          "count": 2,
          "mod": 5
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft. one target. Hit: 15 (3d6 + 5) bludgeoning damage.",
        "attack_bonus": 9,
        "damage_dice": {
          "sides": 6,
          "count": 3,
          "mod": 5
        }
      },
      {
        "name": "Enslave (3/day)",
        "description": "The aboleth targets one creature it can see within 30 ft. of it. The target must succeed on a DC 14 Wisdom saving throw or be magically charmed by the aboleth until the aboleth dies or until it is on a different plane of existence from the target. The charmed target is under the aboleth's control and can't take reactions, and the aboleth and the target can communicate telepathically with each other over any distance.\nWhenever the charmed target takes damage, the target can repeat the saving throw. On a success, the effect ends. No more than once every 24 hours, the target can also repeat the saving throw when it is at least 1 mile away from the aboleth.",
        "attack_bonus": 0
      },
      {
        "name": "Detect",
        "description": "The aboleth makes a Wisdom (Perception) check.",
        "legendary": true,
        "attack_bonus": 0
      },
      {
        "name": "Tail Swipe",
        "description": "The aboleth makes one tail attack.",
        "legendary": true,
        "attack_bonus": 0
      },
      {
        "name": "Psychic Drain (Costs 2 Actions)",
        "description": "One creature charmed by the aboleth takes 10 (3d6) psychic damage, and the aboleth regains hit points equal to the damage the creature takes.",
        "legendary": true,
        "attack_bonus": 0
      }
    ],
    "tags": []
  }
const creatureData = [
    spider,skeleton, aboleth
]
export default creatureData
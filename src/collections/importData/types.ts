
interface CardAttack {
  "type": "ATTACK",
  "attackDice": number,
  "attackHit": number,
}
interface CardAttackSpecial {
  "type": "ATTACK: SPECIAL",
}
interface CardNonAttack {
  "type": "MANEUVER" | "REACTION",
}

interface CardBase {
  "name": string,
  "energyCost": number | 'X',
  "shields": number,
  "description": string,
  "count": number
  iconAbility?: {
    icon: 'STAR' | 'KING' | 'GIFT'
    description: string
  }
}
export type CardData = CardBase & (CardAttack | CardAttackSpecial | CardNonAttack)

interface Ability {
  "name": string,
  "description": string
}

export interface RangerData {
  "name": string,
  "team": string,
  "color": | 'red'
  | 'blue'
  | 'black'
  | 'yellow'
  | 'pink'
  | 'green'
  | 'white'
  | 'gold'
  | 'silver'
  | 'shadow'
  | 'crimson'
  | 'navy'
  | 'orange'
  | 'purple',
  "type": 'core' | 'sixth' | 'ally',
  "title": string,
  "cardTitle": string,
  "abilities": Ability[],
  "deck": CardData[]
}
export interface ZordData {
  "name": string,
  "team": string,
  "ability": string
  "type": string,
  "ranger": string,
  "rangers": string[]
}
export interface MegazordData {
  "name": string,
  "team": string,
  "ability": string
}

export interface Dataset {
  "id": string,
  "label": string,
  "rawText": string,
  "parsedData": {
    rangers: RangerData[],
    zords: ZordData[],
    megazords: MegazordData[]
  }
}

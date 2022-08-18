import { Character } from "../Character";

export interface Skill {
  readonly id: string;
  readonly name: string;

  use(user: Character, target: Character): void
}
import { IsReadyToJoin } from "./is-ready-to-join";

export interface UserWithNoIdea {
  readonly experience: string;
  readonly readyToJoin: IsReadyToJoin.ThreeChoices;
}

import { IsReadyToJoin } from "./is-ready-to-join";

export interface UserWithNoIdea {
  readonly experience: string | null;
  readonly readyToJoin: IsReadyToJoin.ThreeChoices;
}

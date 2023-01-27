import { atom } from "jotai";

import { User } from "@/core/models/user";
import { UserSkillSet } from "@/core/models/user-skill-set";

/** Atoms for page interaction. */
export const informationActivePageAtom = atom<number>(1);
const increasePage = atom(informationActivePageAtom, (get, set) =>
  set(informationActivePageAtom, get(informationActivePageAtom) + 1),
);
const decreasePage = atom(informationActivePageAtom, (get, set) =>
  set(informationActivePageAtom, get(informationActivePageAtom) - 1),
);
export const informationActivePageAtomFn = {
  increasePage,
  decreasePage,
};

/** Atoms for storing user information each page. */
export const informationUserAtom = atom<User | null>(null);
export const skillSetAtom = atom<UserSkillSet | null>(null);

/** Atoms to check whether user filled information form or not. */
export const isAlreadyFilledInformationFormAtom = atom<boolean>(true);
import { atom } from "jotai";

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

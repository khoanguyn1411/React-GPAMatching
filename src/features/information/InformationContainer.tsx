import { atom, useAtom } from "jotai";
import { FC } from "react";

const num = atom(0);

export const InformationContainer: FC = () => {
  const [test, setTest] = useAtom(num);
  return <button onClick={() => setTest(test + 1)}>{test}</button>;
};

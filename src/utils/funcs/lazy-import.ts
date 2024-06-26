import { lazy } from "react";

import { RecordObject } from "../types/common";
import { delay } from "./delay";
const DEFAULT_DELAY_IMPORT = 800;

export function lazyImport<I extends RecordObject>(factory: () => Promise<I>, name: keyof I): I {
  return Object.create({
    [name]: lazy(() =>
      delay(DEFAULT_DELAY_IMPORT).then(() =>
        factory().then((module) => ({ default: module[name] })),
      ),
    ),
  });
}

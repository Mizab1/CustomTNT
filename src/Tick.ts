import { MCFunction, Objective, Selector, execute } from "sandstone";
import { handler, setTntblock } from "./CustomTnt/Tick";
import { spawnSlime, teleportSlime } from "./CustomTnt/DisableSlots";
import { decrementFuseTime } from "./CustomTnt/Fuse";

const fuseTimeObj = Objective.create("fuse_time_obj", "dummy");
const rngObj = Objective.create("rng_obj", "dummy");
const privateObj = Objective.create("private_obj", "dummy");

export const fuseTime = fuseTimeObj("@s");

export const self = Selector("@s");

const tick = MCFunction(
  "tick",
  () => {
    // tnt related
    setTntblock();
    handler();

    // disable slots
    teleportSlime();
    spawnSlime();
    decrementFuseTime();
  },
  { runEachTick: true }
);

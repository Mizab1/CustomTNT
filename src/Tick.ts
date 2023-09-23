import { MCFunction, Objective, Selector, execute } from "sandstone";
import { handler, setTntblock } from "./CustomTnt/Tick";
import { spawnSlime, teleportSlime } from "./CustomTnt/DisableSlots";
import { decrementFuseTime } from "./CustomTnt/Fuse";
import { hitGround } from "./Items/Dynamite";

const fuseTimeObj = Objective.create("fuse_time_obj", "dummy");
const rngObj = Objective.create("rng_obj", "dummy");
const privateObj = Objective.create("private_obj", "dummy");

export const fuseTime = fuseTimeObj("@s");

export const self = Selector("@s");

const tick = MCFunction(
  "tick",
  () => {
    // TNT related
    setTntblock();
    handler();

    // Dynamite
    hitGround();

    // Disable slots of the Armor stand disguised as Custom TNT
    teleportSlime();
    spawnSlime();
    decrementFuseTime();
  },
  { runEachTick: true }
);

import { MCFunction, execute, Selector } from "sandstone";
import { fuseTime } from "../Tick";

export const decrementFuseTime = MCFunction(
  "custom_tnt/decrement_fuse_time",
  () => {
    execute
      .as(
        Selector("@e", {
          type: "armor_stand",
          // tag: ["tnt.as", "!gravity_base"],
          tag: ["tnt.as"],
        })
      )
      .if(fuseTime.greaterThan(0))
      .run(() => {
        fuseTime.remove(1);
      });
  }
);

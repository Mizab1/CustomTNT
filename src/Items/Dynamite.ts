import {
  MCFunction,
  NBT,
  Selector,
  _,
  execute,
  kill,
  raw,
  rel,
  say,
  summon,
} from "sandstone";
import { self } from "../Tick";

export const Tick = MCFunction("items/dynamite/tick", () => {
  execute
    .as(Selector("@e", { type: "minecraft:snowball" }))
    .at(self)
    .run(() => {
      for (let i = -0.5; i <= 0.5; i += 0.5) {
        for (let j = -0.5; j <= 0.5; j += 0.5) {
          for (let k = -0.5; k <= 0.5; k += 0.5) {
            _.if(_.not(_.block(rel(i, j, k), "air")), () => {
              raw(
                `summon fireball ~ ~-1 ~ {ExplosionPower:20b,power:[0.0,-1.0,0.0]}`
              );
              kill(self);
            });
          }
        }
      }
    });
});

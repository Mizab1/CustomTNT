import {
  MCFunction,
  Selector,
  _,
  execute,
  give,
  kill,
  raw,
  rel,
} from "sandstone";
import { self } from "../Tick";
import { i } from "../Utils/Functions";

/**
 * A function run by all snowballs to check if it hit the ground
 */
export const hitGround = MCFunction("items/dynamite/hit_ground", () => {
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

/**
 * A standalone function to give a gravity gun to the current executing player
 */
const giveGun = MCFunction("items/dynamite/give", () => {
  give(self, "minecraft:snowball", 1);
});

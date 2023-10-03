import {
  MCFunction,
  NBT,
  Selector,
  _,
  data,
  execute,
  kill,
  particle,
  raw,
  rel,
  schedule,
  setblock,
  summon,
} from "sandstone";
import { self } from "../Tick";
import { b } from "../Utils/Functions";
import {
  explosionHandler,
  placeAndCreateFunction,
} from "./private/SetupGenerics";
import { pushBackApi } from "../Utils/PushBackApi";

export const setTntblock = MCFunction("custom_tnt/setblock", () => {
  execute
    .as(Selector("@e", { type: "minecraft:endermite", tag: "tnt.endermite" }))
    .at(self)
    .run(() => {
      // Creates the "Give TNT" function and does the processing if Custom TNT is placed
      placeAndCreateFunction("give_5x", "5x TNT", "5x", 110001);
      placeAndCreateFunction("give_10x", "10x TNT", "10x", 110002);
      placeAndCreateFunction("give_20x", "20x TNT", "20x", 110003);
      placeAndCreateFunction("give_house", "House TNT", "house", 110004);
      placeAndCreateFunction("give_mobs", "Mobs TNT", "animals", 110005);
      placeAndCreateFunction(
        "give_lightning",
        "Lightning Strike TNT",
        "lightning",
        110006
      );
      placeAndCreateFunction("give_fire", "Fire TNT", "fire", 110007);
      placeAndCreateFunction("give_nuclear", "Nuclear TNT", "nuclear", 110008);
      placeAndCreateFunction("give_warden", "Warden TNT", "warden", 110009);
      placeAndCreateFunction("give_big", "Big TNT", "big", 110010);
      placeAndCreateFunction("give_small", "Small TNT", "small", 110011);
      placeAndCreateFunction(
        "give_knockback",
        "Knockback TNT",
        "knockback",
        110013
      );
    });
});

export const handler = MCFunction("custom_tnt/handler", () => {
  execute
    .as(Selector("@e", { type: "minecraft:armor_stand", tag: "tnt.as" }))
    .at(self)
    .run(() => {
      // Cycle through all the available TNT and pick the correct handler
      explosionHandler(
        "tnt.5x",
        100,
        () => {
          particle(
            "minecraft:flame",
            rel(0, 0, 0),
            [0.2, 0.2, 0.2],
            0.1,
            10,
            "force"
          );
        },
        () => {
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(7),
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.10x",
        100,
        () => {
          particle(
            "minecraft:flame",
            rel(0, 0, 0),
            [0.3, 0.3, 0.3],
            0.1,
            10,
            "force"
          );
          raw(
            `particle dust 0.973 1.000 0.169 1 ~ ~0.8 ~ 0.5 0.5 0.5 1 10 force`
          );
        },
        () => {
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(10),
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.20x",
        100,
        () => {
          particle(
            "minecraft:flame",
            rel(0, 0, 0),
            [0.5, 0.5, 0.5],
            0.1,
            15,
            "force"
          );
          raw(`particle end_rod ~ ~1 ~ 0 0 0 0.1 1 force`);
        },
        () => {
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(15),
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.house",
        100,
        () => {
          raw(
            `particle dust 0.302 0.722 1.000 1 ~0.3 ~0.8 ~0.3 0 0.5 0 0.2 15 force`
          );
          raw(
            `particle dust 0.302 0.722 1.000 1 ~-0.3 ~0.8 ~-0.3 0 0.5 0 0.2 15 force`
          );
          raw(
            `particle dust 0.302 0.722 1.000 1 ~0.3 ~0.8 ~-0.3 0 0.5 0 0.2 15 force`
          );
          raw(
            `particle dust 0.302 0.722 1.000 1 ~-0.3 ~0.8 ~0.3 0 0.5 0 0.2 15 force`
          );
        },
        () => {
          let markerTag: string = "house.marker";
          let houses: string[] = [
            "plains_armorer_house_1",
            "plains_butcher_shop_1",
            "plains_fletcher_house_1",
            "plains_masons_house_1",
            "plains_medium_house_2",
            "plains_small_house_1",
            "plains_tool_smith_1",
            "plains_weaponsmith_1",
          ];

          // Spawn and spread the house marker
          summon("minecraft:armor_stand", rel(0, 0, 0), {
            Tags: [markerTag, "house"],
          });

          // Spawn the house
          execute
            .as(
              Selector("@e", { type: "minecraft:armor_stand", tag: markerTag })
            )
            .at(self)
            .run(() => {
              raw(`particle minecraft:wax_on ~ ~ ~ 3 3 3 0 5000 force`);
              _.if(Selector("@s", { tag: "house" }), () => {
                setblock(
                  rel(0, -2, 0),
                  b("minecraft:structure_block[mode=load]", {
                    name: `houses/${houses[4]}`,
                    rotation: "NONE",
                    mirror: "NONE",
                    mode: "LOAD",
                    posX: -4,
                    posY: 2,
                    posZ: -5,
                  }),
                  "replace"
                );
                setblock(rel(0, -3, 0), "minecraft:redstone_block", "replace");
                kill(self);
              });
            });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.animals",
        100,
        () => {
          particle(
            "minecraft:cloud",
            rel(0, 1, 0),
            [0.1, 0.5, 0.1],
            0.1,
            15,
            "force"
          );
        },
        () => {
          for (let i = 0; i < 25; i++) {
            summon("minecraft:zombie", rel(0, 0, 0), {
              Tags: ["tnt.zombie"],
              Motion: [
                Math.random().toFixed(2),
                Math.random().toFixed(2),
                Math.random().toFixed(2),
              ],
            });
            summon("minecraft:creeper", rel(0, 0, 0), {
              Tags: ["tnt.creeper"],
              Motion: [
                Math.random().toFixed(2),
                Math.random().toFixed(2),
                Math.random().toFixed(2),
              ],
            });
            summon("minecraft:skeleton", rel(0, 0, 0), {
              Tags: ["tnt.skeleton"],
              Motion: [
                Math.random().toFixed(2),
                Math.random().toFixed(2),
                Math.random().toFixed(2),
              ],
              HandItems: [{ id: "minecraft:bow", Count: NBT.byte(1) }, {}],
            });
            summon("minecraft:blaze", rel(0, 0, 0), {
              Tags: ["tnt.blaze"],
              Motion: [
                Math.random().toFixed(2),
                Math.random().toFixed(2),
                Math.random().toFixed(2),
              ],
            });
            summon("minecraft:enderman", rel(0, 0, 0), {
              Tags: ["tnt.enderman"],
              Motion: [
                Math.random().toFixed(2),
                Math.random().toFixed(2),
                Math.random().toFixed(2),
              ],
            });
            summon("minecraft:stray", rel(0, 0, 0), {
              Tags: ["tnt.stray"],
              Motion: [
                Math.random().toFixed(2),
                Math.random().toFixed(2),
                Math.random().toFixed(2),
              ],
              HandItems: [{ id: "minecraft:bow", Count: NBT.byte(1) }, {}],
            });
            summon("minecraft:husk", rel(0, 0, 0), {
              Tags: ["tnt.husk"],
              Motion: [
                Math.random().toFixed(2),
                Math.random().toFixed(2),
                Math.random().toFixed(2),
              ],
            });
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.lightning",
        100,
        () => {
          particle("minecraft:flash", rel(0, 1, 0), [1, 1, 1], 0, 2, "force");
        },
        () => {
          summon("minecraft:marker", rel(0, 0, 0), {
            Invisible: NBT.byte(1),
            Tags: ["lightning.marker"],
          });
          schedule.function(
            MCFunction("custom_tnt/auxillary/schedule_kill", () => {
              kill(
                Selector("@e", {
                  type: "minecraft:marker",
                  tag: "lightning.marker",
                })
              );
            }),
            "300t",
            "replace"
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.fire",
        100,
        () => {
          particle(
            "minecraft:smoke",
            rel(0, 0.8, 0),
            [0.2, 0.2, 0.2],
            0.1,
            20,
            "force"
          );
        },
        () => {
          raw(
            `fill ~10 ~10 ~10 ~-10 ~-10 ~-10 minecraft:fire replace minecraft:air`
          );
          particle("minecraft:explosion", rel(0, 0, 0), [5, 5, 5], 0, 6_000);
        },
        null,
        null
      );
      explosionHandler(
        "tnt.nuclear",
        100,
        () => {
          particle(
            "minecraft:crimson_spore",
            rel(0, 0.8, 0),
            [0, 0, 0],
            0,
            20,
            "force"
          );
          particle(
            "minecraft:soul_fire_flame",
            rel(0, 0.8, 0),
            [0, 0, 0],
            0.1,
            5,
            "force"
          );
          raw(`particle angry_villager ~ ~1 ~ 0.5 0.5 0.5 1 1 force`);
        },
        () => {
          for (let i = -3; i <= 3; i++) {
            for (let j = -3; j <= 3; j++) {
              raw(
                `summon fireball ~${i * 10} ~-0.8 ~${
                  j * 10
                } {ExplosionPower:100b,power:[0.0,-1.0,0.0]}`
              );
            }
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.warden",
        100,
        () => {
          raw(
            `particle falling_dust black_concrete ~ ~0.8 ~ 0.5 0.5 0.5 1 10 normal`
          );
          particle(
            "minecraft:smoke",
            rel(0, 0.8, 0),
            [0.2, 0.2, 0.2],
            0.1,
            20,
            "force"
          );
          raw(`particle sonic_boom ~ ~1 ~ 0.5 0.5 0.5 1 1`);
        },
        () => {
          summon("minecraft:warden", rel(0, 0, 0), {
            Brain: {
              memories: {
                '"minecraft:dig_cooldown"': { ttl: NBT.long(1200), value: {} },
                '"minecraft:is_emerging"': { ttl: NBT.long(134), value: {} },
              },
            },
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.big",
        100,
        () => {
          particle(
            "minecraft:cloud",
            rel(0, 1.2, 0),
            [0.2, 0.2, 0.2],
            0.1,
            5,
            "force"
          );
          particle(
            "minecraft:smoke",
            rel(0, 1.2, 0),
            [0.2, 0.2, 0.2],
            0.1,
            10,
            "force"
          );
        },
        () => {
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(14),
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.small",
        100,
        () => {
          particle(
            "minecraft:cloud",
            rel(0, 0.8, 0),
            [0.2, 0.2, 0.2],
            0.1,
            2,
            "force"
          );
          particle(
            "minecraft:smoke",
            rel(0, 0.8, 0),
            [0.2, 0.2, 0.2],
            0.1,
            5,
            "force"
          );
        },
        () => {
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(2),
          });
        },
        () => {
          data.merge.entity(self, {
            ArmorItems: [
              {},
              {},
              {},
              {
                id: "minecraft:endermite_spawn_egg",
                Count: NBT.byte(1),
                tag: { CustomModelData: 110012 },
              },
            ],
          });
        },
        null
      );
      explosionHandler(
        "tnt.knockback",
        100,
        () => {
          particle(
            "minecraft:reverse_portal",
            rel(0, 0.8, 0),
            [0.2, 0.2, 0.2],
            0.1,
            2,
            "force"
          );
        },
        () => {
          pushBackApi();
        },
        null,
        null
      );
    });
});

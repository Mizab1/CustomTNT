import {
  MCFunction,
  NBT,
  Selector,
  _,
  data,
  execute,
  fill,
  gamerule,
  kill,
  particle,
  raw,
  rel,
  schedule,
  setblock,
  spreadplayers,
  summon,
} from "sandstone";
import * as lodash from "lodash";
import { self } from "../Tick";
import {
  b,
  randomFloatFromInterval,
  randomIntFromInterval,
} from "../Utils/Functions";
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
      placeAndCreateFunction("give_jerome", "Jerome TNT", "jerome", 110014);
      placeAndCreateFunction("give_tree", "Tree TNT", "tree", 110015);
      placeAndCreateFunction("give_wolf", "Angry Wolf TNT", "wolf", 110016);
      placeAndCreateFunction("give_bees", "Angry Bees TNT", "bees", 110017);
      placeAndCreateFunction("give_honey", "Honey TNT", "honey", 110018);
      placeAndCreateFunction("give_creeper", "Creeper TNT", "creeper", 110019);
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
            CustomName: '{"text":"TNT","italic":false}',
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
            CustomName: '{"text":"TNT","italic":false}',
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
            CustomName: '{"text":"TNT","italic":false}',
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
                } {ExplosionPower:100b,power:[0.0,-1.0,0.0], CustomName: '{"text":"TNT","italic":false}',}`
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
          raw(`particle sonic_boom ~ ~1 ~ 0.5 0.5 0.5 1 1 force`);
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
            CustomName: '{"text":"TNT","italic":false}',
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
            CustomName: '{"text":"TNT","italic":false}',
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
            10,
            "force"
          );
          particle(
            "minecraft:poof",
            rel(0, 0.8, 0),
            [0.2, 0.2, 0.2],
            0.5,
            2,
            "force"
          );
        },
        () => {
          summon("minecraft:armor_stand", rel(0, 0, 0), {
            Marker: NBT.byte(1),
            Tags: ["pushback.aS"],
          });
          pushBackApi();
        },
        null,
        null
      );
      explosionHandler(
        "tnt.jerome",
        100,
        () => {
          raw(
            `particle minecraft:block brown_concrete ~ ~0.8 ~ 0.3 0.3 0.3 1 15 force`
          );
          raw(
            `particle minecraft:block blue_concrete ~ ~0.8 ~ 0.3 0.3 0.3 1 15 force`
          );
        },
        () => {
          for (let i = 0; i < 15; i++) {
            summon("minecraft:zombie", rel(0, 0, 0), {
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
              CustomName: '{"text":"Jerome"}',
              DeathLootTable: "minecraft:bat",
              Silent: NBT.byte(1),
            });
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.tree",
        100,
        () => {
          raw(
            `particle minecraft:block oak_leaves ~ ~0.8 ~ 0.3 0.3 0.3 1 5 force`
          );
          raw(
            `particle minecraft:block dark_oak_leaves ~ ~0.8 ~ 0.3 0.3 0.3 1 5 force`
          );
          raw(
            `particle minecraft:block birch_leaves ~ ~0.8 ~ 0.3 0.3 0.3 1 5 force`
          );
        },
        () => {
          for (let i = 0; i < 4; i++) {
            summon("minecraft:armor_stand", rel(0, 0, 0), {
              Tags: ["tree.as", "tree.oak"],
              Invisible: NBT.byte(1),
            });
            summon("minecraft:armor_stand", rel(0, 0, 0), {
              Tags: ["tree.as", "tree.birch"],
              Invisible: NBT.byte(1),
            });
            summon("minecraft:armor_stand", rel(0, 0, 0), {
              Tags: ["tree.as", "tree.dark_oak"],
              Invisible: NBT.byte(1),
            });
            summon("minecraft:armor_stand", rel(0, 0, 0), {
              Tags: ["tree.as", "tree.acacia"],
              Invisible: NBT.byte(1),
            });
          }
          spreadplayers(
            rel(0, 0),
            4,
            13,
            false,
            Selector("@e", { type: "minecraft:armor_stand", tag: "tree.as" })
          );
          execute
            .as(
              Selector("@e", { type: "minecraft:armor_stand", tag: "tree.as" })
            )
            .at(self)
            .run(() => {
              execute.if
                .entity(Selector("@s", { tag: ["tree.oak"] }))
                .run.raw(`place feature minecraft:oak`);
              execute.if
                .entity(Selector("@s", { tag: ["tree.dark_oak"] }))
                .run.raw(`place feature minecraft:dark_oak`);
              execute.if
                .entity(Selector("@s", { tag: ["tree.birch"] }))
                .run.raw(`place feature minecraft:birch`);
              execute.if
                .entity(Selector("@s", { tag: ["tree.acacia"] }))
                .run.raw(`place feature minecraft:acacia`);
              kill(self);
            });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.wolf",
        100,
        () => {
          raw(
            `particle minecraft:angry_villager ~ ~0.8 ~ 0.3 0.3 0.3 1 4 force`
          );
        },
        () => {
          gamerule("universalAnger", true);
          for (let i = 0; i < 15; i++) {
            summon("minecraft:wolf", rel(0, 0, 0), {
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
              AngerTime: 19999980,
              DeathLootTable: "minecraft:bat",
            });
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.bees",
        100,
        () => {
          raw(
            `particle minecraft:block honey_block ~ ~0.8 ~ 0.3 0.3 0.3 1 4 force`
          );
          raw(
            `particle minecraft:falling_nectar ~ ~0.8 ~ 0.3 0.3 0.3 1 20 force`
          );
        },
        () => {
          gamerule("universalAnger", true);
          for (let i = 0; i < 20; i++) {
            summon("minecraft:bee", rel(0, 0, 0), {
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
              AngerTime: 19999980,
              DeathLootTable: "minecraft:bat",
            });
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.honey",
        100,
        () => {
          raw(
            `particle minecraft:block honey_block ~ ~0.8 ~ 0.3 0.3 0.3 1 2 force`
          );
          raw(
            `particle minecraft:falling_honey ~ ~0.8 ~ 0.5 0.5 0.5 1 4 force`
          );
        },
        () => {
          raw(
            `fill ~-5 ~-5 ~-5 ~5 ~5 ~5 minecraft:honey_block replace #aestd1:all_but_air`
          );
          // fill(rel(-6, -6, -6), rel(6, 6, 6), "minecraft:honey_block");
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            CustomName: '{"text":"TNT","italic":false}',
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.creeper",
        100,
        () => {
          raw(
            `particle minecraft:ambient_entity_effect ~ ~0.8 ~ 0.1 0.1 0.1 1 10 force`
          );
        },
        () => {
          for (let i = 0; i < 20; i++) {
            summon("minecraft:creeper", rel(0, 0, 0), {
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
              DeathLootTable: "minecraft:bat",
            });
          }
          for (let i = 0; i < 5; i++) {
            summon("minecraft:creeper", rel(0, 0, 0), {
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
              DeathLootTable: "minecraft:bat",
              powered: NBT.byte(1),
            });
          }
        },
        null,
        null
      );
    });
});

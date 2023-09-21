import {
  MCFunction,
  NBT,
  Selector,
  _,
  execute,
  kill,
  particle,
  raw,
  rel,
  setblock,
  spreadplayers,
  summon,
} from "sandstone";
import { self } from "../Tick";
import {
  explosionHandler,
  placeAndCreateFunction,
} from "./private/SetupGenerics";
import { b } from "../Utils/Functions";

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
            20,
            "force"
          );
        },
        () => {
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(10),
          });
        },
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
            25,
            "force"
          );
        },
        () => {
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(15),
          });
        },
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
          let housesLoop: number = 12;
          let numHouses: number = 8;

          for (let i = 0; i < housesLoop; i++) {
            // Spawn and spread the house marker
            summon("minecraft:armor_stand", rel(0, 0, 0), {
              Tags: [markerTag, "house" + ((i % numHouses) + 1)],
            });
          }
          spreadplayers(
            rel(0, 0),
            10,
            50,
            false,
            Selector("@e", { type: "minecraft:armor_stand", tag: markerTag })
          );

          // Spawn the house
          execute
            .as(
              Selector("@e", { type: "minecraft:armor_stand", tag: markerTag })
            )
            .at(self)
            .run(() => {
              for (let i = 0; i < housesLoop; i++) {
                let pickRandomHouse =
                  houses[Math.floor(Math.random() * houses.length)];
                _.if(
                  Selector("@s", { tag: "house" + ((i % numHouses) + 1) }),
                  () => {
                    setblock(
                      rel(0, -2, 0),
                      b("minecraft:structure_block[mode=load]", {
                        name: `houses/${pickRandomHouse}`,
                        rotation: "NONE",
                        mirror: "NONE",
                        mode: "LOAD",
                        posX: -4,
                        posY: 2,
                        posZ: -4,
                      }),
                      "replace"
                    );
                    setblock(
                      rel(0, -3, 0),
                      "minecraft:redstone_block",
                      "replace"
                    );
                    kill(self);
                  }
                );
              }
            });
        },
        null
      );
    });
});

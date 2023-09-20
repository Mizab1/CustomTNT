import {
  MCFunction,
  NBT,
  Selector,
  _,
  execute,
  give,
  kill,
  playsound,
  rel,
  setblock,
  summon,
  tag,
  tp,
} from "sandstone";
import { CombinedConditions } from "sandstone/flow/conditions";
import { fuseTime, self } from "../../Tick";
import { i } from "../../Utils/Functions";

const placeTnt = (tag: string, customModelData: number) => {
  _.if(Selector("@s", { tag: tag }), () => {
    summon("minecraft:armor_stand", rel(0, 0, 0), {
      NoGravity: NBT.byte(0),
      Invisible: NBT.byte(1),
      Tags: [`tnt.${tag}`, `tnt.as`],
      ArmorItems: [
        {},
        {},
        {},
        {
          id: "minecraft:endermite_spawn_egg",
          Count: NBT.byte(1),
          tag: { CustomModelData: customModelData },
        },
      ],
      DisabledSlots: 63,
    });
    setblock(rel(0, 0, 0), "minecraft:tnt");
    tp(self, rel(0, -600, 0));
  });
};

const createGiveFunction = (
  nameOfTheGiveFunction: string,
  nameOfTheTnt: string,
  tag: string,
  customModelData: number
) => {
  MCFunction("give_tnt/" + nameOfTheGiveFunction, () => {
    give(
      self,
      i("minecraft:endermite_spawn_egg", {
        display: {
          Name: `{"text":"${nameOfTheTnt}","color":"#FF0808","italic":false}`,
        },
        CustomModelData: customModelData,
        EntityTag: {
          Silent: NBT.byte(1),
          NoAI: NBT.byte(1),
          Tags: [`${tag}`, "tnt.endermite"],
          ActiveEffects: [
            {
              Id: NBT.byte(14),
              Amplifier: NBT.byte(1),
              Duration: 999999,
              ShowParticles: NBT.byte(0),
            },
          ],
        },
      })
    );
    // give(
    //   self,
    //   "minecraft:endermite_spawn_egg" +
    //     `{display:{Name:'{"text":"${nameOfTheTnt}","color":"#FF0808","italic":false}'},CustomModelData: ${customModelData},EntityTag:{Silent:1b,NoAI:1b, Tags:["${tag}","tnt.endermite"],ActiveEffects:[{Id:14b,Amplifier:1b,Duration: 999999,ShowParticles: 0b}]}}`
    // );
  });
};

// Combination of 2 functions
export const placeAndCreateFunction = (
  nameOfTheGiveFunction: string,
  nameOfTheTnt: string,
  tag: string,
  customModelData: number
) => {
  placeTnt(tag, customModelData);
  createGiveFunction(nameOfTheGiveFunction, nameOfTheTnt, tag, customModelData);
};

const primingCondition: CombinedConditions = _.or(
  Selector("@e", {
    type: "minecraft:tnt",
    distance: [Infinity, 1],
  }),
  Selector("@s", { tag: "picked_up" })
);
export const explosionHandler = (
  TntTag: string,
  FuseTimer: number,
  displayParticles: () => void,
  eventOnExplosion: () => void,
  runEachTick: () => void | null
) => {
  execute.if(Selector("@s", { tag: TntTag })).run(() => {
    // Check if the TNT is primed or getting picked by gravity gun
    _.if(primingCondition, () => {
      kill(
        Selector("@e", {
          type: "minecraft:tnt",
          distance: [Infinity, 1],
        })
      ); // kill the closed TNT

      playsound("minecraft:entity.tnt.primed", "master", "@a"); // Play the TNT primed sound

      fuseTime.set(FuseTimer); // Set the fuse time to {FuseTimer} ticks

      tag(self).add("is_primed"); // Add a tag for tracking purposes
      tag(self).remove("picked_up");
    });

    // * Run Continuously if the TNT is primed
    _.if(fuseTime.greaterOrEqualThan(0), () => {
      // Display particles
      displayParticles();

      // Run this auxillary function each fuse time
      runEachTick ? runEachTick() : "";

      // Run when fuse reaches 0 i.e the TNT is exploding
      _.if(fuseTime.matches(0), () => {
        eventOnExplosion();

        kill(self); // Kill the TNT (i.e it exploded)
      });
    });

    // Kill the model if the TNT is broken or the TNT is lifted
    execute
      .unless(_.block(rel(0, 0, 0), "minecraft:tnt"))
      .unless(Selector("@s", { tag: "is_primed" }))
      .run(() => {
        kill(self);
      });
  });
};

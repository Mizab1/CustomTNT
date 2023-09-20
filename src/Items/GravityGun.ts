import { MCFunction, give } from "sandstone";
import { self } from "../Tick";
import { i } from "../Utils/Functions";

const giveGun = MCFunction("items/gravity_gun/give", () => {
  give(
    self,
    i("minecraft:warped_fungus_on_a_stick", {
      CustomModelData: 111101,
      gravity_guns: "gravity_gun",
      gravity_power: 1,
      display: { Name: '{"text":"TNT Gravity Gun","italic":false}' },
    }),
    1
  );
});

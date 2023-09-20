import type { SandstoneConfig } from "sandstone";

export default {
  name: "CustomTNT",
  description: ["A Datapack by ", { text: "Mizab", color: "gold" }],
  formatVersion: 15,
  namespace: "default",
  packUid: "43FVcHYS",
  // saveOptions: { path: './.sandstone/output/datapack' },
  saveOptions: { world: "Testing 4" },
  onConflict: {
    default: "warn",
  },
} as SandstoneConfig;

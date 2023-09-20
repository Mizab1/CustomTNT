import type { SandstoneConfig } from "sandstone";

export default {
  name: "CustomTNT",
  description: ["A ", { text: "Sandstone", color: "gold" }, " data pack."],
  formatVersion: 7,
  namespace: "default",
  packUid: "43FVcHYS",
  // saveOptions: { path: './.sandstone/output/datapack' },
  saveOptions: { world: "Testing 4" },
  onConflict: {
    default: "warn",
  },
} as SandstoneConfig;

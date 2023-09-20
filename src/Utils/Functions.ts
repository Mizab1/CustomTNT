import { ITEMS, LiteralUnion, RootNBT, nbtParser } from "sandstone";

export function i(item: LiteralUnion<ITEMS>, nbt: RootNBT) {
  return `${item}${nbtParser(nbt)}`;
}

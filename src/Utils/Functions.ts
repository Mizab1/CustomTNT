import { ITEMS, LiteralUnion, RootNBT, nbtParser } from "sandstone";

/**
 * Concatenates the given item with the parsed nbt string.
 *
 * @param {LiteralUnion<ITEMS>} item - The item to be concatenated.
 * @param {RootNBT} nbt - The nbt string to be parsed.
 * @return {string} The concatenated string.
 */
export function i(item: LiteralUnion<ITEMS>, nbt: RootNBT) {
  return `${item}${nbtParser(nbt)}`;
}

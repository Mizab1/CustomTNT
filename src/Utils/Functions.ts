import { BLOCKS, ITEMS, LiteralUnion, RootNBT, nbtParser } from "sandstone";

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

/**
 * Generates a string by concatenating a block with its corresponding NBT.
 *
 * @param {LiteralUnion<BLOCKS>} block - The block to concatenate.
 * @param {RootNBT} nbt - The NBT to concatenate.
 * @return {string} The concatenated string.
 */
export function b(block: LiteralUnion<BLOCKS>, nbt: RootNBT) {
  return `${block}${nbtParser(nbt)}`;
}

/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 *
 * @param {number} min - The minimum value for the random integer.
 * @param {number} max - The maximum value for the random integer.
 * @return {number} The generated random integer.
 */
export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


interface Number {
    /**
    * Clamps the number within the specified range.
    *
    * @param {number} min - the minimum value of the range
    * @param {number} max - the maximum value of the range
    * @return {number} the clamped number
    */
    clamp(min: number, max: number): number
};


/**
 * Clamps the number within the specified range.
 *
 * @param {number} min - the minimum value of the range
 * @param {number} max - the maximum value of the range
 * @return {number} the clamped number
 */
Number.prototype.clamp = function (min: number, max: number): number {
    return Math.min(Math.max(this, min), max);
}
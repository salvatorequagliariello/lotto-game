// @ts-check
/**
 * @author Salvatore Quagliariello
 * @module lotto-draw.js
 */


/**
 @class The Class we use to generate Draw Objects.
 */
class LottoDraw {
    #cities; 
    #numbersToDraw;
    #maxNumberDraw;
    #minNumberDraw;
    #init;
    /**
     * The arguments passed as parameters will be evaluated in the .#drawExe private method, then used to init the object. Declaring a Draw
     * Object with the wrong type of arguments will lead to a TypeError.
     * @param {Array<String>} cities An array containing lines name for our Draw.
     * @param {Number} numbersToDraw The quantity of numbers to draw for every line passed.
     * @param {Number} maxNumberDraw The greatest number that can be draw (can't be zero).
     * @param {Number} minNumberDraw The minimum number that can be draw (can't be zero and can't be greater than the prev parameter).
     */
    constructor(cities, numbersToDraw, maxNumberDraw, minNumberDraw) {
        this.#cities = cities;
        this.#numbersToDraw = numbersToDraw;
        this.#maxNumberDraw = maxNumberDraw;
        this.#minNumberDraw = minNumberDraw;
        this.#init = this.#drawExe();
    }

    /**
     * A private Method used in the Constructor to initialize the Draw Object declared. Perform a validity check on all of the passed Arguments, then
     * proceeds to create object properties. The `this.#cities` members will be used as properties, and their value will be an Array of `this.#numbersToDraw` length
     * composed of random numbers within a range of `this.#minNumberDraw` and `this.#maxNumberDraw`.
     */
    #drawExe() {
        if(!Array.isArray(this.#cities) || !this.#cities.length) {
            throw new TypeError(`Please, enter a valid list of cities!`);
        }

        if((this.#numbersToDraw <= 0) || (isNaN(this.#numbersToDraw)) || (!Number.isInteger(this.#numbersToDraw))) {
            throw new TypeError(`Please, enter a valid number of numbers to draw!`);
        }

        if((this.#maxNumberDraw <= 0) || (isNaN(this.#maxNumberDraw)) || (!Number.isInteger(this.#maxNumberDraw))) {
            throw new TypeError(`Please, enter a valid maximum number for your draw!`);
        }

        if((this.#minNumberDraw <= 0) || (isNaN(this.#minNumberDraw)) || (!Number.isInteger(this.#minNumberDraw)) || (this.#minNumberDraw > this.#maxNumberDraw)) {
            throw new TypeError(`Please, enter a valid minimum number for your draw!`);
        }

        this.#cities.forEach(city => this[city] = Array.from({length: this.#numbersToDraw}, () => Math.floor(Math.random() * (this.#maxNumberDraw - this.#minNumberDraw + 1)) + this.#minNumberDraw))
    }

    /**
     * Method used to print a Draw Object. Returns a nice ASCII representation of a draw, containing made up of an upper part
     * (the Lotto logo and the day date) and a main part (the Ruote and their drawn numbers).
     * The function is almost totally built on the `.repeat` String method.
     * The output string is dynamically generated and follows the applied Object Properties length.
     * @returns {String} Returns a visual representation of the Draw Object.
     */
    print() {
        const drawnNumbers = this;
        const drawingWidth = Object.keys(drawnNumbers)[0].toString().length + Object.values(drawnNumbers)[0].join(` - `).length + 30;
        const block = `\█`;
        const upperEdge= `${block.repeat(drawingWidth)}\n${block}${` `.repeat(drawingWidth - 2)}${block}\n`;
        const lowerEdge = `${block}${` `.repeat(drawingWidth - 2)}${block}\n${block.repeat(drawingWidth)}`;
        const breakLine = `${block}${`\═`.repeat(drawingWidth - 2)}${block}\n${block}${` `.repeat(drawingWidth - 2)}${block}\n`;
        const flatBreakLine = `${block}${`\━`.repeat(drawingWidth - 2)}${block}\n${block}${` `.repeat(drawingWidth - 2)}${block}\n`;
        const lottoLineString = `${block}${` `.repeat(2)}L O T T O${` `.repeat(drawingWidth - 25)}Estrazione${` `.repeat(2)}${block}\n`;
        
        let drawnNumbersString = ``;
        for (let ruota in drawnNumbers) {
            // @ts-ignore
            const numbersString = `${drawnNumbers[ruota].join(` - `)}${` `.repeat(2)}`;
            const ruotaNameString = `${block}${` `.repeat(2)}${ruota.toUpperCase()}${` `.repeat((drawingWidth - 4 - numbersString.length) - ruota.length)}${numbersString}${block}\n`;
            drawnNumbersString += ruotaNameString + flatBreakLine;
        };
    
        const lottoDrawCompleteString = upperEdge + lottoLineString + breakLine + drawnNumbersString + lowerEdge;
        const outputString = lottoDrawCompleteString;
        return outputString;
    }
};

module.exports = LottoDraw;

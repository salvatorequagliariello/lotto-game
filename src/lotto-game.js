// @ts-check
/**
 * @author Salvatore Quagliariello
 * @module lotto-game.js
 */

const prompts = require('prompts');
const typeOfTicket = require(`./utils/q-type-of-ticket`);
const nOfTickets = require(`./utils/q-number-of-tickets`);
const ticketNumbers = require(`./utils/q-numbers`);
const citiesTicket = require(`./utils/q-cities`);
const betAmountQuestion = require(`./utils/q-bet-amount`);
const prizeCalculator = require(`./prize-calculator`);
const printWin = require(`./utils/print-win`);
const mainMenu = require(`./utils/q-main-menu`);
const LottoDraw = require(`./lotto-draw`);
const Ticket = require(`./ticket`);

/**
 * Use this Class to generate a new istance of Lotto game. A Lotto Game Object is capable to generate new Ticket Objects, new Draws and to check for winning Tickets. 
 * It's possible to use a Lotto Object through its CLI or calling its methods in the text editor.
 */
class LottoGame {
    /**@const @property*/
    #doneDraw;
    /**@const @property*/
    #doneCheckPrize;
    /**@const @property*/
    #hasWinningTickets
    /**
     * @param {Array<Object>} [tickets] Optional, an Array of succesfully declarated Ticket Objects.
     * @param {Object} [drawObj] Optional, a Draw Object, composed by at least a property and an Array opf Numbers as its Value.
     */
    constructor(tickets = [], drawObj = {}) {
        this.tickets = tickets;
        this.drawResults = (Object.keys(drawObj).length >= 1) ? drawObj : {};
        this.prizeObj = {};
        this.#doneDraw = (Object.keys(drawObj).length >= 1) ? true : false;
        this.#doneCheckPrize = false;
        this.#hasWinningTickets = false;
    }
    
    #printCheckPrize = printWin;
    #prizeCalculator = prizeCalculator;
    #mainMenuAsyncQ = mainMenu;
    /** Ticket Generation Async Questions */
    #betAmountQ = betAmountQuestion;
    #nOfTicketsAsyncQ = nOfTickets;
    #typeOfTicketAsyncQ = typeOfTicket;
    #numbersToPlayAsyncQ = ticketNumbers;
    #citiesTicketAsyncQ = citiesTicket;
    /** End of Ticket Generation Async Questions */

    /**
     * Async method used to open the Lotto Game CLI, entirely built on Prompts. The User can easily see what he/she can do with its own Ticket.
     * The CLI prompts changes dynamically according to what the User has alredy done. Choosing `Exit` will close the software.
     * If the User declarated the LottoGame Object without any Tickets, the software will ask him/she to `buy` some, up to 5.
     * Uses a `while` loop to check the User answer.
     * @async
     */
    async start(){
        if (this.tickets.length === 0)  {
            this.tickets = await this.#ticketGenerator();
        };

        let menuResponse;
        while (menuResponse !== `exit`) {
            menuResponse = await this.#mainMenuAsyncQ(this.tickets.length, this.#doneDraw, this.#doneCheckPrize, this.#hasWinningTickets);

            if (menuResponse === `draw`) {
                this.doDraw();
            } else if (menuResponse === `printTickets`) {
                console.log(this.printTickets());
            } else if (menuResponse === `checkWin`) {
                this.checkWin()
            } else if (menuResponse === `printDraw`) {
                console.log(this.printDraw());
            } else if (menuResponse === `printWin`) {
                console.log(this.printCheckWinResults())
            };
        };
    }

    /**
     * Checks for Tickets passed into the LottoGame Object. If there is at least one Ticket, proceeds printing it 
     * using the `.print()` Ticket method.
     * @returns {String} Returns an ASCII representation String of the Tickets generated.
     */
    printTickets() {
        if (this.tickets.length === 0)  throw new Error(`You don't any any Lotto Tickets! Try declaring your Lotto Game with some Tickets, or use the '.start' method to generate some!`);

        let outputString = ``;
        for (const ticket of this.tickets) {
            outputString += ticket.print() +`\n`;
        }

        return outputString;
    }
    
    /**
     * Generates a new Draw Object. It's possible to use the Draw Object generated to check for winning Tickets. The Object declared is 
     * automatically set as value of the `this.drawResults` property.
     * @returns {Object}
     */
    doDraw() {
        const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
        this.drawResults = draw;
        this.#doneDraw = true;
        return draw;
    }

    /**
     * Checks if a Draw has already been generated or passed as argument of the Constructor, then proceeds to print it 
     * using its own `.print()` method.
     * @returns {String} Returns an ASCII decorated String containing details about the declared Draw Object.
     */
    printDraw() {
        if ((this.#doneDraw === true) && (Object.keys(this.drawResults).length >= 1)) {
            return this.drawResults?.print();
        } else {
            throw new Error(`You have not yet partecipated to a Draw! Try using '.doDraw()' first!`)
        };
    }

    /**
     * Check for valid Tickets in the `this.tickets` Array, and for a valid Draw Object declarated as value of the `this.drawresults`, then
     * calls the `prize.calculator()` Function to check for winning Tickets. Updates the `this.#doneCheckPrize` property and the `this.#hasWinningTickets`,
     * if there is at least one winning Ticket. Set the function results as value of the `this.#prizeObj` property.
     * @returns {Object} The results of the `prize.calculator` function. 
     */
    checkWin() {
        if ((this.#doneDraw === false) && (Object.keys(this.drawResults).length === 0)) throw new Error(`You have not yet partecipated to a Draw! Try using '.doDraw()' first!`);
        if (this.tickets.length === 0) throw new Error(`You don't have any Tickets!`);

        const winCheckResults = this.#prizeCalculator(this.drawResults, this.tickets);
        this.#doneCheckPrize = true;
        this.prizeObj = winCheckResults;

        if((winCheckResults.winningTickets.length >= 1) && (winCheckResults.totalAmountWon > 0)) {
            this.#hasWinningTickets = true;
        };

        return winCheckResults;
    }

    /**
     * If the User has already checked for winning Tickets, he/she can print the results using this method.
     * @returns {String} A nice ASCII representation of the `prize.calculator` Function results.
     */
    printCheckWinResults () {
        if (this.#doneCheckPrize === false || Object.keys(this.prizeObj).length === 0) throw new Error(`You have not checked for winning Tickets yet! Try using '.checkWin()' first!`);
        
        const outputString = this.#printCheckPrize(this.prizeObj);
        return outputString;
    }

    /**
     * Uses several helper Functions builts on Prompts to help the User generating new Ticket Objects.
     * @async
     * @returns{Promise<Array<Object>>} Returns a Promise, that once fulfilled, returns an Array of Ticket Objects.
     */
    async #ticketGenerator() {
        const numberOfTickets = await this.#nOfTicketsAsyncQ();
        const tickets = [];
        
        for (let i = 0;  i < numberOfTickets; i++) {
            console.log('\x1b[30m\x1b[47m%s\x1b[0m', ` Ticket #${i + 1} `)
            const betAmount = await this.#betAmountQ();
            const typeOfTicket = await this.#typeOfTicketAsyncQ();
            const numbers = await this.#numbersToPlayAsyncQ(typeOfTicket);
            const cities = await this.#citiesTicketAsyncQ();
            
            // @ts-ignore
            tickets.push(new Ticket(typeOfTicket, numbers, cities, betAmount));
        };

        return tickets;
    }
}

module.exports = LottoGame;
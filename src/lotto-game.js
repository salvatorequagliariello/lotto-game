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
const Ticket = require(`./ticket`);

/**
 * @class The class LottoGame, is the reproduction of an instance of the Italian Lotto. It's possible to start
 * an istance of the Class and generate, trough a guided process, new tickets, or even to use your own
 * tickets object, passing them as arguments in the instance declaration.
 * The Class is capable to show the passed or generated Tickets, thanks to the `.#printTickets` privat method.
 */
class LottoGame {
    /**@const @property*/
    #tickets;
    /**
     * The only property of the Class is private, to avoid any unintentional event to modify the passed Tickets.
     * @param  {...Object} ticketObj Accept Ticket Objects, composed by a Type, a certain quantity of Numbers, and an Array of `Ruote` Strings.
     */
    constructor(...ticketObj) {
        this.#tickets = ticketObj;
    }
    
    #nOfTicketsAsyncQ = nOfTickets;
    #typeOfTicketAsyncQ = typeOfTicket;
    #numbersToPlayAsyncQ = ticketNumbers;
    #citiesTicketAsyncQ = citiesTicket;

    /**
     * The main Method of the Class. Checks, with a question, if the user has already passed in any Ticket Object.
     * If the answer is positive, the method then proceed to ask the User if he would like to print into the console his Tickets,
     * calling the `.#printTickets` private method.
     * If the answer is negative, the method use the `.#ticketGenerator()` private method, to generate Ticket Objects,
     * then ask the User if he would like to print into the console his Tickets, calling the `.#printTickets` private method.
     * @returns 
     */
    async start(){
        console.log('\x1b[30m\x1b[47m%s\x1b[0m', `LOTTO`);
        const startQuestion = await this.#startQuestion();

        if ((startQuestion === true) && (this.#tickets.length >= 1)) {
            const printedTickets = await this.#printTickets(this.#tickets);      
            console.log(printedTickets);
            return this.#tickets;
        } else {
            console.log(`It seems like you don't have any Lotto Ticket!`);
            const tickets = await this.#ticketGenerator();
            const printedTickets = await this.#printTickets(tickets);
            console.log(printedTickets);
            return tickets;
        }
    }

    /**
     * Built on `prompts`. The first question the software asks to the User. If the User has already passed into 
     * the Class Constructor one or more Ticket Objects, the method returns true, otherwise it returns false.
     * @returns {Promise<Boolean>} Returns a Promise that, once fullfilled, returns a Boolean value.
     */
    async #startQuestion() {
        const question = await prompts([
            {
                type: 'select',
                name: 'choice',
                message: `Have you already bought any Lotto Ticket?`,
                choices: [
                { title: 'Yes', value: true},
                { title: 'No', value: false}
                ],
                onRender(kleur) {
                    // @ts-ignore
                    this.msg = kleur.green(`Have you already bought any Lotto Ticket?`);
                }
            }]);
        
        return question.choice;
    };
    
    /**
     * This method uses a bunch of imported utils functions, to help the user to generate new Ticket Objects.
     * The first thing the method does is to ask the User how many Tickets he would like to generate (buy) (.#nOfTicketAsyncQ()).
     * The it, through a for loop statement, asks the User on what type of winning combination (.#typeOfTicketAsyncQ()),
     * on how many numbers (.#numbersToPlayAsyncQ()) and on which `Ruote` (.#citiesTicketAsyncQ()) he would like to place the bet on, 
     * as many times as the Tickets he'd like to buy, up to 5 Tickets.
     * @returns {Promise<Array<Object>>} Returns a Promise that, once fullfilled, returns an Array of Ticket Objects.
     */
    async #ticketGenerator() {
        const numberOfTickets = await this.#nOfTicketsAsyncQ();
        const tickets = [];
        
        for (let i = 0;  i < numberOfTickets; i++) {
            console.log('\x1b[30m\x1b[47m%s\x1b[0m', ` Ticket #${i + 1} `)
            const typeOfTicket = await this.#typeOfTicketAsyncQ();
            const numbers = await this.#numbersToPlayAsyncQ(typeOfTicket);
            const cities = await this.#citiesTicketAsyncQ();
            
            // @ts-ignore
            tickets.push(new Ticket(typeOfTicket, numbers, cities));
        };
        
        return tickets;
    }
    
    /**
     * This method is used in the .start method to print a nice ASCII representation of the Ticket Objects passed as argument.
     * Asks the User if he would like to see his own Tickets, using `prompts`.
     * @param {Array<Object>} ticketsList An Array of Ticket Objects.
     * @returns {Promise<String>} Returns a Promise that, if fullfilled, returns the printed Tickets as String, otherwise returns a String containing an Error message.
     */
    async #printTickets(ticketsList) {
        const question = await prompts([
            {
                type: 'select',
                name: 'choice',
                message: `Would you like to see your Tickets?`,
                choices: [
                { title: 'Yes', value: true},
                { title: 'No', value: false}
                ],
                onRender(kleur) {
                    // @ts-ignore
                    this.msg = kleur.green(`Would you like to see your Tickets?`);
                }
            }]);
    
        if (question.choice === false){
            return (`You chose to not see your Tickets.`);
        };

        const ticketsStringList = [];
        ticketsList.forEach(ticketObj => {
            ticketsStringList.push(ticketObj.print());
        });
        
        return ticketsStringList.join(`\n`); 
    }
}

module.exports = LottoGame;
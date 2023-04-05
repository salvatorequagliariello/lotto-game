// @ts-check
/**
 * @author Salvatore Quagliariello
 * @module q-number-of-tickets.js
 */

const prompts = require('prompts');

/**
 * An helper function, built on `Prompts`, that ask, through a personalized CLI Prompt, how many Lotto Tickets 
 * the user would like to be generated. User can create up to 5 Lotto Tickets.
 * The function is used as a Private Method of the LottoGame Class.
 * @returns {Promise<Number>} Returns a Promise, that once fulfilled returns a Number.
 */
async function nOfTicketsQuestion() {
    const response = await prompts([
        {
            type: 'select',
            name: 'numberOfTickets',
            message: `How many Lotto tickets would you like to buy?`,
            choices: [
                { title: '1', value: 1},
                { title: '2', value: 2},
                { title: '3', value: 3},
                { title: '4', value: 4},
                { title: '5', value: 5}
            ],
            onRender(kleur) {
                // @ts-ignore
                this.msg = kleur.green('How many Lotto tickets would you like to buy?');
            }
        }]);

    return response.numberOfTickets;
};

module.exports = nOfTicketsQuestion;

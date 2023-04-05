// @ts-check
/**
 * @author Salvatore Quagliariello
 * @module q-type-of-ticket.js
 */

const prompts = require('prompts');

/**
 * An helper function, built on `Prompts`, that ask, through a personalized CLI Prompt, what type of
 * winning combination the user would like to bet on. User can choose one from 5 types of winning combinations:
 * - Ambata: a single number.
 * - Ambo: two numbers.
 * - Terno: three numbers.
 * - Quaterna: four numbers.
 * - Cinquina: five numbers.
 * The function is used as a Private Method of the LottoGame Class.
 * @returns {Promise<String>} Returns a Promise, that once fulfilled returns a string.
 */
async function typeOfTicketQuestion() {
    const response = await prompts([
        {
            type: 'select',
            name: 'type',
            message: `On what type of winning combination would you like to place your bet`,
            choices: [
                { title: 'Ambata', value: `ambata`},
                { title: 'Ambo', value: 'ambo'},
                { title: 'Terno', value: `terno`},
                { title: 'Quaterna', value: `quaterna`},
                { title: 'Cinquina', value: `cinquina`}
            ],
            onRender(kleur) {
                // @ts-ignore
                this.msg = kleur.green('On what type of winning combination would you like to place your bet?');
            }
        }]);

    return response.type;
};

module.exports = typeOfTicketQuestion;
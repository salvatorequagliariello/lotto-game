// @ts-check
/**
 * @author Salvatore Quagliariello
 * @module q-numbers.js
 */

const prompts = require('prompts');

/**
 * An helper function, built on `Prompts`, that ask, through a personalized CLI Prompt,
 * on how many numbers the user the user would like to place his bet on. 
 * The function takes as arguments the Type of Ticket the user is generating, cause
 * certain combinations of numbers requires a minimum number of numbers.
 * Thanks to the passed argument, the function is capable, using the If...else
 * statement, to suggest the right minimum number of playable numbers to the final User.
 * The function is used as a Private Method of the LottoGame Class.
 * @param {String} typeOfTicket The type of Ticket the user would like to generate.
 * @returns {Promise<Number>} Returns a Promise, that once fulfilled returns a Number.
 */
async function numbersQuestion(typeOfTicket) {
    let response;

    if (typeOfTicket == `ambata`) {
        response = await prompts([
            {
                type: 'select',
                name: 'numbers',
                message: 'On how many numbers would you like to place your bet?',
                choices: [
                    { title: '1', value: 1},
                    { title: '2', value: 2},
                    { title: '3', value: 3},
                    { title: '4', value: 4},
                    { title: '5', value: 5},
                    { title: '6', value: 6},
                    { title: '7', value: 7},
                    { title: '8', value: 8},
                    { title: '9', value: 9},
                    { title: '10', value: 10}
                ],
                onRender(kleur) {
                    // @ts-ignore
                    this.msg = kleur.green('On how many numbers would you like to place your bet?');
                }
            }]);
        } else if (typeOfTicket == `ambo`) {
            response = await prompts([
                {
                    type: 'select',
                    name: 'numbers',
                    message: 'On how many numbers would you like to place your bet?',
                    choices: [
                        { title: '2', value: 2},
                        { title: '3', value: 3},
                        { title: '4', value: 4},
                        { title: '5', value: 5},
                        { title: '6', value: 6},
                        { title: '7', value: 7},
                        { title: '8', value: 8},
                        { title: '9', value: 9},
                        { title: '10', value: 10}
                    ],
                    onRender(kleur) {
                        // @ts-ignore
                        this.msg = kleur.green('On how many numbers would you like to place your bet?');
                    }
                }]);
        } else if (typeOfTicket == `terno`) {
            response = await prompts([
                {
                    type: 'select',
                    name: 'numbers',
                    message: 'On how many numbers would you like to place your bet?',
                    choices: [
                        { title: '3', value: 3},
                        { title: '4', value: 4},
                        { title: '5', value: 5},
                        { title: '6', value: 6},
                        { title: '7', value: 7},
                        { title: '8', value: 8},
                        { title: '9', value: 9},
                        { title: '10', value: 10}
                    ],
                    onRender(kleur) {
                        // @ts-ignore
                        this.msg = kleur.green('On how many numbers would you like to place your bet?');
                    }
                }]);
            } else if (typeOfTicket == `quaterna`) {
                response = await prompts([
                    {
                        type: 'select',
                        name: 'numbers',
                        message: 'On how many numbers would you like to place your bet?',
                        choices: [
                            { title: '4', value: 4},
                            { title: '5', value: 5},
                            { title: '6', value: 6},
                            { title: '7', value: 7},
                            { title: '8', value: 8},
                            { title: '9', value: 9},
                            { title: '10', value: 10}
                        ],
                        onRender(kleur) {
                            // @ts-ignore
                            this.msg = kleur.green('On how many numbers would you like to place your bet?');
                        }
                    }]);
            } else if (typeOfTicket == `cinquina`) {
                response = await prompts([
                    {
                        type: 'select',
                        name: 'numbers',
                        message: 'On how many numbers would you like to place your bet?',
                        choices: [
                            { title: '5', value: 5},
                            { title: '6', value: 6},
                            { title: '7', value: 7},
                            { title: '8', value: 8},
                            { title: '9', value: 9},
                            { title: '10', value: 10}
                        ],
                        onRender(kleur) {
                            // @ts-ignore
                            this.msg = kleur.green('On how many numbers would you like to place your bet?');
                        }
                    }]);
            }
                
        // @ts-ignore
        return response.numbers;
};

module.exports = numbersQuestion;
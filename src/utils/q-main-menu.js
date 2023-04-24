// @ts-check
/**
 * @author Salvatore Quagliariello
 * @module main-menu.js.js
 */

const prompts = require('prompts');

/**
 * An async Function, built on Prompts. Used as the main interface of the LottoGame Class, takes up to fourth arguments
 * to let the User play its own game. The Function Propose different choice, based on what has already been done.
 * It's possible to see the Tickets generated, partecipate to a draw, see the draw results, check the winning numbers
 * and see how much the User has won.
 * @async
 * @param {Number} numberOfTickets The number of tickets the User generated.
 * @param {Boolean} doneDraw A Boolean value, to check if a draw has already been done
 * @param {Boolean} doneCheckPrize A Boolean value, to check if the user has already compared its Tickets to the Draw.
 * @param {Boolean} hasWinningTickets A Boolean value, to check if the user have won.
 * @returns {Promise} Returns a Promise, that once fulfilled returns a String.
 */
async function mainMenu(numberOfTickets = 0, doneDraw = false, doneCheckPrize = false, hasWinningTickets = false) {
    const ticketWord = numberOfTickets == 1 ? `Ticket` : `Tickets`;

    if ((numberOfTickets >= 1) && (doneDraw === false) && (doneCheckPrize === false) && (hasWinningTickets === false)) {
        const response = await prompts([
            {
                type: 'select',
                name: 'choice',
                message: `You have ${numberOfTickets} ${ticketWord}.\nWhat would you like to do?`,
                choices: [
                    { title: 'Partecipate to a Draw.', value: `draw`},
                    { title: `See my ${ticketWord}.`, value: `printTickets`},
                    { title: 'Exit.', value: `exit`}
                ],
                onRender(kleur) {
                    // @ts-ignore
                    this.msg = kleur.green(`You have ${numberOfTickets} ${ticketWord}.\nWhat would you like to do?`);
                }
            }]);
        return response.choice;

    } else if ((numberOfTickets >= 1) && (doneDraw === true) && (doneCheckPrize === false) && (hasWinningTickets === false)) {
        const response = await prompts([
            {
                type: 'select',
                name: 'choice',
                message: `You have ${numberOfTickets} ${ticketWord} and you already partecipate to the draw.\nWhat would you like to do?`,
                choices: [
                    { title: `Check if my ${ticketWord} won.`, value: `checkWin`},
                    { title: `See the draw results.`, value: `printDraw`},
                    { title: `See my ${ticketWord}.`, value: `printTickets`},
                    { title: 'Exit.', value: `exit`}
                ],
                onRender(kleur) {
                    // @ts-ignore
                    this.msg = kleur.green(`You have ${numberOfTickets} ${ticketWord} and you already partecipate to the draw.\nWhat would you like to do?`);
                }
            }]);
        return response.choice;

    } else if ((numberOfTickets >= 1) && (doneDraw === true) && (doneCheckPrize === true) && (hasWinningTickets === true)) {
        const response = await prompts([
            {
                type: 'select',
                name: 'choice',
                message: `You have ${numberOfTickets} ${ticketWord}, you already partecipate to the Draw and you won!\nWhat would you like to do?`,
                choices: [
                    { title: `See how much i won.`, value: `printWin`},
                    { title: `See the draw results.`, value: `printDraw`},
                    { title: `See my ${ticketWord}.`, value: `printTickets`},
                    { title: 'Exit.', value: `exit`}
                ],
                onRender(kleur) {
                    // @ts-ignore
                    this.msg = kleur.green(`You have ${numberOfTickets} ${ticketWord}, you already partecipate to the Draw and you won!\nWhat would you like to do?`);
                }
            }]);
        return response.choice;

    } else if ((numberOfTickets >= 1) && (doneDraw === true) && (doneCheckPrize === true) && (hasWinningTickets === false)) {
        const response = await prompts([
            {
                type: 'select',
                name: 'choice',
                message: `You have ${numberOfTickets} ${ticketWord}, you already partecipate to the Draw but you have no winning ${ticketWord}!\nWhat would you like to do?`,
                choices: [
                    { title: `See the draw results.`, value: `printDraw`},
                    { title: `See my ${ticketWord}.`, value: `printTickets`},
                    { title: 'Exit.', value: `exit`},
                ],
                onRender(kleur) {
                    // @ts-ignore
                    this.msg = kleur.green(`You have ${numberOfTickets} ${ticketWord}, you already partecipate to the Draw but you have no winning ${ticketWord}!\nWhat would you like to do?`);
                }
            }]);
        return response.choice;
    };
};

module.exports = mainMenu;
// @ts-check
/**
 * @author Salvatore Quagliariello
 * @module print-lotto-draw.js
 */

/**
 * Async Function used to print a Draw Object. Returns a nice ASCII representation of a draw, containing made up of an upper part
 * (the Lotto logo and the day date) and a main part (the Ruote and their drawn numbers).
 * The function is almost totally built on the `.repeat` String method.
 * The output string is dynamically generated and follows the strind witdh.
 * @async
 * @param {object} drawObj Accept a Draw Object, composed by winning tickets and a draw.
 * @returns {Promise<string>} Returns a Promise, that once fullfilled, returns a string containing detail about the Draw and any possible winning Ticket.
 */
async function printLottoDraw(drawObj) {
    const drawnNumbers = drawObj.drawnNumbers;
    const winningTickets = drawObj.winningTickets.length > 0 ? drawObj.winningTickets : false;
    let winMessage = ``;
    let winningTicketsString = ``;

    if (winningTickets === false) {
        winMessage = `You have no winning Tickets.`
    } else if (winningTickets.length === 1) {
        winMessage = `Congratulations! You have 1 winning Ticket! \🎉️`;
        winningTickets.forEach(ticket => winningTicketsString += ticket.print());
    } else {
        winMessage = `Congratulations! You have ${winningTickets.length} winning Tickets! \🎉`;
        winningTickets.forEach(ticket => winningTicketsString += `${ticket.print()}\n`);;
    };

    const drawingWidth = 60;
    const block = `\█`;
    const upperEdge= `${block.repeat(drawingWidth)}\n${block}${` `.repeat(drawingWidth - 2)}${block}\n`;
    const lowerEdge = `${block}${` `.repeat(drawingWidth - 2)}${block}\n${block.repeat(drawingWidth)}`;
    const breakLine = `${block}${`\═`.repeat(drawingWidth - 2)}${block}\n${block}${` `.repeat(drawingWidth - 2)}${block}\n`;
    const flatBreakLine = `${block}${`\━`.repeat(drawingWidth - 2)}${block}\n${block}${` `.repeat(drawingWidth - 2)}${block}\n`;
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    const months = [`Gennaio`, `Febbraio`, `Marzo`, `Aprile`, `Maggio`, `Giugno`, `Luglio`, `Agosto`, `Settembre`, `Ottobre`, `Novembre`, `Dicembre`];
    const month = months[date.getMonth() + 1];
    const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    const dayOfWeek = days[date.getDay()];
    const dateString = `Estrazione - ${dayOfWeek} ${day} ${month} ${year}`
    const lottoLineString = `${block}${` `.repeat(2)}L O T T O${` `.repeat((drawingWidth - dateString.length) - 15)}${dateString}${` `.repeat(2)}${block}\n`;
    
    let drawnNumbersString = ``;
    for (let ruota in drawnNumbers) {
        const ruotaNameString = `${block}${` `.repeat(2)}${ruota.toUpperCase()}${` `.repeat(10 - ruota.length)}`; // 12  -- 70
        const numbersString = `${drawnNumbers[ruota].join(` - `)}${` `.repeat(24 - drawnNumbers[ruota].join(` - `).length)}${block}`;
        const spaceBetween = `${` `.repeat(drawingWidth - numbersString.length - ruotaNameString.length)}`;
        drawnNumbersString += ruotaNameString + spaceBetween + numbersString + `\n` + flatBreakLine;
    };

    const lottoDrawCompleteString = upperEdge + lottoLineString + breakLine + drawnNumbersString + lowerEdge;
    const outputString =  lottoDrawCompleteString + `\n\n` + winMessage + `\n\n` + winningTicketsString;
    return outputString;
};

module.exports = printLottoDraw;
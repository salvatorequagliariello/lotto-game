// @ts-check
/**
 * @author Salvatore Quagliariello
 * @module print-win.js
 */

/**
 * Print an ASCII representation  of a succesfully declared Prize Object. Describe the won amount and the details of the winning ticket/s.
 * If a non-winning Prize Object is passed, returns a different String.
 * @param {Object} prizeObj A Prize Object, containing a totalAmount property and a winningTickets Array property.
 * @returns {String} Returns a nice ASCII formatted String containing the results of the Draw-Ticket test.
 */
function printWin(prizeObj) {
    const ticketWidth = 50;
    const block = `\█`;
    const breakLine = `${block}${`\═`.repeat(ticketWidth - 2)}${block}\n${block}${` `.repeat(ticketWidth - 2)}${block}\n`;
    const breakBlank = `${block}${` `.repeat(ticketWidth - 2)}${block}\n`;
    const upperEdge = `${block.repeat(ticketWidth)}\n${block}${` `.repeat(ticketWidth - 2)}${block}\n`;
    const lottoLogo = `${block}${` `.repeat((ticketWidth - 12) / 2)}L O T T O${` `.repeat((ticketWidth - 10) / 2)}${block}\n`;
    const lowerEdge = `${block}${` `.repeat(ticketWidth - 2)}${block}\n${block.repeat(ticketWidth)}`;

    const lostLineString = `${block}${` `.repeat(2)}Non hai vinto. :(${` `.repeat(ticketWidth - 21)}${block}\n`
    const outputLostString = upperEdge + lottoLogo + breakLine + lostLineString + breakBlank + lowerEdge;
    
    let ticketDetailsStrings = ``;
    for (const ticket of prizeObj.winningTickets) {
        const amountString = `${block}${` `.repeat(2)}VINTI CON IL BIGLIETTO N.${ticket.id}${` `.repeat(ticketWidth - (ticket.wonAmount.toString().length + 32 + ticket.id.toString().length))}€${ticket.wonAmount.toString()}${` `.repeat(2)}${block}\n`;
        const cityString = `${block}${` `.repeat(2)}SULLA RUOTA DI${` `.repeat(ticketWidth - (ticket.winningDetails.city.length + 20))}${ticket.winningDetails.city.toUpperCase()}${` `.repeat(2)}${block}\n`;
        const numbersString = `${block}${` `.repeat(2)}CON IL/I NUMERO/I${` `.repeat(ticketWidth - (ticket.winningDetails.numbers.join(` - `).length + 23))}${ticket.winningDetails.numbers.join(` - `)}${` `.repeat(2)}${block}\n`
        ticketDetailsStrings += amountString + cityString + numbersString + breakBlank ;
    }
    const amountWonString = `${block}${` `.repeat(2)}Hai vinto in totale${` `.repeat(ticketWidth - (prizeObj.totalAmountWon.toString().length + 26))}€${prizeObj.totalAmountWon.toString()}${` `.repeat     (2)}${block}\n`;
    const outputWinString = upperEdge + lottoLogo + breakLine + amountWonString + breakBlank + ticketDetailsStrings + lowerEdge;

    const outputString = ((prizeObj.totalAmountWon > 0) && (prizeObj.winningTickets.length >= 1)) ? outputWinString : outputLostString;
    return outputString;
}

module.exports = printWin;
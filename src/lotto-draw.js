// @ts-check
/**
 * @author Salvatore Quagliariello
 * @module lotto-draw.js
 */

/**
 * The Draw System of the project. Generates a Draw Object and compare it with the numbers and cities in the 
 * Ticket Objects passed. Uses a loop to compare every number of the ticket with every number of the draw in the shared cities.
 * If the number of played winning numbers equals the number required  by the winning combination on the ticket, the ticket itself
 * is pushed to the `winningTickets` array.
 * @async
 * @param {Array<Object>} tickets Accepts an Array of Ticket Objects.
 * @param {Object} [givenDrawnNumbers] Accept a given Draw Object, mainly used to test the function.
 * @returns {Promise<Object>} Returns a Promise, that once fulfilled, returns an Object containing the draw itself and the winning tickets.
 */
async function lottoDraw(tickets, givenDrawnNumbers) {
    if (typeof tickets !== `object` || tickets.length == 0) {
        throw new TypeError(`Please, enter valid tickets!`);
    };

    const cities = [`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`];
    const drawnNumbers = typeof givenDrawnNumbers === `object` ? givenDrawnNumbers : {};
    const winningTickets = [];

    if (Object.keys(drawnNumbers).length !== 10) {
        cities.forEach(ruota => drawnNumbers[ruota] = Array.from({length: 5}, () => Math.floor(Math.random() * (90 - 1 + 1)) + 1));
    };

    for (let ticket of tickets) {
        const winningTicketDetails = {};
        const winningCombination = ticket.type[`winningNumbers`];
        const betDetails = {};
        ticket.cities.forEach(city => betDetails[city] = ticket.numbers);
        
        const common = Object.keys(drawnNumbers).filter(cities =>  Object.keys(betDetails).indexOf(cities) !== -1);
        
        for (let city of common) {
            const numbers = drawnNumbers[city].filter(number => betDetails[city].indexOf(number) !== -1);
            if (numbers.length === winningCombination) {
                winningTicketDetails.winningNumbers = numbers;
                winningTicketDetails.ticket = ticket; 
            }
        };
        
        if (Object.keys(winningTicketDetails).length > 0) winningTickets.push(ticket);
    }
    
    return {winningTickets, drawnNumbers};
};

module.exports = lottoDraw;

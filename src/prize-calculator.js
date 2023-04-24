// @ts-check
/**
 * @author Salvatore Quagliariello
 * @module prize-calculator.js
 */

/**
 * A Function used as a method of the LottoGame Class, it can also be used as a stand alone Function.
 * Accept as Arguments a Draw Object and an Array of Tickets. Compare each city (Ruota) the Draw Object and every passed Ticket Object have in common,
 * then search for shared numbers. If the number of shared numbers is the same as the Ticket Type, then the Function proceeds to calculate the amount won,
 * based on the Ticket features. Otherwise, set the `.wonAmount` Ticket property to 0.
 * @param {Object} drawObject Accept A Draw object, containing a set of numbers for each of its property.
 * @param {Array<Object>} tickets An Array of Ticket Objects, can also contain only one Ticket Obj.
 * @returns {Object} Returns an Object containing the total amount won, and details about the winning tickets.
 */
function prizeCalculator(drawObject, tickets) {
    if ((typeof drawObject !== `object`) || (Array.isArray(drawObject)) || (drawObject == null) || (Object.prototype.toString.call(drawObject) !== '[object Object]')) {
        throw new TypeError(`Please, enter a valid Draw Object!`);
    };

    if ((!Array.isArray(tickets)) || (typeof tickets[0] !== `object`) || (tickets == null) || (tickets.length == 0)) {
        throw new TypeError(`Please, enter a valid list of Ticket Objects!`);
    };

    const winningTickets = [];
    for (const ticket of tickets) {
        const winningTicketDetails = {};
        const winningCombination = ticket.type[`winningNumbers`];
        const betDetails = {};
        ticket.cities.forEach(city => betDetails[city] = ticket.numbers);
        const common = Object.keys(drawObject).filter(cities =>  Object.keys(betDetails).indexOf(cities) !== -1);
        
        for (const city of common) {
            const numbers = drawObject[city].filter(number => betDetails[city].indexOf(number) !== -1);
            if (numbers.length >= winningCombination) {
                winningTicketDetails.winningNumbers = numbers;
                winningTicketDetails.city = city;
                winningTicketDetails.ticket = ticket; 
            } 
        };
        
        if (Object.keys(winningTicketDetails).length === 3) {
            ticket.winningDetails = {city: winningTicketDetails.city, numbers: winningTicketDetails.winningNumbers.slice(0, winningCombination)};
            winningTickets.push(ticket);
            continue;
        } else {
            ticket.wonAmount = 0;
        };
    };

    let totalWin = 0;
    if (winningTickets.length >= 1) {
        const maxWinList = [11.23, 250, 4500, 120000, 6000000];
        
        for (const ticket of winningTickets) {
            const bet = ticket[`bet`];
            const winningCombination = ticket.type[`winningNumbers`];
            const playedNumbers = ticket[`numbers`].length;
            const nOfPlayedCities = ticket[`cities`].length;
            const maxWinInPlayedCombination = maxWinList[winningCombination - 1];
            let winAmount;
                
            if (winningCombination === playedNumbers) {
                winAmount = (bet * maxWinInPlayedCombination) / nOfPlayedCities;
            } else {
                const factorial = n => (n != 1) ? (n * factorial(n - 1)) : 1;
                const allPossibleCombinations = factorial(playedNumbers) / (factorial(winningCombination) * factorial(playedNumbers - winningCombination));
                winAmount = (bet * (maxWinInPlayedCombination / allPossibleCombinations)) / nOfPlayedCities;
            };
            
            ticket.wonAmount = +(winAmount.toFixed(2));
            totalWin += +(winAmount.toFixed(2));
        };
    };
    
    return {totalAmountWon: +totalWin.toFixed(2), winningTickets};
}

module.exports = prizeCalculator;
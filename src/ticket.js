// @ts-check
/**
 * @author Salvatore Quagliariello
 * @module ticket.js
 */

/**
 * @class The core of the project, the Class we'll use to generate Lotto Tickets Objects.
 */
class Ticket {
    /**
     * @constructor
     * Every argument passed through the Constructor will be checked by its own validate function. It's strictly required to pass valid arguments,
     * for a succesfull declaration of a Ticket Object. 
     * @param {string} type The type of bet we are placing. There are several types of betting:
     * - Ambata: one winning number from the ones on our ticket.
     * - Ambo: two winning numbers from the ones on our ticket.
     * - Terno: three winning numbers from the ones on our ticket.
     * - Quaterna: four winning numbers from the ones on our ticket.
     * - Cinquina: five winning numbers from the ones on our ticket.
     * @param {number} nOfNumbers How many numbers we we'll have on our ticket. In the real Lotto, they are chosen by the buyer of the Ticket, in this
     * software, they are randomly generated from 1 to 90.
     * @param {string} cities The italian Lotto has a `Ruota` based Drawing system. It is composed by up to 10 Italian Cities. The user can choose can choose as many 
     * as he wants, to put his bet on. It's possibile to choose `Tutte` to place the bet on every one of them.
     */
    constructor(type, nOfNumbers, cities){
        /** @constant {String} */
        this.type = this.#typeValidation(type);
        /** @constant {Array<Number>} */
        this.numbers = this.#numbersValidation(nOfNumbers);
        /** @constant {Array<String>}*/
        this.cities = this.#cityValidation(cities);
    }
    
    /**
     * A private function, used to validate the `type` argument passed into the Contructor. Checks the correct assigning of the type of Ticket, cleaning
     * from punctuation and spaces the passed string. It compare the given string to an Array, containig Objects composed by different types of Tickets and 
     * their minimum number required to be played, then returns it. 
     * @param {string} type The Type of Ticket the user would like to play (`ambo`, `ambata`, `terna`, `quaterna`, `cinquina`);
     * @returns {Object} 
     */
    #typeValidation(type) {
        const typesOfTickets = 
        [{bill: `ambata`, winningNumbers: 1}, {bill: `ambo`, winningNumbers: 2}, {bill: `terno`, winningNumbers: 3}, {bill: `quaterna`, winningNumbers: 4}, {bill: `cinquina`, winningNumbers: 5}];
        // @ts-ignore
        const cleanedUserType = type.replaceAll(/[^a-zA-Z]+/g, '').toLowerCase();
        const checkTypeIndex = typesOfTickets.findIndex(type => type.bill == cleanedUserType);

        if(checkTypeIndex !== -1) {
            return typesOfTickets[checkTypeIndex];
        } else {
            throw new TypeError(`Please, enter a valid type of ticket!`);;
        };
    }

    /**
     * A private function, used to validate the `nOfNumbers` argument passed into the Contructor. Checks if the passed value is valid, lower than `10`,
     * greater than `0`, greater than the required numbers by the Type of Ticket, and if it is actually a positive integer. Then it returns an Array of Numbers,
     * that will be the played numbers for that ticket.
     * @param {Number} nOfNumbers On how many numbers we would like to place the bet.
     * @returns {Array<Number>}
     */
    #numbersValidation(nOfNumbers) {
        if((nOfNumbers > 10) || (nOfNumbers <= 0) || (isNaN(nOfNumbers)) || (!Number.isInteger(nOfNumbers)) || (nOfNumbers < this.type.winningNumbers)) {
            throw new TypeError(`Please, enter a valid number`);
        };

        const numbers = Array.from({length: nOfNumbers}, () => Math.floor(Math.random() * (90 - 1 + 1)) + 1);
        return numbers;
    }

    /**
     * A private function, used to validate the `cities` argument passed into the Contructor. Checks if the passed string is valid.
     * The function `clean` the string, deleting punctuation, and special characters, then it split it in an Array, using white spaces, and returns it.
     * `Tutte`, select all the `Ruote` available.
     * @param {string} cities On which `Ruota` we would like to place the bet. `Tutte` will select every one of them.
     * @returns {Array<string>}
     */
    #cityValidation(cities) {
        const citiesList = [`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`];
        const userTypedCities = [...new Set(cities.replace(/[^a-zA-Z\s]/gmi, "")
                                        .toLowerCase()
                                        .split(" "))];
        const validCities = userTypedCities.filter(city => citiesList.includes(city));

        if(userTypedCities.includes(`tutte`)) {
            return citiesList;
        } else if ((validCities.length >= 1) && (!userTypedCities.includes(`tutte`))) {
            return validCities;
        }  else {
            throw new TypeError(`Please, enter a valid city!`);
        };
    }

    /**
     * Print a nice ASCII representation of the Ticket. The output is dynamically generated String, containing information on the 
     * created Ticket. The function is based on the `.repeat` String method, to create every single line of the output.
     * @returns {string}
     */
    print() {
        const ticketWidth = 56;
        const block = `\█`;
        const breakLine = `${block}${`\═`.repeat(ticketWidth - 2)}${block}\n${block}${` `.repeat(ticketWidth - 2)}${block}\n`;
        const breakBlank = `${block}${` `.repeat(ticketWidth - 2)}${block}\n`;
        const upperEdge = `${block.repeat(ticketWidth)}\n${block}${` `.repeat(ticketWidth - 2)}${block}\n`;
        const lottoLogo = `${block}${` `.repeat((ticketWidth - 12) / 2)}L O T T O${` `.repeat((ticketWidth - 10) / 2)}${block}\n`;
        const lowerEdge = `${block}${` `.repeat(ticketWidth - 2)}${block}\n${block.repeat(ticketWidth)}`;

        const userNumbersString = `${this.numbers.join(` - `)}`;
        const playedNumbersSection = `${block}${` `.repeat(2)}NUMERI GIOCATI${` `.repeat(ticketWidth - 18)}${block}\n`;
        const numbersOnTicket = `${block}${` `.repeat(2)}${userNumbersString}${` `.repeat((ticketWidth - userNumbersString.length) - 6)}${` `.repeat(2)}${block}\n`;

        const userCitiesFirstString = `${this.cities.slice(0, 5).join(` - `).toUpperCase()}`;
        const userCitiesSecondString = `${this.cities.slice(5, 10).join(` - `).toUpperCase()}`;
        const citiesSection = `${block}${` `.repeat(2)}RUOTE GIOCATE${` `.repeat(ticketWidth - 17)}${block}\n`;
        let citiesOnTicket = `${block}${` `.repeat(2)}${userCitiesFirstString}${` `.repeat((ticketWidth - userCitiesFirstString.length) - 6)}${` `.repeat(2)}${block}\n`;
        if (this.cities.length > 5) {
            citiesOnTicket = `${block}${` `.repeat(2)}${userCitiesFirstString}${` `.repeat((ticketWidth - userCitiesFirstString.length) - 6)}${` `.repeat(2)}${block}\n${block}${` `.repeat(2)}${userCitiesSecondString}${` `.repeat((ticketWidth - userCitiesSecondString.length) - 6)}${` `.repeat(2)}${block}\n`;
        };

        const userTypeBillString = `${this.type.bill.toUpperCase()}`;
        const typeOfBillSection = `${block}${` `.repeat(2)}SORTE${` `.repeat((ticketWidth - userTypeBillString.length) - 11)}${userTypeBillString}${` `.repeat(2)}${block}\n`;

        const upperSection = upperEdge + lottoLogo + breakLine;
        const infoSection = playedNumbersSection + numbersOnTicket + breakBlank + citiesSection + citiesOnTicket + breakBlank;
        const lowerSection = breakLine + typeOfBillSection + lowerEdge;
        const ticket = upperSection + infoSection + lowerSection;

        return ticket;
    }
};

module.exports = Ticket;
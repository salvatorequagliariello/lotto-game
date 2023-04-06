/**
 * @author Salvatore Quagliariello
 * @file main.js
 * Open the console and open the file, the software will automatically start.
 */

const Ticket = require(`./src/ticket`);
const LottoGame = require(`./src/lotto-game`);

const lotto = new LottoGame();
lotto.start();
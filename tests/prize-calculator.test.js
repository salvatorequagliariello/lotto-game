const checkWin = require('../src/prize-calculator');
const printCheck = require(`../src/utils/print-win`);
const Ticket = require('../src/ticket');
const LottoDraw = require('../src/lotto-draw');

describe(`PrizeCalculator - UnitTests`, () => {
    test(`test_prize_function_results`, () => {
        const ticket = new Ticket(`ambata`, 2, `tutte`, 1);
        const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
        const check = checkWin(draw, [ticket]);
        expect(check).toHaveProperty(`totalAmountWon`);
        expect(check).toHaveProperty(`winningTickets`);
    })

    test(`test_prize_function_results_multiple_tickets`, () => {
        const ticket = new Ticket(`ambata`, 2, `tutte`, 1);
        const ticketTwo = new Ticket(`terno`, 5, `firenze, roma`, 2);
        const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
        const check = checkWin(draw, [ticket, ticketTwo]);
        expect(check).toHaveProperty(`totalAmountWon`);
        expect(check).toHaveProperty(`winningTickets`);
    })

    test(`test_prize_function_two_winning_tickets`, () => {
        const ticket = new Ticket(`ambata`, 10, `tutte`, 1);
        const ticketTwo = new Ticket(`ambata`, 10, `tutte`, 1);
        const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 90, 90, 1);
        const check = checkWin(draw, [ticket, ticketTwo]);
        expect(check.totalAmountWon).toBeGreaterThan(0);
        expect(check.winningTickets).toHaveLength(2);
    })

    test(`test_prize_function_print_noWinning_`, () => {
        const ticket = new Ticket(`cinquina`, 5, `roma`, 1);
        const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `torino`, `venezia`], 5, 90, 1);
        const checkResults = checkWin(draw, [ticket]);
        const checkWinString = printCheck(checkResults);
        const expectedString = `██████████████████████████████████████████████████
█                                                █
█                   L O T T O                    █
█════════════════════════════════════════════════█
█                                                █
█  Non hai vinto. :(                             █
█                                                █
█                                                █
██████████████████████████████████████████████████`;
    expect(checkWinString).toBe(expectedString);
    })

    test(`test_prize_function_print_winning_`, () => {
        const ticket = new Ticket(`ambata`, 2, `roma`, 1);
        const draw = new LottoDraw([`roma`], 10, 11, 11);
        ticket.id = 1339;
        ticket.numbers = [11];
        const checkResults = checkWin(draw, [ticket]);
        const checkWinString = printCheck(checkResults);
        const expectedString = `██████████████████████████████████████████████████
█                                                █
█                   L O T T O                    █
█════════════════════════════════════════════════█
█                                                █
█  Hai vinto in totale                   €11.23  █
█                                                █
█  VINTI CON IL BIGLIETTO N.1339         €11.23  █
█  SULLA RUOTA DI                          ROMA  █
█  CON IL/I NUMERO/I                         11  █
█                                                █
█                                                █
██████████████████████████████████████████████████`
    expect(checkWinString).toBe(expectedString);
    })
});
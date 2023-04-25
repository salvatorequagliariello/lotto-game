const LottoDraw = require('../src/lotto-draw');
const LottoGame = require(`../src/lotto-game`);
const Ticket = require('../src/ticket');

describe(`LottoGame - UnitTests`, () => {
    test(`test_lottoGame_declaration_with_ticket`, async () => {
        const ticket = new Ticket(`ambata`, 2, `tutte`, 1);
        const lotto = new LottoGame([ticket]);
        expect(lotto.tickets.length).toBe(1);
        expect(lotto.tickets[0]).toEqual(ticket);
    })

    test(`test_lottoGame_declaration_with_multiple_tickets`, () => {
        const ticket = new Ticket(`ambata`, 2, `tutte`, 1);
        const ticketTwo = new Ticket(`ambo`, 6, `roma, firenze`, 2);
        const lotto = new LottoGame([ticket, ticketTwo]);
        expect(lotto.tickets.length).toBe(2);
        expect(lotto.tickets[0]).toEqual(ticket);
        expect(lotto.tickets[1]).toEqual(ticketTwo);
    })

    test(`test_lottoGame_declaration_with_ticket_and_Draw`, () => {
        const ticket = new Ticket(`ambata`, 2, `tutte`, 1);
        const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
        const lotto = new LottoGame([ticket], draw);
        expect(lotto.tickets.length).toBe(1);
        expect(lotto.tickets[0]).toEqual(ticket);
        expect(lotto.drawResults).toEqual(draw);
    })

    test(`test_lottoGame_returnTypeOf_printTickets`, () => {
        const ticket = new Ticket(`ambata`, 2, `tutte`, 1);
        ticket.numbers = [70, 40];
        ticket.id = 9944;
        const lotto = new LottoGame([ticket]);
        expect(typeof lotto.printTickets()).toBe(`string`);
        const expectedString = `████████████████████████████████████████████████████████
█                                                      █
█  L O T T O                        BIGLIETTO N. 9944  █
█══════════════════════════════════════════════════════█
█                                                      █
█  NUMERI GIOCATI                                      █
█  70 - 40                                             █
█                                                      █
█  RUOTE GIOCATE                                       █
█  BARI - CAGLIARI - FIRENZE - GENOVA - MILANO         █
█  NAPOLI - PALERMO - ROMA - TORINO - VENEZIA          █
█                                                      █
█  IMPORTO GIOCATA                                 €1  █
█                                                      █
█══════════════════════════════════════════════════════█
█                                                      █
█  SORTE                                       AMBATA  █
█                                                      █
████████████████████████████████████████████████████████
`;
        expect(lotto.printTickets()).toBe(expectedString);
    })

    test(`test_lottoGame_print_draw`, () => {
        const ticket = new Ticket(`ambata`, 2, `tutte`, 1);
        const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 1, 1);
        const lotto = new LottoGame([ticket], draw);
        expect(lotto.drawResults).toEqual(draw);
        const expectedString = `███████████████████████████████████████████████████
█                                                 █
█  L O T T O                          Estrazione  █
█═════════════════════════════════════════════════█
█                                                 █
█  BARI                        1 - 1 - 1 - 1 - 1  █
█━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━█
█                                                 █
█  CAGLIARI                    1 - 1 - 1 - 1 - 1  █
█━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━█
█                                                 █
█  FIRENZE                     1 - 1 - 1 - 1 - 1  █
█━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━█
█                                                 █
█  GENOVA                      1 - 1 - 1 - 1 - 1  █
█━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━█
█                                                 █
█  MILANO                      1 - 1 - 1 - 1 - 1  █
█━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━█
█                                                 █
█  NAPOLI                      1 - 1 - 1 - 1 - 1  █
█━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━█
█                                                 █
█  PALERMO                     1 - 1 - 1 - 1 - 1  █
█━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━█
█                                                 █
█  ROMA                        1 - 1 - 1 - 1 - 1  █
█━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━█
█                                                 █
█  TORINO                      1 - 1 - 1 - 1 - 1  █
█━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━█
█                                                 █
█  VENEZIA                     1 - 1 - 1 - 1 - 1  █
█━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━█
█                                                 █
█                                                 █
███████████████████████████████████████████████████
`;
        expect(typeof lotto.printDraw()).toBe(`string`);
    })  

    test(`test_lottoGame_prizeCalculator_results`, () => {
        const ticket = new Ticket(`ambata`, 2, `tutte`, 1);
        const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
        const lotto = new LottoGame([ticket], draw);
        const prizeResults = lotto.checkWin();
        expect(lotto.prizeObj).toEqual(prizeResults);
        expect(lotto.prizeObj).toHaveProperty(`totalAmountWon`);
        expect(lotto.prizeObj).toHaveProperty(`winningTickets`);
    })

    test(`test_lottoGame_print_checkWin_results`, () => {
        const ticket = new Ticket(`cinquina`, 5, `roma`, 1);
        const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
        const lotto = new LottoGame([ticket], draw);
        lotto.checkWin();
        const checkWinResults = lotto.printCheckWinResults();
        const expectedString = `██████████████████████████████████████████████████
█                                                █
█                   L O T T O                    █
█════════════════════════════════════════════════█
█                                                █
█  Non hai vinto. :(                             █
█                                                █
█                                                █
██████████████████████████████████████████████████`;
        expect(typeof checkWinResults).toEqual(`string`);
        expect(checkWinResults).toEqual(expectedString);
    }) 
});
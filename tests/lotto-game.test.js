const prompts = require('prompts');
const nOfTickets = require(`../src/utils/q-number-of-tickets`);
const ticketNumbers = require(`../src/utils/q-numbers`);
const typeOfTicket = require(`../src/utils/q-type-of-ticket`);
const citiesTicket = require(`../src/utils/q-cities`);
const LottoGame = require(`../src/lotto-game`);
const Ticket = require(`../src/ticket`);


describe(`LottoGame - UnitTests`, () => {
    test(`test_type_of_ticket_question`, async () => {
        prompts.inject(`Ambo`);
        const typeOfTicketData = await typeOfTicket();
        const expected = `Ambo`;
        expect(typeOfTicketData).toBe(expected);
    })

    test(`test_number_of_tickets_question`, async () => {
        prompts.inject(2);
        const nOfTicketsData = await nOfTickets();
        const expected = 2;
        expect(nOfTicketsData).toBe(expected);
    })
    
    test(`test_ticket_numbers_question`, async () => {
        prompts.inject(`4`)
        const numbers = await ticketNumbers(`terno`);
        const expected = `4`;
        expect(numbers).toBe(expected);
    })

    test(`test_ruota_selection`, async () => {
        prompts.inject([false, [`firenze, venezia, napoli`]]);
        const citiesSelectedData = await citiesTicket();
        const expected = `firenze, venezia, napoli`;
        expect(citiesSelectedData).toBe(expected);
    })

    test(`test_tutte_ruote`, async () => {
        prompts.inject(true);
        const citiesSelectedData = await citiesTicket();
        const expected = `Tutte`;
        expect(citiesSelectedData).toBe(expected);
    })

    test(`test_guided_ticket_creation`, async () => {
        const lottoGame = new LottoGame();
        prompts.inject([false, 1, `ambo`, 3, false, [`roma, firenze`]]);
        const tickets = await lottoGame.start();
        const firstTicket = tickets[0];
        expect(typeof firstTicket).toBe(`object`);
        expect(firstTicket.cities).toContain(`roma`, `firenze`);
        expect(firstTicket.numbers).toHaveLength(3);
        expect(typeof firstTicket.type).toBe(`object`);
        expect(firstTicket.type[`bill`]).toBe(`ambo`);
        expect(firstTicket.type[`winningNumbers`]).toBe(2);
    })

    test(`test_game_declaration_with_ticket_obj`, async () => {
        const ticket = new Ticket(`quaterna`, 7, `tutte`);
        const lottoGame = new LottoGame(ticket);
        prompts.inject(true, false);
        const gameIstance = await lottoGame.start()
        const firstTicket = gameIstance[0];
        expect(typeof firstTicket).toBe(`object`);
        expect(firstTicket.cities).toContain(`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`);
        expect(firstTicket.numbers).toHaveLength(7);
        expect(typeof firstTicket.type).toBe(`object`);
        expect(firstTicket.type[`bill`]).toBe(`quaterna`);
        expect(firstTicket.type[`winningNumbers`]).toBe(4);
    })
});
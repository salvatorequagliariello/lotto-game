const prompts = require('prompts');
const nOfTickets = require(`../src/utils/q-number-of-tickets`);
const ticketNumbers = require(`../src/utils/q-numbers`);
const typeOfTicket = require(`../src/utils/q-type-of-ticket`);
const citiesTicket = require(`../src/utils/q-cities`);
const betAmount = require(`../src/utils/q-bet-amount.js`);
const mainMenu = require(`../src/utils/q-main-menu`);

describe(`Helper Functions - UnitTests`, () => {
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

    test(`test_bet_amount_question`, async () => {
        prompts.inject(`2`);
        const betAmountResults = await betAmount();
        const expected = `2`;
        expect(betAmountResults).toBe(expected);
    })

    test(`test_main_menu_only_tickets`, async () => {
        prompts.inject(`draw`);
        const menuResponse = await mainMenu(2, false, false, false);
        const expected = `draw`;
        expect(menuResponse).toBe(expected);
    })

    test(`test_main_menu_tickets_and_draw`, async () => {
        prompts.inject(`printDraw`);
        const menuResponse = await mainMenu(2, true, false, false);
        const expected = `printDraw`;
        expect(menuResponse).toBe(expected);
    })

    test(`test_main_menu_tickets_and_draw`, async () => {
        prompts.inject(`checkWin`);
        const menuResponse = await mainMenu(2, true, false, false);
        const expected = `checkWin`;
        expect(menuResponse).toBe(expected);
    })

    test(`test_main_menu_tickets_and_draw_and_check_win`, async () => {
        prompts.inject(`printWin`);
        const menuResponse = await mainMenu(2, true, true, false);
        const expected = `printWin`;
        expect(menuResponse).toBe(expected);
    })

    test(`test_main_menu_exit`, async () => {
        prompts.inject(`exit`);
        const menuResponse = await mainMenu(2, false, false, false);
        const expected = `exit`;
        expect(menuResponse).toBe(expected);
    })

    test(`test_main_menu_only_tickets_print`, async () => {
        prompts.inject(`printTickets`);
        const menuResponse = await mainMenu(2, false, false, false);
        const expected = `printTickets`;
        expect(menuResponse).toBe(expected);
    })
});
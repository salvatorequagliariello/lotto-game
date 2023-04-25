const Ticket = require(`../src/ticket`);

describe(`Ticket - UnitTests`, () => {
    test(`test_obj_declaration`, () => {
        const ticket = new Ticket(`ambo`, 3, `roma, firenze`, 2);
        const expected = `object`;
        const actual = typeof ticket;
        expect(actual).toBe(expected);
    })

    test(`test_obj_properties`, () => {
        const ticket = new Ticket(`ambo`, 3, `roma, firenze`, 1);
        const expectedType = `ambo`;
        const expectedCities = [`roma`, `firenze`];
        const expectedNumbersLength = 3;
        const actualType = ticket.type.bill;
        const actualCities = ticket.cities;
        const actualNumbers = ticket.numbers.length;
        expect(actualType).toBe(expectedType);
        expect(actualCities).toStrictEqual(expectedCities);
        expect(actualNumbers).toBe(expectedNumbersLength);
    })

    test(`test_ruota_tutte`, () => {
        const ticket = new Ticket(`ambo`, 3, `tutte`, 2);
        const expectedCities = [`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`];
        const actualCities = ticket.cities;
        expect(actualCities).toStrictEqual(expectedCities);
    })

    test(`test_bet_amount`, () => {
        const ticket = new Ticket(`ambo`, 3, `tutte`, 2);
        const expectedAmount = 2;
        const actualAmount =  ticket.bet;
        expect(actualAmount).toStrictEqual(expectedAmount);
    })

    test(`test_wrong_type_declaration`, () => {
        expect(() => {new Ticket(``, 10, `tutte`)}).toThrow(TypeError);
    })

    test(`test_wrong_numbers_declaration`, () => {
        expect(() => {new Ticket(`ambo`, 11, `tutte`)}).toThrow(TypeError);
    })

    test(`test_wrong_ruote_declaration`, () => {
        expect(() => {new Ticket(`ambo`, 10, `messina`)}).toThrow(TypeError);
    })

    test(`test_empty_obj_declaration`, () => {
        expect(() => {new Ticket()}).toThrow(TypeError);
    })

    test(`test_numbers_less_than_type_required`, () => {
        expect(() => {new Ticket(`ambo`, 1, `napoli, venezia`, 2)}).toThrow(TypeError);
    })

    test(`test_no_bet_declared`, () => {
        expect(() => {new Ticket(`ambo`, 4, `napoli, venezia`)}).toThrow(TypeError);
    })

    test(`test_print_method`, () => {
        const ticket = new Ticket(`cinquina`, 7, `tutte`, 2);
        ticket.numbers = [83, 32, 48, 77, 37, 60, 60];
        ticket.id = 8165;
        const actual = ticket.print();
        const expected = `████████████████████████████████████████████████████████
█                                                      █
█  L O T T O                        BIGLIETTO N. 8165  █
█══════════════════════════════════════════════════════█
█                                                      █
█  NUMERI GIOCATI                                      █
█  83 - 32 - 48 - 77 - 37 - 60 - 60                    █
█                                                      █
█  RUOTE GIOCATE                                       █
█  BARI - CAGLIARI - FIRENZE - GENOVA - MILANO         █
█  NAPOLI - PALERMO - ROMA - TORINO - VENEZIA          █
█                                                      █
█  IMPORTO GIOCATA                                 €2  █
█                                                      █
█══════════════════════════════════════════════════════█
█                                                      █
█  SORTE                                     CINQUINA  █
█                                                      █
████████████████████████████████████████████████████████`;
        expect(actual).toBe(expected);
    })
});
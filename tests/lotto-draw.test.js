const LottoDraw = require('../src/lotto-draw');

describe(`LottoDraw - UnitTests`, () => {
    test(`test_lottoDraw_obj_declaration`, () => {
        const draw = new LottoDraw([`bari`, `cagliari`, `firenze`, `genova`, `milano`, `napoli`, `palermo`, `roma`, `torino`, `venezia`], 5, 90, 1);
        expect(draw).toHaveProperty(`bari`);
        expect(Object.keys(draw).length).toBe(10);
        expect(Object.values(draw[`bari`])).toHaveLength(5);
    })

    test(`test_lottoDraw_obj_declaration_2`, () => {
        const draw = new LottoDraw([`napoli`, `palermo`, `roma`, `torino`, `venezia`], 10, 90, 1);
        expect(draw).toHaveProperty(`napoli`);
        expect(Object.keys(draw).length).toBe(5);
        expect(Object.values(draw[`napoli`])).toHaveLength(10);
    })

    test(`test_lottoDraw_obj_declaration_3`, () => {
        const draw = new LottoDraw([`venezia`], 1, 90, 1);
        expect(draw).toHaveProperty(`venezia`);
        expect(Object.keys(draw).length).toBe(1);
        expect(Object.values(draw[`venezia`])).toHaveLength(1);
    })

    test(`test_lottoDraw_no_cities_declared`, () => {
        expect(() => {new LottoDraw(5, 90, 1);}).toThrow(TypeError);
    })

    test(`test_lottoDraw_no_numbers_to_draw_declared`, () => {
        expect(() => {new LottoDraw([`venezia`], 0, 90, 1);}).toThrow(TypeError);
    })

    test(`test_lottoDraw_no_max_draw_number_declared`, () => {
        expect(() => {new LottoDraw([`venezia`], 5, 0, 1);}).toThrow(TypeError);
    })

    test(`test_lottoDraw_no_min_draw_number_declared`, () => {
        expect(() => {new LottoDraw([`venezia`], 5, 90);}).toThrow(TypeError);
    })

    test(`test_lottoDraw_print`, () => {
        const draw = new LottoDraw([`bari`, `cagliari`, `firenze`], 5, 90, 90);
        const actualString = draw.print();
        const expectedString = `████████████████████████████████████████████████████████
█                                                      █
█  L O T T O                               Estrazione  █
█══════════════════════════════════════════════════════█
█                                                      █
█  BARI                        90 - 90 - 90 - 90 - 90  █
█━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━█
█                                                      █
█  CAGLIARI                    90 - 90 - 90 - 90 - 90  █
█━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━█
█                                                      █
█  FIRENZE                     90 - 90 - 90 - 90 - 90  █
█━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━█
█                                                      █
█                                                      █
████████████████████████████████████████████████████████`;
        expect(actualString).toBe(expectedString);
    })
});

// @ts-check
/**
 * @author Salvatore Quagliariello
 * @module q-cities.js
 */

const prompts = require('prompts');

/**
 * An helper function, built on `Prompts`, that ask, through a personalized CLI Prompt, how which Ruota
 * the user would like to place his bet on. The first question the Function present ask if the 
 * user would like to choose `Tutte` as his `Ruota`, meaning that the bet will be placed on every single
 * `Ruota`. If the user confirm, then the Function will return `Tutte` as a String.
 * The user can also choose on which `Ruota` he would like to place the bet on, simply answering `no`, to the
 * previous question. The user can choose as many `Ruote` as he'd like to.
 * The function is used as a Private Method of the LottoGame Class.
 * @returns {Promise<Array<String>|String>} Returns a Promise, that once fulfilled returns an Array of Strings or a single String.
 */
async function citiesQuestion() {
    const tutte = await prompts([
        {
            type: 'select',
            name: 'cities',
            message: `Would you like to place your bet on every 'Ruota' (Tutte)?`,
            choices: [
            { title: 'Yes', value: true},
            { title: 'No', value: false}
            ],
            onRender(kleur) {
                // @ts-ignore
                this.msg = kleur.green(`Would you like to place your bet on every 'Ruota' (Tutte)?`);
            }
        }]);
        
        if (tutte.cities) {
            return `Tutte`;
        } else {
            const response = await prompts([
                {
                    type: 'multiselect',
                    name: 'cities',
                    message: `On which 'Ruota' would you like to place your bet? (you can choose as many as you want)`,
                    choices: [
                    { title: 'Bari', value: `Bari`},
                    { title: 'Cagliari', value: 'Cagliari'},
                    { title: 'Firenze', value: 'Firenze'},
                    { title: 'Genova', value: 'Genova'},
                    { title: 'Milano', value: 'Milano'},
                    { title: 'Napoli', value: `Napoli`},
                    { title: 'Palermo', value: 'Palermo'},
                    { title: 'Roma', value: 'Roma'},
                    { title: 'Torino', value: 'Torino'},
                    { title: 'Venezia', value: 'Venezia'},
                    ],
                    onRender(kleur) {
                        // @ts-ignore
                        this.msg = kleur.green(`On which 'Ruota' would you like to place your bet? (you can choose as many as you want)`);
                    }
                }]);
            
            return response.cities.join(`, `);
        };
};

module.exports = citiesQuestion;
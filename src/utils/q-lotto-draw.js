// @ts-check
/**
 * @author Salvatore Quagliariello
 * @module q-lotto-draw.js
 */

const prompts = require('prompts');

/**
 * An helper function, built on `Prompts`, that ask, through a personalized CLI Prompt, if the user 
 * would like to partecipate in a Lotto Draw.
 * The function is used as a Private Method of the LottoGame Class.
 * @returns {Promise<Boolean>} Returns a Promise that, once fullfilled, returns a boolean value.
 */
async function lottoDrawQuestion() {
    const response = await prompts([
        {
            type: 'select',
            name: 'answer',
            message: `Would you like to participate in the draw?`,
            choices: [
            { title: 'Yes', value: true},
            { title: 'No', value: false}
            ],
            onRender(kleur) {
                // @ts-ignore
                this.msg = kleur.green(`Would you like to participate in the draw?`);
            }
        }]);

    return response.answer;
};

module.exports = lottoDrawQuestion;
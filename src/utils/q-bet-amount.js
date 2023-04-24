const prompts = require('prompts');

async function betAmountQuestion() {
    const response = await prompts([
        {
            type: 'number',
            name: 'bet',
            message: `How much would you like to bet? - The bet must be at least €1.00, up to a maximum of €200.00 (in €0.50 increments). Every entered value that does not follow this rule, will be rounded to the nearest valid value. Enter decimal values after the point. -`,
            min: 1,
            max: 200,
            float: true,
            increment: 0.50,
            onRender(kleur) {
                // @ts-ignore
                this.msg = kleur.green(`How much would you like to bet? - The bet must be at least €1.00, up to a maximum of €200.00 (in €0.50 increments). Every entered value that does not follow this rule, will be rounded to the nearest valid value. Enter decimal values after the point. -`);
            }
        }]);

    return response.bet;
};

module.exports = betAmountQuestion;

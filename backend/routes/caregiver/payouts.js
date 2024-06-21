const connection = require('../../db/connection');
const { Stripe } = require('stripe');

const stripe = new Stripe(process.env.STRIPE_API_KEY);

const createStripeAccount = async (req, res) => {
    const { email } = req.body;

    try {
        const bank_account = await stripe.tokens.create({
            bank_account: {
                country: 'US',
                currency: 'usd',
                account_holder_name: 'Jenny Rosen',
                account_holder_type: 'individual',
                routing_number: '110000000',
                account_number: '000123456789',
            },
        });

        const account = await stripe.accounts.create({
            type: 'custom',
            email,
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            }
        });

        const external_bank_account = await stripe.accounts.createExternalAccount(account.id, {
            external_account: bank_account.id,
            default_for_currency: true,
        });

        const sql = `UPDATE caregivers_ SET stripe_account_id = ? WHERE email = ?`;
        connection.query(sql, [account.id, email], (err) => { if (err) throw err; });

        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: 'https://kea.care/caregiver/account',
            return_url: 'https://kea.care/caregiver/account',
            type: 'account_onboarding',
        });

        res.status(200).json({ url: accountLink.url });
    }
    catch (err) {
        res.status(500).json(err);
    }
};

const deleteStripeAccount = async (req, res) => {
    const { account } = req.params;

    try {
        const deleted = await stripe.accounts.del(account);

        connection.query(`UPDATE caregivers_ SET stripe_account_id = NULL WHERE stripe_account_id = ?`, [account], (err) => { if (err) throw err; });

        res.status(200).json(deleted);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const createPayout = async (req, res) => {
    const { amount, accountId } = req.body;
    try {
        const payout = await stripe.payouts.create({
            amount,
            currency: 'usd',
            method: 'instant',
            destination: accountId,
            source_type: 'bank_account',
        });

        res.status(200).json(payout);
    } catch (err) {
        res.status(500).json(err);
        throw err;
    }
};

module.exports = {
    createStripeAccount,
    createPayout,
    deleteStripeAccount
};
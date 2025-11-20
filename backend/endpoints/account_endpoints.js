const EXPRESS = require('express');
const AccountsRepository = require('../db/account_collection');
const {BAuth, AssertParams} = require(`./request_helper_methods.js`);

module.exports.AccountsAPI = EXPRESS();
this.AccountsAPI.use(EXPRESS.json());

this.AccountsAPI.get('/api/accounts', async (req, res) => {

    const accounts = await AccountsRepository.List();
    res.send(accounts);
});

this.AccountsAPI.get('/api/account/:id', async (req, res) => {
    const account = await AccountsRepository.Get(req.params.id);
    if (!account) return res.status(404).send('Account not found');
    res.send(account);
});

this.AccountsAPI.get('/api/authorize', async (req, res) => {
    try {
        const creds = BAuth(req);
        const isAuthorized = await AccountsRepository.IsAuthorized(creds.username, creds.password);
        if (!isAuthorized)
            res.status(401).send({message: "Wrong username or password"});
        else
            res.status(200).send({message: "Authorized"});
    } catch (error) {
        console.error("Caught:", error.message);
        res.status(400).json({ message: error.message });
    }
});

this.AccountsAPI.post('/api/accounts', async (req, res) => {
    try {
        await AccountsRepository.Register(req.body);

        res.status(201).send({message: `Account with username created`});
    } catch (error) {
        console.error("Caught:", error.message);
        res.status(400).json({ message: error.message });
    }
});

this.AccountsAPI.delete('/api/account/:id', async (req, res) => {
    try
    {
        await AccountsRepository.Delete(req.params.id, req.body.password);
        res.status(201).send({message: `Account with username '${req.params.id}' deleted`});
    }
    catch (error) {
        console.error("Caught:", error.message);
        res.status(400).json({ message: error.message });
    }
});
import fastify from "fastify";
import crypto from 'node:crypto';
import { knex } from "./database";
import { env } from "./env";

const app = fastify();

app.get("/", async (req, res) => {

    const transactions = await knex('transactions').insert({
        id: crypto.randomUUID(),
        title: 'Transaction test',
        amount: 1000
    }).returning('*');

    res.send(transactions);
});

app.get("/consult", async (req, res) => {

    const transactions = await knex('transactions').select('*');

    res.send(transactions);
});

app.get("/consult/:amount", async (req, res) => {

    const { amount } = req.params;

    const transactions = await knex('transactions')
        .where('amount', amount)
        .select('*');

    res.send(transactions);
});

app.listen({
    port: env.PORT
}).then(() => {
    console.log(`Server listening on port ${env.PORT}`);
});
import fastify from "fastify";
import { knex } from "./db";

const app = fastify();

app.get("/", async (req, res) => {

    const tables = await knex('sqlite_schema').select('*');

    res.send(tables);
});

app.listen({
    port: 3333
}).then(() => {
    console.log("Server listening on port 3333");
});
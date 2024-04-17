import dotenv from "dotenv";
import express from 'express';

import metadata from './api/metadata';
import ratelimiter from "./ratelimit";
import verifyAttest from './api/attest/verify-attest';
import generateChallenge from './api/attest/generate-challenge';

dotenv.config();

const app = express()
const port = process.env.PORT;

app.use(ratelimiter)

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/metadata', metadata)

app.use('/attest', verifyAttest)
app.use('/attest', generateChallenge)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

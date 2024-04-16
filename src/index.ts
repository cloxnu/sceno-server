import dotenv from "dotenv";
import express from 'express';

import metadata from './api/metadata';
import { RateLimiterMemory } from "rate-limiter-flexible";

dotenv.config();

const app = express()
const port = process.env.PORT;

const opts = {
    points: 20,
    duration: 10, // Per second
};

const rateLimiter = new RateLimiterMemory(opts);

app.use((req, res, next) => {
    if (req.ip !== undefined) {
        rateLimiter.consume(req.ip)
            .then(() => {
                next();
            })
            .catch(_ => {
                res.status(429).send('Too Many Requests');
            });
    } else {
        res.status(429).send('Too Many Requests');
    }
})

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/metadata', metadata)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

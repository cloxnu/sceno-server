import dotenv from "dotenv";
import express from 'express';

import metadata from './api/metadata';

dotenv.config();

const app = express()
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/metadata', metadata)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

import { randomUUID } from 'crypto';
import express from 'express';
const router = express.Router()

router.get('/', (req, res) => {
    const challenge = randomUUID()
    res.send(challenge)
})

export default router


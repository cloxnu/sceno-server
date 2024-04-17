import { RateLimiterMemory } from "rate-limiter-flexible";
import { Express, Request, Response, NextFunction } from 'express';

const opts = {
    points: 50,
    duration: 10, // Per second
};

const rateLimiter = new RateLimiterMemory(opts);

export default (req: Request, res: Response, next: NextFunction) => {
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
}

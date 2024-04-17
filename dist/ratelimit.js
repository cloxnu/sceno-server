import { RateLimiterMemory } from "rate-limiter-flexible";
const opts = {
    points: 20,
    duration: 10, // Per second
};
const rateLimiter = new RateLimiterMemory(opts);
export default (req, res, next) => {
    if (req.ip !== undefined) {
        rateLimiter.consume(req.ip)
            .then(() => {
            next();
        })
            .catch(_ => {
            res.status(429).send('Too Many Requests');
        });
    }
    else {
        res.status(429).send('Too Many Requests');
    }
};

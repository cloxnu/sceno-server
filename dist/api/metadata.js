import dotenv from "dotenv";
import express from 'express';
import getSession from '../session';
import { ofetch } from 'ofetch';
import { verifyAssertionMiddleware } from "../verify-assertion";
const router = express.Router();
dotenv.config();
const key = process.env.GM_KEY;
function isCoordinateRequest(obj) {
    return 'lat' in obj && 'lng' in obj;
}
router.use(verifyAssertionMiddleware);
router.get('/', async (req, res) => {
    try {
        const session = (await getSession(req.app.locals));
        const sessionToken = session.session;
        if (isCoordinateRequest(req.query)) {
            const coordinateRequest = req.query;
            const metadataModel = await ofetch(`https://tile.googleapis.com/v1/streetview/metadata?session=${sessionToken}&key=${key}&lat=${coordinateRequest.lat}&lng=${coordinateRequest.lng}&radius=${coordinateRequest.radius ?? 50}`, {
                method: 'GET',
            });
            res.json(metadataModel);
        }
        else {
            res.status(400);
        }
    }
    catch (e) {
        console.error(`get metadata failed: ${e}`);
        res.json({
            errorCode: -1,
            errorMessage: "get metadata failed"
        });
    }
});
export default router;

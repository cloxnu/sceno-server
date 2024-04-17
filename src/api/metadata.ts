import dotenv from "dotenv";
import express from 'express';
import getSession from '../session';
import ErrorModel from '../error';
import bodyParser from 'body-parser';
import { ofetch } from 'ofetch';
import { verifyAssertionMiddleware } from "../verify-assertion";
const router = express.Router()

dotenv.config()
const key = process.env.GM_KEY;

interface MetadataModel {
    panoId: string
    lat: number
    lng: number
    imageHeight: number
    imageWidth: number
    tileHeight: number
    tileWidth: number
    heading?: number
    tilt?: number
    roll?: number
    copyright?: string
    date?: string
    links?: MetadataLink[]
}

interface MetadataLink {
    panoId: string
    heading: number
    text?: string
}

function isCoordinateRequest(obj: any): boolean {
    return 'lat' in obj && 'lng' in obj
}

function isPanoIDRequest(obj: any): boolean {
    return 'panoId' in obj
}

router.use(verifyAssertionMiddleware)

router.post('/', async (req, res) => {
    try {
        const session = (await getSession(req.app.locals))
        const sessionToken = session.session
        if (isCoordinateRequest(req.body)) {
            const coordinateRequest = req.body
            const metadataModel = await ofetch<MetadataModel>(`https://tile.googleapis.com/v1/streetview/metadata?session=${sessionToken}&key=${key}&lat=${coordinateRequest.lat}&lng=${coordinateRequest.lng}&radius=${coordinateRequest.radius ?? 50}`, {
                method: 'GET',
            })
            res.json(metadataModel).send()
        } else if (isPanoIDRequest(req.body)) {
            const panoIdRequest = req.body
            const metadataModel = await ofetch<MetadataModel>(`https://tile.googleapis.com/v1/streetview/metadata?session=${sessionToken}&key=${key}&panoId=${panoIdRequest.panoId}`, {
                method: 'GET',
            })
            res.json(metadataModel).send()
        } else {
            res.status(400).send()
        }
    } catch(e) {
        console.error(`get metadata failed: ${e}`)
        res.json(<ErrorModel>{
            errorCode: -1,
            errorMessage: "get metadata failed"
        }).send()
    }
})

export default router

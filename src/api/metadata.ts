import dotenv from "dotenv";
import express from 'express';
import getSession from '../session';
import ErrorModel from '../error';
import { ofetch } from 'ofetch';
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

interface MetadataCoordinateRequest {
    lat: string
    lng: string
    radius?: string
}

function isCoordinateRequest(obj: any): boolean {
    return 'lat' in obj && 'lng' in obj
}

router.get('/', async (req, res) => {
    try {
        const session = (await getSession(req.app.locals))
        const sessionToken = session.session
        if (isCoordinateRequest(req.query)) {
            const coordinateRequest = req.query
            const metadataModel = await ofetch<MetadataModel>(`https://tile.googleapis.com/v1/streetview/metadata?session=${sessionToken}&key=${key}&lat=${coordinateRequest.lat}&lng=${coordinateRequest.lng}&radius=${coordinateRequest.radius ?? 50}`, {
                method: 'GET',
            })
            res.json(metadataModel)
        } else {
            res.status(400)
        }
    } catch(e) {
        console.error(`get metadata failed: ${e}`)
        res.json(<ErrorModel>{
            errorCode: -1,
            errorMessage: "get metadata failed"
        })
    }
})

export default router

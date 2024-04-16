import { ofetch } from "ofetch";
import dotenv from "dotenv";

dotenv.config();
const key = process.env.GM_KEY
const sessionTokenKey = "GMSessionToken"

interface SessionModel {
    session: string,
    expiry: string,
    tileWidth?: number,
    tileHeight?: number,
    imageFormat?: string,
}

export default async function getSession(locals: Record<string, any>): Promise<SessionModel> {
    if (locals[sessionTokenKey] === undefined) {
        const session = await createSession()
        locals[sessionTokenKey] = session
    }
    let session = locals[sessionTokenKey] as SessionModel
    if (session.expiry !== undefined) {
        const expiryTimeInterval = Number(session.expiry)
        const now = Math.floor(Date.now() / 1000)
        console.log(now)
        if (now >= expiryTimeInterval) {
            session = await createSession()
            locals[sessionTokenKey] = session
        }
    }
    return session
}

export async function createSession(): Promise<SessionModel> {
    return await ofetch<SessionModel>("https://tile.googleapis.com/v1/createSession", {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': 'true',
            
        },
        params: {
            "key": key,
        },
        body: {
            "mapType": "streetview",
            "language": "en-US",
            "region": "US",
        },
    })
}

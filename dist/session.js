import { ofetch } from "ofetch";
import dotenv from "dotenv";
dotenv.config();
const key = process.env.GM_KEY;
const sessionTokenKey = "GMSessionToken";
export default async function getSession(locals) {
    if (locals[sessionTokenKey] === undefined) {
        const session = await createSession();
        locals[sessionTokenKey] = session;
    }
    let session = locals[sessionTokenKey];
    if (session.expiry !== undefined) {
        const expiryTimeInterval = Number(session.expiry);
        const now = Math.floor(Date.now() / 1000);
        if (now >= expiryTimeInterval) {
            session = await createSession();
            locals[sessionTokenKey] = session;
        }
    }
    return session;
}
export async function createSession() {
    return await ofetch("https://tile.googleapis.com/v1/createSession", {
        method: 'POST',
        params: {
            "key": key,
        },
        body: {
            "mapType": "streetview",
            "language": "en-US",
            "region": "US",
        },
    });
}

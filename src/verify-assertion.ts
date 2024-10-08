import dotenv from "dotenv";
import { Express, Request, Response, NextFunction } from 'express';
import { verifyAttestation, verifyAssertion as _verifyAssertion } from 'node-app-attest';
import { findAttestation, modifyAttestationSignCount } from './db/attestation';
import stringify from 'json-stable-stringify';

dotenv.config();

const bundleId = process.env.BUNDLE_IDENTIFIER
const teamId = process.env.TEAM_IDENTIFIER

const debugToken = process.env.DEBUG_TOKEN

export async function verifyAssertion(token: string, req: object): Promise<boolean> {
    try {
        const { keyId, assertion } = JSON.parse(Buffer.from(token, 'base64').toString());
        if (keyId === undefined || assertion === undefined) {
            throw new Error('Invalid authentication');
        }
        const attestationModel = await findAttestation(keyId)
        if (!attestationModel) {
            throw new Error('No attestation found');
        }
        
        const result = _verifyAssertion({
            assertion: Buffer.from(assertion, 'base64'),
            payload: stringify(req),
            publicKey: attestationModel.publicKey,
            bundleIdentifier: bundleId,
            teamIdentifier: teamId,
            signCount: attestationModel.signCount,
        })

        modifyAttestationSignCount(keyId, result.signCount)
        return true
    } catch (error) {
        console.error('verify assertion error', error)
        return false
    }
}

function verifyDebugUUID(token: string): boolean {
    return token === debugToken
}

export async function verifyAssertionMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '') ?? ''
    if (await verifyAssertion(token, req.body) || verifyDebugUUID(token)) {
        next()
    } else {
        res.status(403).send()
    }
}


import express from 'express';
import dotenv from "dotenv";
import { addAttestation } from '../../db/attestation';
import { verifyAttestation, verifyAssertion } from 'node-app-attest'
const router = express.Router()

dotenv.config();

const bundleId = process.env.BUNDLE_IDENTIFIER
const teamId = process.env.TEAM_IDENTIFIER

router.post('/', (req, res) => {
    try {
        let params = req.body
        const model = {
            keyId: params.keyId,
            challenge: params.challenge,
            attestation: params.attestation,
        }
        if (!(typeof model.keyId === 'string' && 
              typeof model.challenge === 'string' && 
              typeof model.attestation === 'string')) {
            res.status(400).send()
            return
        }
        const result = verifyAttestation({
            attestation: Buffer.from(model.attestation, 'base64'),
            challenge: model.challenge,
            keyId: model.keyId,
            bundleIdentifier: bundleId,
            teamIdentifier: teamId,
            allowDevelopmentEnvironment: true,
        })
        console.log(result)
        addAttestation({
            keyId: result.keyId,
            publicKey: result.publicKey,
            signCount: 0,
        })
        res.status(204).send()
    } catch (error) {
        console.error(`verify attest failed: ${error}`)
        res.status(401).send('Unauthorized')
    }
    
})

export default router

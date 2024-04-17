import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface AttestationModel {
    keyId: string
    publicKey: string
    signCount: number
}

async function addAttestation(model: AttestationModel) {
    await prisma.attestation.create({
        data: {
            keyId: model.keyId,
            publicKey: model.publicKey,
            signCount: model.signCount,
        }
    })
}

async function findAttestation(keyId: string): Promise<AttestationModel | null> {
    const query = await prisma.attestation.findUnique({
        where: {
            keyId: keyId
        },
        select: {
            keyId: true,
            publicKey: true,
            signCount: true,
        }
    })
    if (query !== null) {
        return {
            keyId: query.keyId,
            publicKey: query.publicKey,
            signCount: query.signCount,
        }
    }
    return null
}

async function modifyAttestationSignCount(keyId: string, signCount: number) {
    await prisma.attestation.update({
        where: {
            keyId: keyId,
        },
        data: {
            signCount: signCount,
        }
    })
}

export {
    addAttestation,
    findAttestation,
    modifyAttestationSignCount,
}

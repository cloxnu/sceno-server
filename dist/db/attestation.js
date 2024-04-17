import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function addAttestation(model) {
    await prisma.attestation.create({
        data: {
            keyId: model.keyId,
            publicKey: model.publicKey,
            signCount: model.signCount,
        }
    });
}
async function findAttestation(keyId) {
    const query = await prisma.attestation.findUnique({
        where: {
            keyId: keyId
        },
        select: {
            keyId: true,
            publicKey: true,
            signCount: true,
        }
    });
    if (query !== null) {
        return {
            keyId: query.keyId,
            publicKey: query.publicKey,
            signCount: query.signCount,
        };
    }
    return null;
}
async function modifyAttestationSignCount(keyId, signCount) {
    await prisma.attestation.update({
        where: {
            keyId: keyId,
        },
        data: {
            signCount: signCount,
        }
    });
}
export { addAttestation, findAttestation, modifyAttestationSignCount, };

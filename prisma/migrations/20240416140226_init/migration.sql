-- CreateTable
CREATE TABLE "Attestation" (
    "keyId" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "signCount" INTEGER NOT NULL,

    CONSTRAINT "Attestation_pkey" PRIMARY KEY ("keyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attestation_publicKey_key" ON "Attestation"("publicKey");

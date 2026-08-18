-- CreateTable
CREATE TABLE "InstagramToken" (
    "id" TEXT NOT NULL DEFAULT 'angelis',
    "accessToken" TEXT NOT NULL,
    "expiraEm" TIMESTAMP(3) NOT NULL,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstagramToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoOracao" (
    "id" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "mensagem" TEXT,
    "atendido" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PedidoOracao_pkey" PRIMARY KEY ("id")
);

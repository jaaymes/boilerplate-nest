import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Limpando o banco de dados...');

  // Limpar registros existentes
  await prisma.user.deleteMany({});

  console.log('✅ Banco de dados limpo com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante a limpeza do banco de dados:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  console.log('🌱 Iniciando seed de 100 usuários...');

  // Limpar registros existentes para evitar conflitos
  await prisma.user.deleteMany({});

  let count = 0;

  // Gerar e inserir 100 usuários
  for (let i = 1; i <= 100; i++) {
    const hashedPassword = hashPassword(`password${i}`);

    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: hashedPassword,
      },
    });

    count++;
  }

  console.log(`✅ Seed concluído com sucesso! ${count} usuários criados.`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

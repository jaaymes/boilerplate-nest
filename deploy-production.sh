#!/bin/bash

# Script para implantar a aplicação NestJS em produção

echo "Iniciando deploy em produção..."

# Aumentar timeout do Docker para evitar problemas de download de imagens
export COMPOSE_HTTP_TIMEOUT=300
export DOCKER_CLIENT_TIMEOUT=300

# Verificar conexão com o Docker Hub antes de continuar
echo "🔍 Verificando conexão com o Docker Hub..."
if ! curl -s --max-time 10 https://registry-1.docker.io/v2/ > /dev/null; then
  echo "❌ Não foi possível conectar ao Docker Hub. Verifique sua conexão de internet."
  exit 1
fi

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker e tente novamente."
    exit 1
fi

# Verificar se o Docker Compose está instalado
if ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose e tente novamente."
    exit 1
fi

# Limpar caches de build anteriores
echo "🧹 Limpando caches de build anteriores..."
docker builder prune -f

# Construir e iniciar os containers
docker compose -f docker-compose.prod.yml up -d --build

# Verificar se os containers estão rodando
if [ $? -eq 0 ]; then
    echo "✅ Containers iniciados com sucesso!"
    echo "A API está disponível em: http://localhost:3003"
else
    echo "❌ Falha ao iniciar os containers. Verifique os logs para mais detalhes."
    exit 1
fi

echo "⏳ Aguardando a aplicação iniciar..."
sleep 5

# Executar migrações do Prisma
echo "🔄 Executando migrações do Prisma..."
docker compose -f docker-compose.prod.yml exec api npx prisma migrate deploy

echo "✅ Implantação concluída com sucesso!"
echo "🌐 A API está disponível em: http://localhost:3003"
echo ""
echo "Para verificar os logs da aplicação:"
echo "  docker compose -f docker-compose.prod.yml logs -f api"
echo ""
echo "Para encerrar a aplicação:"
echo "  docker compose -f docker-compose.prod.yml down" 
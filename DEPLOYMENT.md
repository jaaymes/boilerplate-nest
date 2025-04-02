# Guia de Implantação em Produção

Este guia explica como executar a aplicação NestJS em ambiente de produção usando Docker.

## Pré-requisitos

- Docker e Docker Compose instalados
- Variáveis de ambiente configuradas (opcional)

## Estrutura dos Arquivos

- `Dockerfile`: Configuração para construir a imagem Docker
- `docker-compose.prod.yml`: Configuração para ambiente de produção
- `docker-compose.yml`: Configuração para ambiente de desenvolvimento

## Variáveis de Ambiente

Para maior segurança, crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
JWT_SECRET=sua-chave-secreta-para-jwt-em-producao
```

Se não for criado o arquivo, será utilizada uma chave padrão definida no docker-compose.prod.yml.

## Implantação em Produção

```bash
# Construir e iniciar os containers em produção
docker-compose -f docker-compose.prod.yml up -d --build

# Verificar logs da aplicação
docker-compose -f docker-compose.prod.yml logs -f api

# Executar migrações do Prisma (na primeira execução ou após alterações no schema)
docker-compose -f docker-compose.prod.yml exec api npx prisma migrate deploy
```

## Acesso à Aplicação

Após a implantação, a API estará disponível em:

- http://localhost:3003

## Encerrando o Ambiente

```bash
# Encerrar mantendo os volumes (dados do banco)
docker-compose -f docker-compose.prod.yml down

# Encerrar removendo os volumes (perderá os dados do banco)
docker-compose -f docker-compose.prod.yml down -v
```

## Observações

- O banco de dados SQLite é persistido em um volume Docker chamado `sqlite_data`
- O NestJS é executado em modo de produção, o que otimiza o desempenho da aplicação 
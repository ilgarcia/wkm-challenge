# Working Minds - Challenge

Este projeto foi desenvolvido como parte de um processo seletivo para Working Minds. Utiliza Next.js para a construção da interface e algumas bibliotecas complementares, estilização e utilização do headless CMS Strapi no backend.

## Tecnologias Utilizadas

- Next.js - Framework React para renderização SSR e SSG.
- TypeScript - Adiciona tipagem estática.
- Tailwind - Estilização utility first CSS.
- Zod - Biblioteca para validação e definição de esquemas com foco em TypeScript.
- Strapi v5 - CMS headless que facilita a criação e gestão de conteúdo.
- Docker - Plataforma de containerização que simplifica a criação, distribuição e execução de aplicações em ambientes isolados.

## Como Executar o Projeto

### Requisitos:

- Node.js v16 ou superior
- NPM instalado

### Passo a passo:

1. Clonar repositório localmente:

```bash
git clone https://github.com/ilgarcia/wkm-challenge.git
cd wkm-challenge
```

2. Configure variáveis de desenvolvimento

* No diretório /client e configure seu arquivo .env.local. Você pode usar o arquivo .env.local.example como referência.

```bash
STRAPI_URL=http://localhost:1337
```

* No diretório /server e configure seu arquivo .env. Você pode usar o arquivo .env.example como referência.

```bash
# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified

# Database
DATABASE_CLIENT=sqlite
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_SSL=false
DATABASE_FILENAME=.tmp/data.db
JWT_SECRET=tobemodified
```

### Docker

3. Construir as imagens do frontend e backend, levantar o banco de dados sqlite.

```bash
docker-compose up --build
```

> O backend do projeto estará disponível em http://localhost:1337.
> Você será solicitado a criar seu primeiro usuário administrador.
> O frontend do projeto estará disponível em http://localhost:3000.

### Localmente

3. Instalar Dependências na raiz do projeto:

```bash
npm run setup
```

4. Navegue até o diretório /server e executar o servidor de desenvolvimento:

```bash
npm run develop
```

> O backend do projeto estará disponível em http://localhost:1337.
> Você será solicitado a criar seu primeiro usuário administrador.

5. Navegue até o diretório /client e executar a aplicação:

```bash
npm run dev
```
> O frontend do projeto estará disponível em http://localhost:3000.

**Você também pode executar ambos os projetos simultaneamente usando o *concurrently* para iniciar os dois ao rodar `npm run dev` na raiz do projeto.**

##### Scripts local

Você pode verificar os scripts dentro do arquivo package.json na raiz do seu projeto.

```bash
{
  "scripts": {
    "client": "npm run dev --prefix ../client/",
    "server": "npm run dev --prefix ../server/",
    "clear": "rimraf client/.next client/cache",
    "setup:client": "cd client && npm install",
    "setup:server": "cd server && npm install",
    "setup": "npm install && npm run setup:client && npm run setup:server",
    "dev": "npm run clear && concurrently \"cd client && npm run dev\" \"cd server && npm run develop\""
  },
  "dependencies": {
    "concurrently": "^8.2.2"
  },
  "devDependencies": {
    "rimraf": "^6.0.1"
  }
}
```

### Importar dados (banco de dados vazio)

> Em caso dos bancos de dados de estados e cidades estiverem vazios

1. Repita os passos 3 e 4 da instalação localmente (caso necessário).

Certifique-se de que a aplicação está configurada corretamente e conectada ao banco de dados.

2. Navegue até o diretório /server e executar o script de importação dos dados:

```bash
  npm run import-data
```

## Contato

- Nome: Igor
- E-mail: limagarcia.igor@gmail.com
- LinkedIn: [ilgarcia](https://www.linkedin.com/in/ilgarcia/)
- Portfolio: https://www.ilgarcia.com/

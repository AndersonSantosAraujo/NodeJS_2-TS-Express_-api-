# API de Cadastro de Pessoas e Cidades

Esta é uma API desenvolvida em Node.js com Express.js, TypeScript e PostgreSQL para o armazenamento de dados em produção. Ela permite o cadastro de pessoas e cidades, além de fornecer recursos para autenticação. 
## Configuração
### Pré-requisitos  

Antes de começar, certifique-se de ter instalado o seguinte em seu ambiente de desenvolvimento: 

- Node.js: [Download](https://nodejs.org/) 
- PostgreSQL: [Download](https://www.postgresql.org/) 
- Yarn (opcional): [Download](https://classic.yarnpkg.com/en/docs/install/)  

### Instalação  

1. Clone o repositório:  `git clone https://github.com/seu-usuario/seu-projeto.git`

2. Acesse o diretório do projeto: `cd seu-projeto`

3. Instale as dependências: `yarn install` ou `npm install`

4. Configure as variáveis de ambiente:

Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente de acordo com suas necessidades. Certifique-se de configurar as credenciais do banco de dados PostgreSQL.

### Uso

Inicie o servidor localmente: `yarn start`  ou `npm start`

A API estará disponível em `http://localhost:3000`. Você pode usar uma ferramenta como o [Postman](https://www.postman.com/) ou o [Insomnia](https://insomnia.rest/) para testar os endpoints.

## Testes

A API é testada usando o framework Jest. Para executar os testes, use o seguinte comando: `yarn test` ou `npm test`

## Implantação

A implantação deste projeto pode ser feita em uma plataforma como a [Vercel](https://vercel.com/). Certifique-se de configurar as variáveis de ambiente no painel de controle da plataforma para corresponder às suas configurações de produção.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e enviar solicitações de pull (pull requests).

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE.md](https://chat.openai.com/c/LICENSE.md) para obter detalhes.

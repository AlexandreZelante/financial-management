# Sistema de Gerenciamento de Finanças

Esse sistema consiste num gerenciador de finanças, onde você pode cadastrar todas as transações realizadas no seu dia a dia, dizendo o valor, no que foi gasto (tipo), como também criar categoria de gastos. Você também pode importar um CSV com todos seus gastos.

## Tecnologias Utilizadas
- Node.js
- Express
- TypeScript
- TypeORM
- PostgreSQL
- Multer

# Instruções para execução

1. Clone este repositório. Tenha certeza que você possui o NodeJS instalado em sua máquina. (https://nodejs.org/en/download/)

2.  Faça o download do PostgreSQL, e defina uma porta para comunicação, neste tutorial utilizamos a padrão: 5432. (https://www.postgresql.org/download/)

3. Crie um banco de dados com o nome desejado, e o modifique no arquivo *ormconfig.json* no campo "database" para que seja o mesmo.

4. No diretório raíz do projeto, instale as dependências.

```
  // Com Yarn
  yarn

  //Com NPM
  npm install
```

5. Caso sua porta do PostgreSQL for diferente de 5432, modifique no arquivo *ormconfig.json* , para que o TypeORM consiga se comunicar com seu banco de dados.

6. Execute as Migrations

```
  // Com Yarn
  yarn typeorm migration:run

  //Com NPM
  npx typeorm migration:run
```

7. Por fim vamos executar nosso projeto.

```
  // Com Yarn
  yarn dev:server

  //Com NPM
  npm run dev:server
```

## Documentação

- Create Transaction:
  - Metódo HTTP: POST

  - Rota: /transactions

  Exemplo

  ```
  {
	"title": "Salário",
	"value": 5000,
	"type": "income",
	"category": "Food"
  }
  ```

- Get Transactions:
  - Metódo HTTP: GET

  - Rota: /transactions

  Sem corpo

- Delete Transactions:
  - Metódo HTTP: DELETE

  - Rota: /transactions/:id

  Sem corpo

- Import CSV:
  - Metódo HTTP: POST

  - Rota: /transactions/import

  Exemplo

  MULTIPART FORM DATA

  field name: file
  field value: file type CSV

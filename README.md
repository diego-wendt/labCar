# labCAR

Projeto de aplicação Back-End destinado a simular o Back-End de uma aplicativo de transportes, conectando motoristas e passageiros.
Este projeto foi desenvolvido em NestJs e foi a primeira avaliação do segundo módulo do curso DevInHouse - Intelbras.

## Funcionalidades

- Cadastro, exclusão, edição, listagem geral (com filtro e paginação), listagem individual e bloqueio de motoristas.
- Cadastro, exclusão, edição, listagem geral (com filtro e paginação) e listagem individual de passageiros.
- Solicitação de viagens pelo cliente.
- Busca das viagens disponíveis pelo motorista.
- Documentação para o aplicativo Imsomnia com as rotas e arquivos JSON.

## Stack utilizada

**Back-end:** Node e NestJs

- [Node.Js] - Software para execução de aplicações Javascript.
- [NestJs] - Framework Node.Js para criação de aplicações Back-End eficientes e escaláveis.
- [UUID] - Gerador de códigos de identificação únicos.
- [Insomnia] - Aplicação para executar requisições HTTP.

[node.js]: https://nodejs.org/en/
[nestjs]: https://nestjs.com
[uuid]: https://www.npmjs.com/package/uuid
[moment.js]: https://momentjs.com
[insomnia]: https://insomnia.rest

## Instalação

Clone o projeto

```bash
  git clone https://link-para-o-projeto
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  yarn install
```

Inicie o servidor

```bash
  yarn start:dev
```

## Documentação da API

### Endpoints - Motorista

#### Listar todos os motoristas:

```http
  GET http://localhost:3000/drivers?page=0&size=0&name=exemplo
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `page`    | `number` | **Opcional**. Página da pesquisa            |
| `size`    | `number` | **Opcional**. Itens por página no resultado |
| `name`    | `string` | **Opcional**. Busca por nome                |

##### Resultado esperado:

```json
[
  {
    "name": "Exemplo",
    "dateBirth": "15/01/1991",
    "cpf": "67708696674",
    "licensePlate": "ABC1234",
    "model": "Carro",
    "id": "c99d8e29-1076-41eb-8818-d5d4c3328e5e",
    "isLocked": false
  }
]
```

#### Listar um motorista:

```http
  GET http://localhost:3000/drivers/cpf
```

| Parâmetro | Tipo     | Descrição                                          |
| :-------- | :------- | :------------------------------------------------- |
| `cpf`     | `number` | **Obrigatório**. Cpf do motorista a ser pesquisado |

##### Resultado esperado:

```json
{
  "name": "Exemplo",
  "dateBirth": "15/01/1991",
  "cpf": "67708696674",
  "licensePlate": "ABC1234",
  "model": "Carro",
  "id": "c99d8e29-1076-41eb-8818-d5d4c3328e5e",
  "isLocked": false
}
```

#### Cadastrar um motorista:

| Parâmetro      | Tipo     | Descrição - Preenchimento obrigatório.   |
| :------------- | :------- | :--------------------------------------- |
| `name`         | `number` | Nome do motorista.                       |
| `dateBirth`    | `date`   | Data de nascimento em formato dd/mm/yyyy |
| `cpf`          | `number` | Cpf do motorista sem pontos.             |
| `licensePlate` | `string` | Placa do veículo                         |
| `model`        | `string` | Modelo do veículo                        |

```json
  POST http://localhost:3000/drivers

  Body - Json

{
	"name":"Exemplo",
	"dateBirth":"15/01/1991",
	"cpf":"67708696674",
	"licensePlate":"ABC1234",
	"model":"Carro"
}
```

##### Resultado esperado:

```json
{
  "name": "Exemplo",
  "dateBirth": "15/01/1991",
  "cpf": "67708696674",
  "licensePlate": "ABC1234",
  "model": "Carro",
  "id": "0b463c87-3bd6-4838-9c07-2e1e0e7087cd",
  "isLocked": false
}
```

#### Editar um motorista:

| Parâmetro      | Tipo     | Descrição - Preenchimento obrigatório.   |
| :------------- | :------- | :--------------------------------------- |
| `name`         | `number` | Nome do motorista.                       |
| `dateBirth`    | `date`   | Data de nascimento em formato dd/mm/yyyy |
| `cpf`          | `number` | Cpf do motorista sem pontos.             |
| `licensePlate` | `string` | Placa do veículo                         |
| `model`        | `string` | Modelo do veículo                        |

```json
  PUT http://localhost:3000/drivers/cpf

  Body - json

{
	"name":"Exemplo",
	"dateBirth":"15/01/1991",
	"cpf":"67708696674",
	"licensePlate":"ABC1234",
	"model":"Carro"
}
```

##### Resultado esperado:

```json
{
  "name": "Exemplo",
  "dateBirth": "15/01/1991",
  "cpf": "67708696674",
  "licensePlate": "ABC1234",
  "model": "Carro"
}
```

#### Bloquear um motorista:

```http
  PATCH http://localhost:3000/drivers/cpf
```

##### Resultado esperado: HTTP Code 204 - No content.

#### Deletar um motorista:

```http
  DELETE http://localhost:3000/drivers/cpf
```

##### Resultado esperado: HTTP Code 204 - No content.

### Endpoints - Passageiro

#### Listar todos os passageiros:

```http
  GET http://localhost:3000/passengers?page=0&size=0&name=exemplo
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `page`    | `number` | **Opcional**. Página da pesquisa            |
| `size`    | `number` | **Opcional**. Itens por página no resultado |
| `name`    | `string` | **Opcional**. Busca por nome                |

##### Resultado esperado:

```json
[
  {
    "name": "Exemplo",
    "dateBirth": "15/01/1991",
    "cpf": "67708696674",
    "address": {
      "street": "Rua Exemplo",
      "number": "150",
      "neighborhood": "Centro",
      "city": "Uma cidade qualquer",
      "state": "XX"
    },
    "id": "d17d55dd-a98b-43e1-a022-4446f410ecb1"
  }
]
```

#### Listar um passageiro:

```http
  GET http://localhost:3000/passengers/cpf
```

| Parâmetro | Tipo     | Descrição                                           |
| :-------- | :------- | :-------------------------------------------------- |
| `cpf`     | `number` | **Obrigatório**. Cpf do passageiro a ser pesquisado |

##### Resultado esperado:

```json
[
  {
    "name": "Exemplo",
    "dateBirth": "15/01/1991",
    "cpf": "67708696674",
    "address": {
      "street": "Rua Exemplo",
      "number": "150",
      "neighborhood": "Centro",
      "city": "Uma cidade qualquer",
      "state": "XX"
    },
    "id": "d17d55dd-a98b-43e1-a022-4446f410ecb1"
  }
]
```

#### Cadastrar um passageiro:

| Parâmetro      | Tipo     | Descrição                                |
| :------------- | :------- | :--------------------------------------- |
| `name`         | `number` | Nome do passageiro.                      |
| `dateBirth`    | `date`   | Data de nascimento em formato dd/mm/yyyy |
| `cpf`          | `number` | Cpf do passageiro sem pontos.            |
| `street`       | `string` | Nome da rua                              |
| `number`       | `string` | Número do imóvel                         |
| `neighborhood` | `string` | Bairro                                   |
| `city`         | `string` | Cidade                                   |
| `state`        | `string` | Estado                                   |

```json
  POST http://localhost:3000/passengers

Body - Json

{
	"name": "Exemplo",
	"dateBirth": "15/01/1991",
	"cpf": "67708696674",
	"address": {
		"street": "Rua Exemplo",
		"number": "150",
		"neighborhood": "Centro",
		"city": "Uma cidade qualquer",
		"state": "XX"
	}
 }
```

##### Resultado esperado:

```json
{
  "name": "Exemplo",
  "dateBirth": "15/01/1991",
  "cpf": "67708696674",
  "address": {
    "street": "Rua Exemplo",
    "number": "150",
    "neighborhood": "Centro",
    "city": "Uma cidade qualquer",
    "state": "XX"
  },
  "id": "c13f5a2a-32ea-4f16-b9c0-cfedd621c036"
}
```

#### Editar um passageiro:

| Parâmetro      | Tipo     | Descrição                                |
| :------------- | :------- | :--------------------------------------- |
| `name`         | `number` | Nome do passageiro.                      |
| `dateBirth`    | `date`   | Data de nascimento em formato dd/mm/yyyy |
| `cpf`          | `number` | Cpf do passageiro sem pontos.            |
| `street`       | `string` | Nome da rua                              |
| `number`       | `string` | Número do imóvel                         |
| `neighborhood` | `string` | Bairro                                   |
| `city`         | `string` | Cidade                                   |
| `state`        | `string` | Estado                                   |

```json
  PUT http://localhost:3000/passengers/cpf

Body - Json

{
	"name": "Exemplo",
	"dateBirth": "15/01/1991",
	"cpf": "67708696674",
	"address": {
		"street": "Rua Exemplo",
		"number": "150",
		"neighborhood": "Centro",
		"city": "Uma cidade qualquer",
		"state": "XX"
	}
 }
```

##### Resultado esperado:

```json
{
  "name": "Exemplo",
  "dateBirth": "15/01/1991",
  "cpf": "67708696674",
  "address": {
    "street": "Rua Exemplo",
    "number": "150",
    "neighborhood": "Centro",
    "city": "Uma cidade qualquer",
    "state": "XX"
  }
}
```

#### Deletar um passageiro:

```http
  DELETE http://localhost:3000/passengers/cpf
```

**Pasageiros podem ser excluídos desde que não haja nenhuma viagem cadastrada em seu CPF.**

##### Resultado esperado: HTTP Code 204 - No content.

### Endpoints - Viagens

#### Cadastrar uma viagem - passageiro:

| Parâmetro            | Tipo     | Descrição                          |
| :------------------- | :------- | :--------------------------------- |
| `cpfPassenger`       | `number` | Cpf do passageiro sem pontos.      |
| `travelStatus`       | `string` | DEVE SER PREENCHIDO COMO "CREATED" |
| `originAddress`      | `Array`  | Endereço do início da viagem.      |
| `destinationAddress` | `Array`  | Endereço do destino da viagem.     |
| `street`             | `string` | Nome da rua                        |
| `number`             | `string` | Número do imóvel                   |
| `neighborhood`       | `string` | Bairro                             |
| `city`               | `string` | Cidade                             |
| `state`              | `string` | Estado                             |

```json
  POST http://localhost:3000/travels

Body - Json

{
	  "originAddress":{
		"street": "Rua Aqui",
		"number": "150",
		"neighborhood": "Centro",
		"city": "Uma cidade qualquer",
		"state": "XX"
	},
	  "destinationAddress":{
		"street": "Rua do lado de lá",
		"number": "180",
		"neighborhood": "Bem longe",
		"city": "Outra cidade qualquer",
		"state": "XX"
	},
	"travelStatus":"CREATED",
	"cpfPassenger":"67708696674"
}
```

##### Resultado esperado: HTTP Code 201 - Created - No Body.

#### Listar viagens disponíveis - motorista:

| Parâmetro       | Tipo     | Descrição                     |
| :-------------- | :------- | :---------------------------- |
| `cpfDriver`     | `number` | Cpf do motorista sem pontos   |
| `driverAddress` | `Array`  | Endereço motorista no moment. |
| `street`        | `string` | Nome da rua                   |
| `number`        | `string` | Número do imóvel              |
| `neighborhood`  | `string` | Bairro                        |
| `city`          | `string` | Cidade                        |
| `state`         | `string` | Estado                        |

```json
  POST http://localhost:3000/travels/driver

Body - Json

{
		"cpfDriver":"67708696674",
    "driverAddress":{
		"street": "Rua Aqui",
		"number": "150",
		"neighborhood": "Centro",
		"city": "Uma cidade qualquer",
		"state": "XX"
	},
}

```

##### Resultado esperado: HTTP Code 201 - Created.

```json
[
  {
    "originAddress": {
      "street": "Rua Aqui",
      "number": "150",
      "neighborhood": "Centro",
      "city": "Uma cidade qualquer",
      "state": "XX"
    },
    "destinationAddress": {
      "street": "Rua do lado de lá",
      "number": "180",
      "neighborhood": "Bem longe",
      "city": "Outra cidade qualquer",
      "state": "XX"
    },
    "travelStatus": "CREATED",
    "cpfPassenger": "67708696674",
    "id": "4f0637c7-7a3e-43f7-a15b-6f2b0bebbcc0",
    "distance": "17.5 km"
  }
]
```

**O sistema calcula a distância entre o endereço do motorista e o endereço do início da viagem e a viagem é listada desde que a cidade de início da viagem seja a mesma que a cidade que o motorista está no momento.**

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

Incluir a Key em /src/travels/travel.service.ts no método **getRoutes**.

`GOOGLE_DIRECTIONS_API_KEY`

## Autor

- [@Diego Wendt](https://www.github.com/diego-wendt)

Instalação

Para rodar esta API localmente, siga os passos abaixo:

1. Clone o Repositório

Abra o terminal (ou prompt de comando) e execute o seguinte comando para clonar o repositório:

bash

Copiar código

git clone <URL do repositório>
Depois, entre no diretório do projeto:

bash

Copiar código 

cd AgustoWheels

2. Instale as Dependências

Agora, instale todas as dependências do projeto utilizando o comando:

bash

Copiar código

npm install

3. Crie um Arquivo .env

Na raiz do projeto, crie um arquivo chamado .env e adicione a variável de ambiente MONGO_URI para conectar ao seu banco de dados MongoDB:

bash

Copiar código

MONGO_URI=mongodb://localhost:27017/agusto_wheels
Substitua localhost:27017 pela URL do seu MongoDB, se estiver utilizando um banco de dados em nuvem (como o MongoDB Atlas).

4. Inicie a Aplicação

Com tudo configurado, inicie a aplicação executando o seguinte comando no terminal:

bash

Copiar código

node index.js

                  Ou, se preferir utilizar o nodemon para reiniciar automaticamente o servidor durante o desenvolvimento, use:

bash

Copiar código

npm run dev
A API estará disponível em http://localhost:5000.

5. Teste a API

Agora, você pode testar os endpoints da API utilizando o Postman.

Dependências

express: Framework para construção da API.
mongoose: ODM para interação com o MongoDB.
dotenv: Carrega variáveis de ambiente do arquivo .env.
cors: Permite requisições de diferentes origens.

Endpoints

1. Rota de Teste

GET /
Descrição: Retorna uma mensagem de boas-vindas.
Resposta:
json

Copiar código

"Bem-vindo à API da Agusto Wheels!"

2. Criar uma Nova Roda

POST /wheels
Descrição: Adiciona uma nova roda.
Corpo da Requisição:
json

Copiar código

{
  "diameter": 16,
  "width": 7,
  "boltPattern": "5x100",
  "color": "Prata + Polished + detalhes cromados",
  "offset": 35,
  "insideSpace": "430",
  "backsideSpace": "156",
  "frontSpace": "84",
  "weight": "10",
  "cb": 73.1
}

Resposta:
201 Created: Roda criada com sucesso.
json

Copiar código

{
  "_id": "672a9d0cdf65134913039070",
  "diameter": 16,
  "width": 7,
  "boltPattern": "5x100",
  "color": "Prata",
  "offset": 35,
  "insideSpace": "430mm",
  "backsideSpace": "156mm",
  "frontSpace": "84mm",
  "weight": "10kg",
  "cb": 73.1
}

3. Obter as informações de todas as Rodas

GET /wheels
Descrição: Retorna todas as rodas cadastradas.
Resposta:
json

Copiar código
[
  {
    "_id": "672a9d0cdf65134913039070",
    "diameter": 16,
    "width": 7,
    "boltPattern": "5x100",
    "color": "Prata",
    "offset": 35,
    "insideSpace": "430mm",
    "backsideSpace": "156mm",
    "frontSpace": "84mm",
    "weight": "10kg",
    "cb": 73.1
  },
  ...
]

4. Obter Roda por ID

GET /wheels/:id
Descrição: Retorna uma roda específica pelo ID.
Parâmetros:
id: O ID da roda.

Resposta:
json

Copiar código

{
  "_id": "672a9d0cdf65134913039070",
  "diameter": 16,
  "width": 7,
  "boltPattern": "5x100",
  "color": "Prata",
  "offset": 35,
  "insideSpace": "430mm",
  "backsideSpace": "156mm",
  "frontSpace": "84mm",
  "weight": "10kg",
  "cb": 73.1
}

5. Atualizar uma Roda

PUT /wheels/:id
Descrição: Atualiza uma roda existente.
Corpo da Requisição:
json

Copiar código

{
  "diameter": 17,
  "width": 8,
  "boltPattern": "5x120",
  "color": "Preto Fosco",
  "offset": 40,
  "insideSpace": "450mm",
  "backsideSpace": "160mm",
  "frontSpace": "90mm",
  "weight": "12kg",
  "cb": 74.5
}

Resposta:
200 OK: Roda atualizada com sucesso.

6. Deletar uma Roda

DELETE /wheels/:id

Descrição: Deleta uma roda pelo ID.

Resposta:
204 No Content: Roda deletada com sucesso.

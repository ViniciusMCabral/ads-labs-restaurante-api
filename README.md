# 🍽️ ads-labs-restaurante-api

Esta é uma API RESTful desenvolvida em **Node.js** para gerenciar um sistema de restaurante, com funcionalidades para **clientes**, **pratos** e **pedidos**. A API permite realizar operações **CRUD** e gerar relatórios.

---

## 🚀 Tecnologias

- Node.js
- Express
- Sequelize
- PostgreSQL

---
## 🔧 Como Instalar e Rodar o Projeto

1.  **Clone o repositório**
    ```sh
    git clone [https://github.com/ViniciusMCabral/ads-labs-restaurante-api.git](https://github.com/ViniciusMCabral/ads-labs-restaurante-api.git)
    ```

2.  **Acesse a pasta do projeto**
    ```sh
    cd ads-labs-restaurante-api
    ```

3.  **Instale as dependências**
    Este comando irá instalar todos os pacotes necessários para o projeto, como Express e Sequelize.
    ```sh
    npm install
    ````

4.  **Inicie o Servidor**
    Inicie a API:
    ```sh
    node src/app.js
    ```
---
## 📖 Documentação da API

Aqui estão os detalhes de todos os endpoints disponíveis na `ads-labs-restaurante-api`.

### 👤 Cliente

| Método | Endpoint                             | Descrição                                         |
| :----- | :----------------------------------- | :------------------------------------------------ |
| `POST`   | `/api/clientes`                      | Cria um novo cliente.                             |
| `GET`    | `/api/clientes`                      | Lista todos os clientes.                          |
| `PUT`    | `/api/clientes/{id}`                 | Atualiza um cliente existente pelo ID.            |
| `DELETE` | `/api/clientes/{id}`                 | Remove um cliente pelo ID.                        |
| `GET`    | `/api/clientes/com-mais-pedidos`     | Lista os 5 clientes com mais pedidos.             |
| `GET`    | `/api/clientes/com-mais-gastos`      | Lista os 5 clientes que mais gastaram.            |

---

#### Detalhes dos Endpoints de Cliente

<details>
<summary><strong>POST /api/clientes</strong> - Criar Cliente</summary>

-   **Body da Requisição:**
    ```json
    {
      "nome": "string",
      "email": "string",
      "cpf": "string"
    }
    ```
-   **Regras e Retornos:**
    -   Retorna o cliente criado com seu ID (`201 Created`).
    -   Todos os campos são obrigatórios.
    -   O campo `cpf` deve ter o formato `XXX.XXX.XXX-XX` (o uso de `.` ou `-` é opcional).

</details>

<details>
<summary><strong>GET /api/clientes</strong> - Listar Clientes</summary>

-   **Regras e Retornos:**
    -   Retorna uma lista com todos os clientes cadastrados (`200 OK`).
    -   Retorna `404 Not Found` se não existir nenhum cliente.

</details>

<details>
<summary><strong>PUT /api/clientes/{id}</strong> - Atualizar Cliente</summary>

-   **Body da Requisição:**
    ```json
    {
      "nome": "string",
      "email": "string",
      "cpf": "string"
    }
    ```
-   **Regras e Retornos:**
    -   Atualiza todos os campos do cliente especificado pelo `{id}`.
    -   Retorna o objeto do cliente com os dados atualizados (`200 OK`).
    -   Retorna `404 Not Found` se o cliente não existir.

</details>

<details>
<summary><strong>DELETE /api/clientes/{id}</strong> - Remover Cliente</summary>

-   **Regras e Retornos:**
    -   Remove o cliente definitivamente do banco de dados.
    -   Retorna uma mensagem de sucesso (`200 OK`).
    -   Retorna `404 Not Found` se o cliente não existir.

</details>

<details>
<summary><strong>GET /api/clientes/com-mais-pedidos</strong> - Clientes com Mais Pedidos</summary>

-   **Regras e Retornos:**
    -   Retorna uma lista ordenada com os 5 clientes que têm a maior quantidade de pedidos.
    -   Apenas clientes com pelo menos 1 pedido são considerados.
    -   Retorna a lista (`200 OK`).

</details>

<details>
<summary><strong>GET /api/clientes/com-mais-gastos</strong> - Clientes com Maiores Gastos</summary>

-   **Regras e Retornos:**
    -   Retorna uma lista ordenada com os 5 clientes que têm o maior valor gasto total.
    -   Apenas clientes com pelo menos 1 pedido são considerados.
    -   Retorna a lista (`200 OK`).

</details>

### 🍝 Prato

| Método | Endpoint                         | Descrição                                              |
| :----- | :------------------------------- | :----------------------------------------------------- |
| `POST`   | `/api/pratos`                    | Cria um novo prato.                                    |
| `GET`    | `/api/pratos`                    | Lista todos os pratos.                                 |
| `PUT`    | `/api/pratos/{id}`               | Atualiza um prato existente pelo ID.                   |
| `DELETE` | `/api/pratos/{id}`               | Remove um prato pelo ID.                               |
| `GET`    | `/api/pratos/com-mais-pedidos`   | Lista os pratos mais pedidos.                          |

---

#### Detalhes dos Endpoints de Prato

<details>
<summary><strong>POST /api/pratos</strong> - Criar Prato</summary>

-   **Body da Requisição:**
    ```json
    {
      "nome": "string",
      "preco": "number"
    }
    ```
-   **Regras e Retornos:**
    -   Retorna o prato criado com seu ID (`201 Created`).
    -   Todos os campos são obrigatórios.
    -   O campo `preco` deve ser um número positivo.

</details>

<details>
<summary><strong>GET /api/pratos</strong> - Listar Pratos</summary>

-   **Regras e Retornos:**
    -   Retorna uma lista com todos os pratos do cardápio (`200 OK`).
    -   Retorna `404 Not Found` se não existir nenhum prato.

</details>

<details>
<summary><strong>PUT /api/pratos/{id}</strong> - Atualizar Prato</summary>

-   **Body da Requisição:**
    ```json
    {
      "nome": "string",
      "preco": "number"
    }
    ```
-   **Regras e Retornos:**
    -   Atualiza os dados do prato especificado pelo `{id}`.
    -   Retorna o objeto do prato com os dados atualizados (`200 OK`).
    -   Retorna `404 Not Found` se o prato não existir.

</details>

<details>
<summary><strong>DELETE /api/pratos/{id}</strong> - Remover Prato</summary>

-   **Regras e Retornos:**
    -   Remove o prato definitivamente.
    -   Retorna uma mensagem de sucesso (`200 OK`).
    -   Retorna `404 Not Found` se o prato não existir.

</details>

<details>
<summary><strong>GET /api/pratos/com-mais-pedidos</strong> - Pratos Mais Pedidos</summary>

-   **Regras e Retornos:**
    -   Retorna uma lista de pratos ordenada pela quantidade de vezes que foram pedidos (`200 OK`).
    -   Retorna `404 Not Found` se não existir nenhum pedido registrado no sistema.

</details>


### 🧾 Pedido

| Método | Endpoint          | Descrição                         |
| :----- | :---------------- | :-------------------------------- |
| `POST`   | `/api/pedidos`    | Cria um novo pedido.              |
| `GET`    | `/api/pedidos`    | Lista todos os pedidos.           |
| `PUT`    | `/api/pedidos/{id}` | Atualiza um pedido existente pelo ID. |
| `DELETE` | `/api/pedidos/{id}` | Remove um pedido pelo ID.         |

---

#### Detalhes dos Endpoints de Pedido

<details>
<summary><strong>POST /api/pedidos</strong> - Criar Pedido</summary>

-   **Body da Requisição:**
    ```json
    {
      "clienteId": "string",
      "pratos": [
        {
          "pratoId": "string",
          "quantidade": "number"
        }
      ]
    }
    ```
-   **Regras e Retornos:**
    -   Retorna o pedido criado com seu ID (`201 Created`).
    -   `clienteId` deve ser um ID válido de um cliente existente.
    -   A lista `pratos` deve conter pelo menos um item.
    -   Cada `pratoId` deve ser um ID válido de um prato existente.
    -   `quantidade` deve ser um número inteiro e positivo.

</details>

<details>
<summary><strong>GET /api/pedidos</strong> - Listar Pedidos</summary>

-   **Regras e Retornos:**
    -   Retorna uma lista com todos os pedidos (`200 OK`).
    -   Retorna `404 Not Found` se não existir nenhum pedido.

</details>

<details>
<summary><strong>PUT /api/pedidos/{id}</strong> - Atualizar Pedido</summary>

-   **Body da Requisição:**
    ```json
    {
      "clienteId": "string",
      "pratos": [
        {
          "pratoId": "string",
          "quantidade": "number"
        }
      ]
    }
    ```
-   **Regras e Retornos:**
    -   Atualiza os dados do pedido especificado pelo `{id}`.
    -   Retorna o objeto do pedido com os dados atualizados (`200 OK`).
    -   Retorna `404 Not Found` se o pedido não existir.

</details>

<details>
<summary><strong>DELETE /api/pedidos/{id}</strong> - Remover Pedido</summary>

-   **Regras e Retornos:**
    -   Remove o pedido definitivamente.
    -   Retorna uma mensagem de sucesso (`200 OK`).
    -   Retorna `404 Not Found` se o pedido não existir.

</details>

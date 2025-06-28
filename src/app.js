require("dotenv").config();
const express = require("express");

const app = express();

require("./database/database");

const clienteRouter = require("./routes/ClienteRoutes");
const pratoRouter = require("./routes/PratoRoutes");
const pedidoRouter = require("./routes/PedidoRoutes");

app.use(express.json());

app.use("/api/clientes", clienteRouter);
app.use("/api/pratos", pratoRouter);
app.use("/api/pedidos", pedidoRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
const service = require("../services/PedidoService");

function criar(req, res) {
    service.criar(req.body)
        .then((pedidoCriado) => {
            return res.status(201).send({
                message: "Novo pedido criado",
                pedido: pedidoCriado
            });
        })
        .catch((error) => {
            return res.status(500).send({ message: error });
        });
}

function listar(req, res) {
    service.listar()
        .then((pedidos) => {
            return res.send({ dados: pedidos });
        })
        .catch((error) => {
            return res.status(500).send({ message: error });
        });
}

function atualizar(req, res) {
    service.atualizar(req.params.id, req.body)
        .then((pedidoEditado) => {
            if (!pedidoEditado)
                return res.status(404).send({ message: "Pedido não encontrado" });

            return res.send({
                message: "Pedido atualizado",
                pedido: pedidoEditado
            });
        })
        .catch((error) => {
            return res.status(500).send({ message: error });
        });
}

function remover(req, res) {
    service.remover(req.params.id)
        .then((pedidoRemovido) => {
            if (!pedidoRemovido)
                return res.status(404).send({ message: "Pedido não encontrado" });

            return res.send({
                message: "Pedido removido",
                pedido: pedidoRemovido
            });
        })
        .catch((error) => {
            return res.status(500).send({ message: error });
        });
}

module.exports = { criar, listar, atualizar, remover };

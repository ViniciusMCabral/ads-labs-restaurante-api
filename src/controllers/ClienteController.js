const service = require("../services/ClienteService")

function criar(req, res) {
    service.criar(req.body)
        .then((clienteCriado) => {
            return res.status(201).send({
                message: "Novo cliente criado",
                cliente: clienteCriado
            })
        })
        .catch((error) => {
            return res.status(500).send({ message: error });
        });
}

function listar(req, res) {
    service.listar(req.query)
        .then((clientes) => {
            return res.send({ dados: clientes })
        })
        .catch((error) => {
            return res.status(500).send({ message: error })
        })
}

function atualizar(req, res) {
    service.atualizar(req.params.id, req.body)
        .then((clienteEditado) => {
            console.log(clienteEditado)
            if(!clienteEditado)
                return res.send({ message: "Cliente não encontrado"})

            return res.send({
                message: "Cliente atualizado",
                cliente: clienteEditado
            })
        })
        .catch((error) => {
            return res.status(500).send({ message: error })
        })
}

function remover(req, res) {
    service.remover(req.params.id)
        .then((clienteRemovido) => {
            if(!clienteRemovido)
                return res.send({ message: "Cliente não encontrado"})

            return res.send({
                message: "Cliente removido",
                cliente: clienteRemovido
            })
        })
        .catch((error) => {
            return res.status(500).send({ message: error })
        })
}

function clientesComMaisPedidos(req, res) {
    service.clientesComMaisPedidos()
        .then((clientes) => {
            return res.send({ dados: clientes })
        })
        .catch((error) => {
            return res.status(500).send({ message: error });
        });
}

function clientesComMaisGastos(req, res) {
    service.clientesComMaisGastos()
        .then((clientes) => {
            return res.send({ dados: clientes })
        })
        .catch((error) => {
            return res.status(500).send({ message: error });
        });
}

module.exports = { listar, criar, atualizar, remover, clientesComMaisPedidos, clientesComMaisGastos }
const service = require("../services/PratoService");

function criar(req, res) {
    service.criar(req.body)
        .then((pratoCriado) => {
            return res.status(201).send({
                message: "Novo prato criado",
                prato: pratoCriado
            })
        })
        .catch((error) => {
            return res.status(500).send({ message: error });
        });
}

function listar(req, res) {
    service.listar(req.query)
        .then((pratos) => {
            return res.send({ dados: pratos })
        })
        .catch((error) => {
            return res.status(500).send({ message: error });
        });
}

function atualizar(req, res) {
    service.atualizar(req.params.id, req.body)
        .then((pratoEditado) => {
            if (!pratoEditado)
                return res.status(404).send({ message: "Prato não encontrado" })

            return res.send({
                message: "Prato atualizado",
                prato: pratoEditado
            })
        })
        .catch((error) => {
            return res.status(500).send({ message: error });
        });
}

function remover(req, res) {
    service.remover(req.params.id)
        .then((pratoRemovido) => {
            if (!pratoRemovido)
                return res.status(404).send({ message: "Prato não encontrado" })

            return res.send({
                message: "Prato removido",
                prato: pratoRemovido
            })
        })
        .catch((error) => {
            return res.status(500).send({ message: error });
        });
}

function pratosComMaisPedidos(req, res) {
    service.pratosComMaisPedidos()
        .then((pratos) => {
            return res.send({ dados: pratos })
        })
        .catch((error) => {
            return res.status(500).send({ message: error });
        });
}

module.exports = { listar, criar, atualizar, remover, pratosComMaisPedidos }
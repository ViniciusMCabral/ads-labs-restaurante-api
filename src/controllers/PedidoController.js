const service = require("../services/PedidoService");

async function criar(req, res) {
    try {
        const pedidoCriado = await service.criar(req.body);

        return res.status(201).json({
            message: "Novo pedido criado",
            pedido: pedidoCriado
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function listar(req, res) {
    try {
        const pedidos = await service.listar();
        return res.json({ dados: pedidos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function atualizar(req, res) {
    try {
        const { id } = req.params;
        const pedidoEditado = await service.atualizar(id, req.body);

        if (!pedidoEditado) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }

        return res.json({
            message: "Pedido atualizado",
            pedido: pedidoEditado
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function remover(req, res) {
    try {
        const { id } = req.params;
        const foiRemovido = await service.remover(id);

        if (!foiRemovido) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }

        return res.status(200).json({ message: "Pedido removido com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { criar, listar, atualizar, remover };
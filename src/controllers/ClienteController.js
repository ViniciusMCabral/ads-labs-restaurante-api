const service = require("../services/ClienteService");

async function criar(req, res) {
    try {
        const clienteCriado = await service.criar(req.body);

        return res.status(201).json({
            message: "Novo cliente criado",
            cliente: clienteCriado
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function listar(req, res) {
    try {
        const clientes = await service.listar(req.query);
        return res.json({ dados: clientes }); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function atualizar(req, res) {
    try {
        const { id } = req.params;
        const clienteAtualizado = await service.atualizar(id, req.body);

        if (!clienteAtualizado) {
            return res.status(404).json({ message: "Cliente não encontrado" });
        }

        return res.json({
            message: "Cliente atualizado",
            cliente: clienteAtualizado
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function remover(req, res) {
    try {
        const { id } = req.params;
        const clienteRemovido = await service.remover(id);

        if (!clienteRemovido) {
            return res.status(404).json({ message: "Cliente não encontrado" });
        }

        return res.status(200).json({ message: "Cliente removido com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function clientesComMaisPedidos(req, res) {
    try {
        const clientes = await service.clientesComMaisPedidos();
        return res.json({ dados: clientes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function clientesComMaisGastos(req, res) {
    try {
        const clientes = await service.clientesComMaisGastos();
        return res.json({ dados: clientes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { criar, listar, atualizar, remover, clientesComMaisPedidos, clientesComMaisGastos };
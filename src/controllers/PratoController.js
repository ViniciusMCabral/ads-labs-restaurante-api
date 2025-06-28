const service = require("../services/PratoService");

async function criar(req, res) {
    try {
        const pratoCriado = await service.criar(req.body);
        return res.status(201).json({
            message: "Novo prato criado",
            prato: pratoCriado
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function listar(req, res) {
    try {
        const pratos = await service.listar(req.query);
        return res.json({ dados: pratos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function atualizar(req, res) {
    try {
        const { id } = req.params;
        const pratoEditado = await service.atualizar(id, req.body);

        if (!pratoEditado) {
            return res.status(404).json({ message: "Prato não encontrado" });
        }

        return res.json({
            message: "Prato atualizado",
            prato: pratoEditado
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
            return res.status(404).json({ message: "Prato não encontrado" });
        }

        return res.status(200).json({ message: "Prato removido com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function pratosComMaisPedidos(req, res) {
    try {
        const pratos = await service.pratosComMaisPedidos();
        return res.json({ dados: pratos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { listar, criar, atualizar, remover, pratosComMaisPedidos };
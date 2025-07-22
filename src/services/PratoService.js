const { sequelize, Prato, Pedido, PedidoPrato } = require("../database/database");

async function criar(dados) {
    const prato = await Prato.create(dados);
    return prato;
}

async function listar() {
    return await Prato.findAll();
}

async function atualizar(id, dados) {
    const prato = await Prato.findByPk(id);

    if (!prato) {
        return null;
    }

    await prato.update(dados);
    return prato;
}

async function remover(id) {
    const pratoEmUso = await PedidoPrato.findOne({ where: { pratoId: id } });

    if (pratoEmUso) {
        throw new Error("Este prato não pode ser removido, pois faz parte de um pedido já realizado.");
    }

    const prato = await Prato.findByPk(id);

    if (prato) {
        await prato.destroy();
    }
    return prato;
}

async function pratosOrdenadosPorQuantidade() {
    const pratos = await Prato.findAll({
        include: [{
            model: Pedido,
            as: 'pedidos', 
            attributes: ["id"], 
            through: { attributes: ["quantidade"] }
        }]
    });

    const resultado = pratos.map(prato => {
        const totalVendido = (prato.pedidos || []).reduce((soma, pedido) => {
            return soma + pedido.PedidoPrato.quantidade;
        }, 0);

        return {
            id: prato.id,
            nome: prato.nome,
            preco: prato.preco,
            totalVendido
        };
    });

    return resultado.sort((a, b) => b.totalVendido - a.totalVendido);
}

module.exports = { criar, listar, atualizar, remover, pratosOrdenadosPorQuantidade };
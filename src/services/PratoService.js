const Prato = require("../models/Prato");
const Pedido = require("../models/Pedido");

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
    const prato = await Prato.findByPk(id);

    if (!prato) {
        return null;
    }

    await prato.destroy();
    return prato;
}

async function pratosOrdenadosPorQuantidade() {
    const pratos = await Prato.findAll({
        include: [{
            model: Pedido,
            through: { attributes: ["quantidade"] }
        }]
    });

    const resultado = pratos.map(prato => {
        const totalPedidos = prato.Pedidos.reduce((soma, pedido) => {
            return soma + pedido.PedidoPrato.quantidade;
        }, 0);

        return {
            id: prato.id,
            nome: prato.nome,
            preco: prato.preco,
            totalPedidos
        };
    });

    return resultado.sort((a, b) => b.totalPedidos - a.totalPedidos);
}

module.exports = { criar, listar, atualizar, remover, pratosOrdenadosPorQuantidade };

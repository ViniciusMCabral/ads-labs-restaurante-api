const Pedido = require("../models/Pedido");
const Cliente = require("../models/Cliente");
const Prato = require("../models/Prato");
const PedidoPrato = require("../models/PedidoPrato");
const { Sequelize } = require("sequelize");

async function criar(dados) {
    const { clienteId, itens } = dados;

    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
        return null;
    }

    const pedido = await Pedido.create({ clienteId });

    for (const item of itens) {
        const prato = await Prato.findByPk(item.pratoId);
        if (!prato) {
            return null;
        }

        await PedidoPrato.create({
            pedidoId: pedido.id,
            pratoId: prato.id,
            quantidade: item.quantidade || 1,
            preco: prato.preco,
        });
    }

    return pedido;
}

async function listar() {
    return await Pedido.findAll({
        include: [
            { model: Cliente, attributes: ['id', 'nome', 'cpf'] },
            { 
                model: Prato,
                attributes: ['id', 'nome', 'preco'],
                through: {
                    attributes: ['quantidade', 'preco']
                }
            }
        ]
    });
}

async function atualizar(id, novosDados) {
    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
        return null;
    }

    const { clienteId, itens } = novosDados;

    if (clienteId) {
        const cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            return null;
        }

        pedido.clienteId = clienteId;
    }

    await pedido.save();

    if (itens) {
        await PedidoPrato.destroy({ where: { pedidoId: pedido.id } });

        for (const item of itens) {
            const prato = await Prato.findByPk(item.pratoId);

            if (!prato) {
                return null;
            }
            
            await PedidoPrato.create({
                pedidoId: pedido.id,
                pratoId: prato.id,
                quantidade: item.quantidade || 1,
                preco: prato.preco
            });
        }
    }

    return pedido;
}


async function remover(id) {
    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
        return null;
    }

    await PedidoPrato.destroy({ where: { pedidoId: id } });
    await pedido.destroy();
    return pedido;
}

module.exports = { criar, listar, atualizar, remover };

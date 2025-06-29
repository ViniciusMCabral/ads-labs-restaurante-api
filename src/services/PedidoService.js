const { sequelize, Pedido, Cliente, Prato, PedidoPrato } = require("../database/database");

async function criar(dados) {
    const t = await sequelize.transaction(); 

    try {
        const { clienteId, pratos: itens } = dados;

        const cliente = await Cliente.findByPk(clienteId, { transaction: t });
        if (!cliente) {
            throw new Error("Cliente não encontrado");
        }

        const pedido = await Pedido.create({ clienteId }, { transaction: t });

        for (const item of itens) {
            const prato = await Prato.findByPk(item.pratoId, { transaction: t });
            if (!prato) {
                throw new Error(`Prato com ID ${item.pratoId} não encontrado`);
            }

            await pedido.addPrato(prato, { 
                through: {
                    quantidade: item.quantidade || 1,
                    preco: prato.preco 
                },
                transaction: t 
            });
        }

        await t.commit();

        return await Pedido.findByPk(pedido.id, {
            include: [{ model: Cliente, as: 'cliente' }, { model: Prato, as: 'pratos' }]
        });

    } catch (error) {
        await t.rollback();
        throw error;
    }
}

async function listar() {
    return await Pedido.findAll({
        include: [
            { model: Cliente, as: 'cliente', attributes: ['id', 'nome', 'cpf'] },
            { 
                model: Prato,
                as: 'pratos',
                attributes: ['id', 'nome', 'preco'],
                through: {
                    attributes: ['quantidade', 'preco']
                }
            }
        ]
    });
}

async function atualizar(id, novosDados) {
    const t = await sequelize.transaction();

    try {
        const pedido = await Pedido.findByPk(id, { transaction: t });
        if (!pedido) {
            await t.rollback();
            return null;
        }

        const { clienteId, pratos: itens } = novosDados;

        if (clienteId && pedido.clienteId !== clienteId) {
             const cliente = await Cliente.findByPk(clienteId, { transaction: t });
             if (!cliente) {
                await t.rollback();
                return null;
             }
             pedido.clienteId = clienteId;
             await pedido.save({ transaction: t });
        }
        
        if (itens && Array.isArray(itens)) {
            await pedido.setPratos([], { transaction: t });

            for (const item of itens) {
                const prato = await Prato.findByPk(item.pratoId, { transaction: t });
                if (!prato) {
                    await t.rollback();
                    return null;
                }
                await pedido.addPrato(prato, {
                    through: {
                        quantidade: item.quantidade || 1,
                        preco: prato.preco
                    },
                    transaction: t
                });
            }
        }
        
        await t.commit();
        
        return await Pedido.findByPk(id, {
            include: [{ model: Cliente, as: 'cliente' }, { model: Prato, as: 'pratos' }]
        });

    } catch(error) {
        await t.rollback();
        throw error;
    }
}

async function remover(id) {

    const t = await sequelize.transaction();
    try {
        const pedido = await Pedido.findByPk(id, { transaction: t });
        if (!pedido) {
            await t.commit();
            return null;
        }

        await pedido.setPratos([], { transaction: t });
        await pedido.destroy({ transaction: t });
        
        await t.commit();
        return pedido; 
    } catch(error) {
        await t.rollback();
        throw error;
    }
}

module.exports = { criar, listar, atualizar, remover };
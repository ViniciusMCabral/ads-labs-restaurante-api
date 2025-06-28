const { Cliente, Pedido, Prato } = require("../database/database");

async function criar(dados) {
    const cliente = await Cliente.create(dados);
    return cliente;
}

async function listar() {
    return await Cliente.findAll();
}

async function atualizar(id, dados) {
    const cliente = await Cliente.findByPk(id);
    
    if (!cliente) {
        return null;
    }

    await cliente.update(dados);
    return cliente;
}

async function remover(id) {
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        return null;
    }

    await cliente.destroy();
    return cliente;
}

async function clientesComMaisPedidos() {
    const clientes = await Cliente.findAll({
        include: [{ model: Pedido, as: 'pedidos' }] 
    });

    const resultado = clientes.map(cliente => ({
        id: cliente.id,
        nome: cliente.nome,
        totalPedidos: (cliente.pedidos || []).length 
    }));

    return resultado
        .sort((a, b) => b.totalPedidos - a.totalPedidos)
        .slice(0, 5);
}

async function clientesComMaisGastos() {
    const clientes = await Cliente.findAll({
        include: [{
            model: Pedido,
            as: "pedidos", 
            include: [{
                model: Prato,
                as: "pratos",
                through: { attributes: ["quantidade", "preco"] }
            }]
        }]
    });

    const resultado = clientes.map(cliente => {
        let totalGasto = 0;

        cliente.pedidos.forEach(pedido => {
            (pedido.pratos || []).forEach(prato => {
                const preco = prato.PedidoPrato?.preco || 0;
                const quantidade = prato.PedidoPrato?.quantidade || 0;
                totalGasto += preco * quantidade;
            });
        });

        return {
            id: cliente.id,
            nome: cliente.nome,
            totalGasto
        };
    });

    return resultado
        .sort((a, b) => b.totalGasto - a.totalGasto)
        .slice(0, 5);
}


module.exports = { criar, listar, atualizar, remover, clientesComMaisPedidos, clientesComMaisGastos };
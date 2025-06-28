const express = require("express");
const controller = require("../controllers/ClienteController");
const middlewares = require("../middlewares/Middlewares");

const router = express.Router();

router.post("/", middlewares.checkCPF, controller.criar);
router.get("/", controller.listar);
router.put("/:id", middlewares.checkCPF, controller.atualizar);
router.delete("/:id", controller.remover);
router.get("/com-mais-pedidos", controller.clientesComMaisPedidos);
router.get("/com-mais-gastos", controller.clientesComMaisGastos);

module.exports = router;

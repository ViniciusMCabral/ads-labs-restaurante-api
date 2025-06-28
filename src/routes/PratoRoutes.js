const express = require("express");
const controller = require("../controllers/PratoController");
const middlewares = require("../middlewares/Middlewares");

const router = express.Router();

router.post("/", middlewares.checkNomePrato, controller.criar);
router.get("/", controller.listar);
router.put("/:id", middlewares.checkNomePrato, controller.atualizar);
router.delete("/:id", controller.remover);
router.get("/com-mais-pedidos", controller.pratosComMaisPedidos);

module.exports = router;

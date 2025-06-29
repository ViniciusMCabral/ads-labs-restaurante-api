const express = require("express");
const controller = require("../controllers/PratoController");
const middlewares = require("../middlewares/middlewares");

const router = express.Router();

router.post("/", middlewares.checkNomePrato, controller.criar);
router.get("/", controller.listar);
router.put("/:id", middlewares.checkNomePrato, controller.atualizar);
router.delete("/:id", controller.remover);
router.get("/com-mais-pedidos", controller.pratosOrdenadosPorQuantidade);

module.exports = router;

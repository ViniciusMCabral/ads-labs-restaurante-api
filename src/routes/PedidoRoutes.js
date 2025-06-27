const express = require("express");
const controller = require("../controllers/PedidoController");

const router = express.Router();

router.post("/", controller.criar);
router.get("/", controller.listar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.remover);

module.exports = router;

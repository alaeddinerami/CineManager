const express = require("express");
const router = express.Router();
const SeanceController = require("../controllers/Seance.controller");

router.get("/seances", SeanceController.getAll);
router.get("/seances/:id", SeanceController.getSeanceById);
router.post("/seances", SeanceController.create);
router.put("/seances/:id", SeanceController.update);
router.delete("/seances/:id", SeanceController.delete);

module.exports = router;

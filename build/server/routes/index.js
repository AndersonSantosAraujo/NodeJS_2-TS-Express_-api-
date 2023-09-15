"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers/");
const router = (0, express_1.Router)();
exports.router = router;
// Routes ->
// Index ->
router.get("/", (_, res) => {
    return res.send({
        title: "NodeJS (Typescript + Express) API",
        version: "0.0.1",
    });
});
// <- Index
// Cities ->
router.post("/cities", controllers_1.citiesController.createValidation, controllers_1.citiesController.create);
router.get("/cities", controllers_1.citiesController.getAllValidation, controllers_1.citiesController.getAll);
router.get("/cities/:id", controllers_1.citiesController.getByIdValidation, controllers_1.citiesController.getById);
router.put("/cities/:id", controllers_1.citiesController.updateByIdValidation, controllers_1.citiesController.updateById);
router.delete("/cities/:id", controllers_1.citiesController.deleteByIdValidation, controllers_1.citiesController.deleteById);

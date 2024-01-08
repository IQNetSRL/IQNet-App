const { Router } = require("express");
const deleteArea = require("../handlers/Areas/deleteArea.js");
const getAreas = require("../handlers/Areas/getAreas.js");
const postArea = require("../handlers/Areas/postArea.js");
const putArea = require("../handlers/Areas/putArea.js");
const deleteCategory = require("../handlers/Categories/deleteCategory.js");
const getCategories = require("../handlers/Categories/getCategories.js");
const postCategory = require("../handlers/Categories/postCategory.js");
const putCategory = require("../handlers/Categories/putCategory.js");
const deleteStatus = require("../handlers/Status/deleteStatus.js");
const getStatus = require("../handlers/Status/getStatus.js");
const postStatus = require("../handlers/Status/postStatus.js");
const putStatus = require("../handlers/Status/putStatus.js");
const deletePriority = require("../handlers/Priorities/deletePriority.js");
const getPriorities = require("../handlers/Priorities/getPriorities.js");
const postPriority = require("../handlers/Priorities/postPriority.js");
const putPriority = require("../handlers/Priorities/putPriority.js");

const valuesRouter = Router();

valuesRouter.post("/areas", postArea);

valuesRouter.get("/areas", getAreas);

valuesRouter.post("/categories", postCategory);

valuesRouter.get("/categories", getCategories);

valuesRouter.post("/status", postStatus);

valuesRouter.get("/status", getStatus);

valuesRouter.post("/priorities", postPriority);

valuesRouter.get("/priorities", getPriorities);

valuesRouter.delete("/areas/:id", deleteArea);

valuesRouter.put("/areas/:id", putArea);

valuesRouter.delete("/categories/:id", deleteCategory);

valuesRouter.put("/categories/:id", putCategory);

valuesRouter.delete("/status/:id", deleteStatus);

valuesRouter.put("/status/:id", putStatus);

valuesRouter.delete("/priorities/:id", deletePriority);

valuesRouter.put("/priorities/:id", putPriority);

module.exports = valuesRouter;

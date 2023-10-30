const { Router } = require("express");
const deleteArea = require("../handlers/Areas/deleteArea.js");
const getAreas = require("../handlers/Areas/getAreas.js");
const postArea = require("../handlers/Areas/postArea.js");
const deleteCategory = require("../handlers/Categories/deleteCategory.js");
const getCategories = require("../handlers/Categories/getCategories.js");
const postCategory = require("../handlers/Categories/postCategory.js");
const deleteStatus = require("../handlers/Status/deleteStatus.js");
const getStatus = require("../handlers/Status/getStatus.js");
const postStatus = require("../handlers/Status/postStatus.js");
const deletePriority = require("../handlers/Priorities/deletePriority.js");
const getPriorities = require("../handlers/Priorities/getPriorities.js");
const postPriority = require("../handlers/Priorities/postPriority.js");

const valuesRouter = Router();

valuesRouter.get("/area", deleteArea);

valuesRouter.post("/area", getAreas);

valuesRouter.delete("/area:id", postArea);

valuesRouter.get("/categories", deleteCategory);

valuesRouter.post("/categories", getCategories);

valuesRouter.delete("/categories:id", postCategory);

valuesRouter.get("/status", deleteStatus);

valuesRouter.post("/status", getStatus);

valuesRouter.delete("/status:id", postStatus);

valuesRouter.get("/priorities", deletePriority);

valuesRouter.post("/priorities", getPriorities);

valuesRouter.delete("/priorities:id", postPriority);

module.exports = usersRouter;
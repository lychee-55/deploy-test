const express = require("express")
const controller = require("../controller/Cvisitor")
const router = express.Router()

// 기본주소

// GET - "/" => localhost:PORT/
router.get("/", controller.main)

// GET - "/visitors" => localhost:PORT/visitors
router.get('/visitors', controller.getVisitors)

// GET - "/visitor/:id" = > localhost:PORT/visitor/:id
router.get("/visitor/:id",controller.getVisitor)
// post
router.post("/visitor",controller.postVisitor)
// delete
router.delete("/visitor",controller.deleteVisitor)
// patch
router.patch("/visitor",controller.patchVisitor)
module.exports = router
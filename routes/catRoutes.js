const express = require("express")
const router = express.Router()
const multer = require("multer")

const auth = require("../middleware/authMiddleware")
const catController = require("../controllers/catController")


const upload = multer({ dest: "uploads/" })


router.post("/", auth, upload.single("image"), catController.createCat)
router.get("/", catController.getCats)
router.get("/:id", catController.getSingleCat)
router.put("/:id", auth, upload.single("image"), catController.updateCat)
router.delete("/:id", auth, catController.deleteCat)

module.exports = router
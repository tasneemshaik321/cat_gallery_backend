const Cat = require("../models/Cat")
const cloudinary = require("../config/cloudinary")

// CREATE CAT
exports.createCat = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" })
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "cats"
    })

    const cat = await Cat.create({
      name: req.body.name,
      breed: req.body.breed,
      image: result.secure_url,
      createdBy: req.user
    })

    res.json(cat)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

// GET ALL CATS
exports.getCats = async (req, res) => {
  try {
    const cats = await Cat.find()
    res.json(cats)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET SINGLE CAT
exports.getSingleCat = async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id)
    res.json(cat)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// UPDATE CAT
exports.updateCat = async (req, res) => {
  try {
    let image

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "cats"
      })
      image = result.secure_url
    }

    const cat = await Cat.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        breed: req.body.breed,
        ...(image && { image })
      },
      { new: true }
    )

    res.json(cat)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// DELETE CAT
exports.deleteCat = async (req, res) => {
  try {
    await Cat.findByIdAndDelete(req.params.id)
    res.json({ msg: "deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
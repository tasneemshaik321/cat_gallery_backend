const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")

dotenv.config()

app.use(express.json())
app.use(cors())

connectDB()

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/cats", require("./routes/catRoutes"))

app.listen(process.env.PORT, () => {
  console.log("server running")
})
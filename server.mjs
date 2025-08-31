import express from "express"
import cors from "cors"
import "dotenv/config"

const CANVA_APP_ID = process.env.CANVA_APP_ID?.toLowerCase()
console.log(CANVA_APP_ID)

// if (!CANVA_APP_ID) {
//   throw new Error(`CANVA_APP_ID environment variable is not set`)
// }

const app = express()

app.use(
  cors({
    origin: `https://app-${CANVA_APP_ID}.canva-apps.com`,
    optionsSuccessStatus: 200,
  })
)

app.get("/", (req, res) => {
  res.send("Hello World")
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running at http://locathost:${port}`)
})

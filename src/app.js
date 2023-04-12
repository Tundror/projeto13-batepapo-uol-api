import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"


const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()

let db
const mongoClient = new MongoClient(process.env.DATABASE_URL)
mongoClient.connect()
    .then(() => db = mongoClient.db())
    .catch((err) => console.log(err.message))

app.post("/participants", (req, res) =>{
    const {name} = req.body
    
})

app.get("/participants", (req, res) =>{
    
})

app.post("/messages", (req, res) =>{
    
})

app.get("/messages", (req, res) =>{
    
})

app.post("/status", (req, res) =>{
    
})

const port = 5000
app.listen(5000, () => console.log(`servidor rodando na porta ${port}`))
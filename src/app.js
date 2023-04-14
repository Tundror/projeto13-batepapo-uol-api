import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import dayjs from "dayjs"
import Joi from "joi"

const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()

let db
const mongoClient = new MongoClient(process.env.DATABASE_URL)
mongoClient.connect()
    .then(() => db = mongoClient.db())
    .catch((err) => console.log(err.message))

app.post("/participants", async (req, res) => {
    const { name } = req.body

    const schema = Joi.object({
        name: Joi.string().min(1).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    const usuarioExiste = await db.collection("participants").findOne({ name: name })
    if (usuarioExiste) return res.status(409).send("Usuario ja existe")

    const newUser = { name, lastStatus: Date.now() }
    try {
        const inserirUser = await db.collection("participants").insertOne(newUser)
        res.status(201).send("Usuario adicionado")
    }
    catch { return res.status(500).send("erro interno") }

    try {
        const newMessage = {
            from: name,
            to: 'Todos',
            text: 'entra na sala...',
            type: 'status',
            time: dayjs().format('HH:mm:ss')
        }
        await db.collection("messages").insertOne(newMessage)
        return res.sendStatus(201);
    }
    catch (err) { return res.status(500).send(err.message) }
})

app.get("/participants", (req, res) => {
    db.collection("participants").find().toArray()
        .then((users) => {
            if (users) {
                res.status(200).send(users)
            }
            else {
                res.status(404).send([])
            }
        })
        .catch((err) => res.status(500).send(err.message))
})

app.post("/messages", (req, res) => {

})

app.get("/messages", (req, res) => {

})

app.post("/status", (req, res) => {

})

const port = 5000
app.listen(5000, () => console.log(`servidor rodando na porta ${port}`))
import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient('mongodb+srv://eebocacode:wotqyn-fuhroc-myzgE4@bocacode.4y9qnuo.mongodb.net/test')

const db = client.db("test")

app.get("/", async (req, res) => {
  const result = await db.collection('blog').find().toArray()
    .catch(err => {
      res.send(err)
      return
    })
  res.send(result)
})

app.post("/post", async (req, res) => {
  const result = await db.collection('blog').insertOne(req.body)
    .cath(err => {
      res.status(500).send(err)
      return
    })
  res.send(result)
})

app.put("/put/:oid", async (req, res) => {
  const { oid } = req.params
  const id = new ObjectId(oid)
  const result = await db.collection('blog').updateOne(
    {
      _id: id
    },
    {
      $set: { ...req.body }
    }
  )
  res.send(result)
})

app.listen(3030, () => console.log('listening on http://localhost:3030...'))
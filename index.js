import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGO_URL)

const db = client.db("test")
const collection = db.collection('blog')

app.get("/", async (req, res) => {
  const result = await collection.find().toArray()
    .catch(err => {
      res.send(err)
      return
    })
  res.send(result)
})

app.get("/single/:oid", async (req, res) => {
  const { oid } = req.params
  const id = new ObjectId(oid)
  const result = await collection.findOne(id)
    .catch(err => {
      res.send(err)
      return
    })
  res.send(result)
})

app.delete("/delete/:oid", async (req, res) => {
  const { oid } = req.params
  const id = new ObjectId(oid)

  const result = await collection.deleteOne({_id:id})
    .catch(err => {
      res.send(err)
      return
    })
  res.send(result)
})

app.post("/post", async (req, res) => {
  const result = await collection.insertOne(req.body)
    .catch(err => {
      res.status(500).send(err)
      return
    })
  res.send(result)
})

app.put("/put/:oid", async (req, res) => {
  const { oid } = req.params
  const id = new ObjectId(oid)
  const result = await collection.updateOne(
    {
      _id: id
    },
    {
      $set: { ...req.body }
    }
  )
  .catch(err=>{
    res.status(500).send(err)
    return
  })
  res.send(result)
})

app.listen(process.env.PORT, () => console.log(`listening on http://localhost:${process.env.PORT}...`))
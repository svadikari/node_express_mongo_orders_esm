import express from 'express'
import orderRouter from './orders/routers.mjs'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())

// Order routes
app.use('/api/orders', orderRouter)

app.get('/', (req, res) => {
  res.status(404).json({ message: 'Not Found' })
})



export default app

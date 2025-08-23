import express from 'express'
import { getOrders, createOrder, updateOrder, deleteOrder, getOrder } from './controllers.mjs'

const orderRouter = express.Router()

orderRouter.route('/')
  .get(getOrders)
  .post(createOrder)

orderRouter.route('/:id')
  .put(updateOrder)
  .delete(deleteOrder)
  .get(getOrder)

export default orderRouter
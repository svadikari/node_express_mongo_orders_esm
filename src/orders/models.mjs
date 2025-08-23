import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
    productId: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        min: 1, 
        required: true 
    },
    price: { 
        type: Number, 
        min: 0.1, 
        required: true 
    },
}, { _id: false })

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true },
  items: { type: [orderItemSchema], required: true },
  status: { type: String, enum: ['NEW', 'SHIPPED', 'DELIVERED'], default: 'NEW' }   
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

export default Order
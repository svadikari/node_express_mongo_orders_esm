import createOrderSchema from "./schema.mjs"
import Order from "./models.mjs"


const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        console.error('Error fetching orders:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const createOrder = async (req, res) => {
    const { error } = createOrderSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
    }
    let order = new Order(req.body);
    try {
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await Order.findOne({ orderNumber: id });
        if (!order) {
            throw new Error('Order not found');
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
}

const updateOrder = async (req, res) => {
    let doc = await Order.findOne({ orderNumber: req.params.id })
    if (!doc) {
        return res.status(404).json({ error: 'Order not found' });
    }
    if (req.body.items) doc.items = req.body.items;
    if (req.body.status)
    doc.status = req.body.status;
    try {
        const updatedOrder = await doc.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(error.message.includes('validation failed') ? 400 : 500).json({ error: error.message || 'Internal Server Error' });
    }
}

const deleteOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedOrder = await Order.findOneAndDelete({ orderNumber: id });
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(204).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { createOrder,getOrders, updateOrder, deleteOrder, getOrder}

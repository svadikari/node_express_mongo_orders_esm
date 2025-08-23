import { describe, it, expect, vi, afterEach } from "vitest";
import { getMockReq, getMockRes } from 'vitest-mock-express';
import { createOrder, getOrders, getOrder, updateOrder, deleteOrder } from '../../src/orders/controllers.mjs'
import Order from "../../src/orders/models.mjs"

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Order Controller", () => {


  it("createOrder should return 500 error", async () => {
    vi.spyOn(Order.prototype, 'save').mockRejectedValue(new Error("Database error")); // Mock the create method to return an empty array
    const req = getMockReq({
      params: undefined,
      body: {
        orderNumber: "EEE1111",
        status: "NEW",
        items: [
          {
            productId: "PROD1",
            price: 12.21,
            quantity: 10
          }]
      },
    });
    const { res, next } = getMockRes({
      locals: {
        isPremiumUser: true,
      },
    })
    await createOrder(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
  })

  it("getOrders should fetch all orders", async () => {
    vi.spyOn(Order, 'find').mockResolvedValue([]); // Mock the find method to return an empty array
    const req = getMockReq({ params: undefined }); // Mock request with params
    const { res, next } = getMockRes({
      locals: {
        isPremiumUser: true,
      },
    })
    await getOrders(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  })

  it("getOrders should return 500 error", async () => {
    vi.spyOn(Order, 'find').mockRejectedValue(new Error("Database error")); // Mock the find method to return an empty array
    const req = getMockReq({ params: undefined }); // Mock request with params
    const { res, next } = getMockRes({
      locals: {
        isPremiumUser: true,
      },
    })
    await getOrders(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
  })

  it("getOrder should return 500 error", async () => {
    vi.spyOn(Order, 'findOne').mockRejectedValue(new Error("Database error"));
    const req = getMockReq({ params: undefined });
    const { res, next } = getMockRes({
      locals: {
        isPremiumUser: true,
      },
    })
    await getOrder(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
  })


  it("updateOrder should return 404 error", async () => {
    vi.spyOn(Order, 'findOne').mockResolvedValue(null);
    const req = getMockReq({ params: { id: 'EEE1111' }, body: { status: 'SHIPPED' } });
    const { res, next } = getMockRes({
      locals: {
        isPremiumUser: true,
      },
    })
    await updateOrder(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
  })

  it("updateOrder should return 500 error", async () => {
    vi.spyOn(Order, 'findOne').mockResolvedValue({
      orderNumber: 'EEE1111',
      status: 'NEW',
      items: [
        {
          productId: "PROD1",
          price: 12.21,
          quantity: 10
        }
      ],
      save: vi.fn().mockRejectedValue(new Error("Database error"))
    });
    const req = getMockReq({ params: { id: 'EEE1111' }, body: { status: 'SHIPPED' } });
    const { res, next } = getMockRes({
      locals: {
        isPremiumUser: true,
      },
    })
    await updateOrder(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
  })

  it("deleteOrder should return 404 error", async () => {
    vi.spyOn(Order, 'findOneAndDelete').mockReturnValue(false);
    const req = getMockReq({ params: { id: '123' } });
    const { res, next } = getMockRes({
      locals: {
        isPremiumUser: true,
      },
    })
    await deleteOrder(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
  })

  it("deleteOrder should return 500 error", async () => {
    vi.spyOn(Order, 'findOneAndDelete').mockRejectedValue(new Error("Database error")); // Mock the find method to return an empty array
    const req = getMockReq({ params: { id: '123' } }); // Mock request with params
    const { res, next } = getMockRes({
      locals: {
        isPremiumUser: true,
      },
    })
    await deleteOrder(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
  })
});

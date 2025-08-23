import app from "../../src/app.mjs";
import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {db, closeDatabase} from '../db-setup.mjs';
import orderRequest from './utils.mjs'

beforeAll(async () => {
    await db();
});

afterAll(async () => {
    await closeDatabase();
});


describe("Order API", () => {
    it("should fetch all orders", async () => {
        const response = await request(app).get("/api/orders");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("POST /orders", ()=> {
  it("should create order for valid input details", async () => {
    const orderInput = {orderNumber: 'EEE1111', status: 'NEW', items:[{productId: 'PROD1', price: 12.21, quantity: 10}]}
    const response = await request(app).post('/api/orders').send(orderInput)
    expect(response.status).toBe(201)
    expect(response.body).toEqual(expect.objectContaining({
      orderNumber: 'EEE1111',
      status: 'NEW',
      items: expect.arrayContaining([
        expect.objectContaining({
          productId: 'PROD1',
          price: 12.21,
          quantity: 10
        })
      ])
    }))
  })

  it('should return invalid order number error response when orderNumber missing in request payload', async () => {
      const response = await request(app).post('/api/orders').send({orderNumber: undefined})
      expect(response.status).toBe(400)
      expect(response.body.errors).toEqual(expect.objectContaining(
        ["\"orderNumber\" is required", 
            "\"items\" is required", 
            "\"status\" is required",
        ]));
  })

  
})

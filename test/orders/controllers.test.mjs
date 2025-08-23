import { describe, it, expect, vi} from "vitest";
import { getMockReq, getMockRes } from 'vitest-mock-express';
import { getOrders } from '../../src/orders/controllers.mjs'
import Order from "../../src/orders/models.mjs"

describe("Order Contoller", () => {
  it("should fetch all orders", async () => {
    vi.spyOn(Order, 'find').mockResolvedValue([]); // Mock the find method to return an empty array
    const req = getMockReq({ params: undefined }); // Mock request with params
    const { res, next } = getMockRes({locals: {
    isPremiumUser: true,
  },})
    await getOrders(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
})
});

// Tests for our health API.

import * as request from "supertest";
import { app } from "../../src/app";

test("health", async () => {
    const res = await request(app.callback())
        .get("/api/health")
        .send()
        .expect(200);
    expect(res.body).not.toBeNull();
    expect(res.body).toEqual(expect.objectContaining({ status: "healthy" }));
});

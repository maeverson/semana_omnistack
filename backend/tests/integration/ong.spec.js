const req = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG's", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const res = await req(app)
      .post("/ongs")
      /*.set('ong_id','2209f0ed')*/
      .send({
        name: "Maéverson Waitman",
        email: "irmamariana@ong.gov.br",
        whatsapp: "17996051401",
        city: "Votuporanga",
        uf: "SP"
      });
    console.log(res.body);
    expect(res.body).toHaveProperty("id");
    expect(res.body.id).toHaveLength(8);
  });
});

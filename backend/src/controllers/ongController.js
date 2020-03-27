const generateUUID = require("../utils/generateUUID");
const connection = require("../database/connection");

module.exports = {
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = generateUUID(4);

    try {
      await connection("ongs").insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
      });
      return res.json({ id });
    } catch (error) {
      return res.json({ error });
    }
  },
  async list(req, res) {
    const ongs = await connection("ongs").select("*");
    return res.json(ongs);
  }
};

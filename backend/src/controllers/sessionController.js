const connection = require("../database/connection");

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    try {
      const ong = await connection("ongs")
        .where("id", id)
        .select("name")
        .first();
      if (!ong) {
        return res.status(400).json({ error: "No ONG found with ID " + id });
      }
      return res.json(ong);
    } catch (error) {
      return res.json({ error });
    }
  }
};

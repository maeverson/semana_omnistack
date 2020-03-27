const generateUUID = require("../../src/utils/generateUUID");

describe("Generate UUID ", () => {
  it("should generate an UUID", () => {
    const length = 4;
    const id = generateUUID(length);
    expect(id).toHaveLength(length * 2);
  });
});

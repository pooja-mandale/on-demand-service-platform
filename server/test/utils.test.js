const test = require("node:test");
const assert = require("node:assert");
const { checkEmpty } = require("../utils/checkEmpty");

test("checkEmpty utility", async (t) => {
  await t.test("should return isError: true when fields are empty", () => {
    const result = checkEmpty({ name: "", email: "test@example.com" });
    assert.strictEqual(result.isError, true);
    assert.strictEqual(result.error.name, "name is Required");
    assert.strictEqual(result.error.email, undefined);
  });

  await t.test("should return isError: false when all fields are present", () => {
    const result = checkEmpty({ name: "John Doe", email: "test@example.com" });
    assert.strictEqual(result.isError, false);
    assert.deepStrictEqual(result.error, {});
  });
});

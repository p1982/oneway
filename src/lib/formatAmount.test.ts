import { formatAmount } from "./formatAmount";

describe("formatAmount", () => {
  it("formats USD values with two decimals", () => {
    expect(formatAmount(17.3)).toBe("$17.30");
  });
});

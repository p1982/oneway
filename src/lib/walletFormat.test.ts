import dayjs from "dayjs";
import {
  formatCurrency,
  formatTransactionAmount,
  calculateDailyPoints,
  formatDetailsDate,
  formatPoints,
  formatTransactionDateLine,
} from "./walletFormat";

describe("walletFormat", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-08T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("formats weekday for recent transaction and prepends authorized user", () => {
    const result = formatTransactionDateLine({
      id: "tx-1",
      type: "credit",
      amount: 12,
      name: "Apple",
      description: "Card used",
      location: "",
      date: "2026-04-07T10:00:00.000Z",
      pending: false,
      authorizedUser: "Diana",
      icon: "apple",
      status: "Approved",
      cardLabel: "RBC Bank Debit Card",
    });

    expect(result).toContain("Diana - ");
    expect(result).toContain("Tuesday");
  });

  it("formats details date using Intl", () => {
    expect(formatDetailsDate("2026-05-22T12:47:00.000Z")).toMatch(/^5\/22, \d{2}:47$/);
  });

  it("formats older transaction as date and handles no authorized user", () => {
    const result = formatTransactionDateLine({
      id: "tx-2",
      type: "payment",
      amount: 50,
      name: "Payment",
      description: "From bank",
      location: "",
      date: "2026-03-01T10:00:00.000Z",
      pending: false,
      icon: "payment",
      status: "Approved",
      cardLabel: "RBC Bank Debit Card",
    });

    expect(result).toMatch(/3\/1\/26|3\/1\/2026|3\/1\/26/);
  });

  it("formats amounts for payment and credit", () => {
    expect(
      formatTransactionAmount({
        id: "tx-3",
        type: "payment",
        amount: 100,
        name: "Payment",
        description: "",
        location: "",
        date: "2026-04-08T12:00:00.000Z",
        pending: false,
        icon: "payment",
        status: "Approved",
        cardLabel: "RBC Bank Debit Card",
      }),
    ).toBe("+$100.00");

    expect(
      formatTransactionAmount({
        id: "tx-4",
        type: "credit",
        amount: 7.5,
        name: "Airalo",
        description: "",
        location: "",
        date: "2026-04-08T12:00:00.000Z",
        pending: false,
        icon: "sim",
        status: "Approved",
        cardLabel: "RBC Bank Debit Card",
      }),
    ).toBe("$7.50");
  });

  it("formats currency and low points branch", () => {
    expect(formatCurrency(17.3)).toBe("$17.30");
    expect(formatPoints(999)).toBe("999");
  });

  it("calculates and formats daily points", () => {
    expect(calculateDailyPoints(dayjs("2026-09-01"))).toBe(2);
    expect(calculateDailyPoints(dayjs("2026-09-02"))).toBe(3);
    expect(calculateDailyPoints(dayjs("2026-09-03"))).toBe(4);
    expect(calculateDailyPoints(dayjs("2026-01-03"))).toBeGreaterThan(3);
    expect(formatPoints(28745)).toBe("29K");
  });
});

import type { WalletPayload } from "@/types/wallet";
import { transactionsApiService } from "@/shared/api";
import { useWalletStore } from "./walletStore";

vi.mock("@/shared/api", () => ({
  transactionsApiService: {
    getWalletData: vi.fn(),
  },
}));

const getWalletDataMock = vi.mocked(transactionsApiService.getWalletData);

const payload: WalletPayload = {
  card: {
    limit: 1500,
    startingBalance: 17.3,
    noPaymentDueText: "You've paid your September balance.",
  },
  transactions: [
    {
      id: "apple-1",
      type: "credit",
      amount: 14.06,
      name: "Apple",
      description: "Card Number Used",
      location: "",
      date: "2026-04-07T09:12:00.000Z",
      pending: true,
      authorizedUser: "Diana",
      icon: "apple",
      status: "Approved",
      cardLabel: "RBC Bank Debit Card",
    },
    {
      id: "payment-1",
      type: "payment",
      amount: 174,
      name: "Payment",
      description: "From JPMorgan Chase Bank National",
      location: "",
      date: "2026-04-08T11:05:00.000Z",
      pending: false,
      icon: "payment",
      status: "Approved",
      cardLabel: "RBC Bank Debit Card",
    },
  ],
};

const resetStore = () => {
  useWalletStore.setState({
    cardLimit: 0,
    cardBalance: 0,
    noPaymentDueText: "",
    transactions: {},
    transactionsId: [],
    isLoading: false,
    error: null,
  });
};

describe("walletStore", () => {
  beforeEach(() => {
    resetStore();
    vi.clearAllMocks();
  });

  it("fetches wallet and stores normalized transactions", async () => {
    getWalletDataMock.mockResolvedValue(payload);

    await useWalletStore.getState().fetchWallet();
    const state = useWalletStore.getState();

    expect(getWalletDataMock).toHaveBeenCalledTimes(1);
    expect(state.cardLimit).toBe(1500);
    expect(state.noPaymentDueText).toContain("September");
    expect(state.transactionsId).toEqual(["apple-1", "payment-1"]);
    expect(state.transactions["apple-1"].name).toBe("Apple");
    expect(state.cardBalance).toBeGreaterThan(0);
    expect(state.cardBalance).toBeLessThanOrEqual(1350);
  });

  it("returns selectors from normalized state", async () => {
    getWalletDataMock.mockResolvedValue(payload);
    await useWalletStore.getState().fetchWallet();

    const ordered = useWalletStore.getState().getOrderedTransactions();
    const byId = useWalletStore.getState().getTransactionById("payment-1");

    expect(ordered).toHaveLength(2);
    expect(ordered[0].id).toBe("apple-1");
    expect(byId?.name).toBe("Payment");
    expect(useWalletStore.getState().getTransactionById("unknown-id")).toBeNull();
  });
});

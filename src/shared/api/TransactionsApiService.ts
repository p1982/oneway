import { AbstractAxiosService } from "./BaseApiService";
import type { WalletPayload } from "@/types/wallet";

class TransactionsApiService extends AbstractAxiosService {
  constructor() {
    super();
  }

  getWalletData(): Promise<WalletPayload> {
    return this.get<WalletPayload>("/data/wallet.json");
  }
}

export const transactionsApiService = new TransactionsApiService();

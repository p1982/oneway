import { TransactionDetails } from "@/components/wallet/details/TransactionDetails";

export default async function TransactionDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <TransactionDetails slug={slug} />;
}

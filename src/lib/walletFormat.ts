import dayjs from "dayjs";
import type { Transaction } from "@/types/wallet";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatTransactionAmount = (transaction: Transaction): string => {
  const value = formatCurrency(transaction.amount);
  return transaction.type === "payment" ? `+${value}` : value;
};

export const formatTransactionDateLine = (transaction: Transaction): string => {
  const txDate = new Date(transaction.date);
  const now = new Date();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const diffDays = Math.floor((now.getTime() - txDate.getTime()) / oneDayMs);
  const isWithinLastWeek = diffDays < 7;
  const datePart = isWithinLastWeek
    ? new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(txDate)
    : new Intl.DateTimeFormat("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      }).format(txDate);
  return transaction.authorizedUser ? `${transaction.authorizedUser} - ${datePart}` : datePart;
};

export const formatDetailsDate = (value: string): string => {
  const date = new Date(value);
  const datePart = new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
  }).format(date);
  const timePart = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return `${datePart}, ${timePart}`;
};

const getSeasonStart = (currentDate: dayjs.Dayjs): dayjs.Dayjs => {
  const year = currentDate.year();
  const starts = [
    dayjs(`${year}-03-01`),
    dayjs(`${year}-06-01`),
    dayjs(`${year}-09-01`),
    dayjs(`${year}-12-01`),
  ];

  for (let i = starts.length - 1; i >= 0; i -= 1) {
    if (currentDate.isAfter(starts[i]) || currentDate.isSame(starts[i], "day")) {
      return starts[i];
    }
  }

  return dayjs(`${year - 1}-12-01`);
};

export const calculateDailyPoints = (date = dayjs()): number => {
  const seasonStart = getSeasonStart(date);
  const dayIndex = date.startOf("day").diff(seasonStart.startOf("day"), "day") + 1;

  if (dayIndex <= 1) {
    return 2;
  }
  if (dayIndex === 2) {
    return 3;
  }

  let prevPrev = 2;
  let prev = 3;

  for (let day = 3; day <= dayIndex; day += 1) {
    const current = prevPrev + prev * 0.6;
    prevPrev = prev;
    prev = current;
  }

  return Math.round(prev);
};

export const formatPoints = (points: number): string => {
  if (points > 1000) {
    return `${Math.round(points / 1000)}K`;
  }
  return `${points}`;
};

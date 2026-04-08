"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import {
  faBagShopping,
  faCreditCard,
  faMoneyBillTransfer,
  faReceipt,
  faSimCard,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import type { ReactElement } from "react";
import type { TransactionIcon } from "@/types/wallet";
import { IconBox } from "./TransactionIcon.styles";

const iconByType: Record<TransactionIcon, ReactElement> = {
  apple: <FontAwesomeIcon icon={faApple} />,
  payment: <FontAwesomeIcon icon={faMoneyBillTransfer} />,
  ikea: <FontAwesomeIcon icon={faStore} />,
  target: <FontAwesomeIcon icon={faCreditCard} />,
  movie: <FontAwesomeIcon icon={faReceipt} />,
  cart: <FontAwesomeIcon icon={faBagShopping} />,
  sim: <FontAwesomeIcon icon={faSimCard} />,
};

const colors = ["#30343f", "#4338ca", "#d97706", "#0f766e", "#1f2937"];

export function TransactionIconBadge({ icon, seed }: { icon: TransactionIcon; seed: string }) {
  const colorIndex =
    Math.abs(seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
  return <IconBox bgcolor={colors[colorIndex]}>{iconByType[icon]}</IconBox>;
}

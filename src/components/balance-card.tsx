import React, { use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTotalBalance } from "@/utils/api";

const BalanceCard = () => {
  const total = use(getTotalBalance());

  return (
    <Card className="mb-6 border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
          C$ Balance Total
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-bold text-gray-900">
          C$
          {total.balance.toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <p className="text-sm text-gray-500 mt-1">Al día de hoy</p>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;

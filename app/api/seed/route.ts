import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  await prisma.payment.deleteMany();

  const payment = await prisma.payment.createMany({
    data: [
      {
        amount: 45,
      },
            {
        amount: 15,
      },
            {
        amount: 20,
      },
            {
        amount: 50,
      },
            {
        amount: 100,
      },
    ],
  });

  console.log("Payment created:", payment);

  return NextResponse.json({ messagge: "seed execute" });
}

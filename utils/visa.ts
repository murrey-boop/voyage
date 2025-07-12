import  { prisma } from '@/lib/prisma';

export async function updateVisaPaymentStatus(tx_ref: string) {
  await prisma.visaApplication.updateMany({
    where: {
      paymentRef: tx_ref,
    },
    data: {
      paymentStatus: 'PAID',
    },
  });
}

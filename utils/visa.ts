import {db} from '@/lib/db'; // Adjust the import path as needed

export async function updateVisaPaymentStatus(tx_ref: string) {
  await db.visaApplication.updateMany({
    where: {
      paymentRef: tx_ref,
    },
    data: {
      paymentStatus: 'PAID',
    },
  });
}

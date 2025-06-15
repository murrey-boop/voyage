export async function initiateMpesaPayment({ visaApplicationId }: { visaApplicationId: string }) {
  const res = await fetch('/api/mpesa/initiate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visaApplicationId }),
  });

  if (!res.ok) {
    throw new Error('Failed to initiate M-Pesa payment');
  }

  return await res.json();
}
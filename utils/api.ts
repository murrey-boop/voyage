
import { VisaFormState } from '@/types/visa';

export async function createVisaApplication(formData: VisaFormState) {
  const res = await fetch('/api/visa/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error('Failed to create visa application');
  }

  return await res.json(); // Should return saved application, including its id
}

import getServerSession from 'next-auth';
import { authOptions}  from '@/lib/auth';
import { redirect } from 'next/navigation';
import {BookingForm} from '@/components/BookingForm';

export default async function BookTour({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/auth/signin?callbackUrl=/tours/${params.id}/book`);
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Book Your Tour</h1>
      <BookingForm tourId={params.id} userId={session.user.id} />
    </div>
  );
}
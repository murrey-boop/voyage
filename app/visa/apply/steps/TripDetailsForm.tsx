'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from 'sonner';
import { tripDetailsSchema, TripDetailsFormType } from '../formSchema';

interface Props {
  onNext: () => void;
}

const countries = ['UAE', 'Australia', 'Nigeria', 'Kenya', 'Ghana', 'South Africa'];
const visaTypes = ['Tourist', 'Business', 'Student'];

export function TripDetailsForm({ onNext }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TripDetailsFormType>({
    resolver: zodResolver(tripDetailsSchema),
  });

  const onSubmit = (data: TripDetailsFormType) => {
    console.log('Trip Data:', data);
    toast.success('Trip details saved!');
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Destination Country */}
      <div>
        <label className="block text-sm font-medium mb-1">Destination Country</label>
        <Select onValueChange={(value) => setValue('country', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
      </div>

      {/* Visa Type */}
      <div>
        <label className="block text-sm font-medium mb-1">Visa Type</label>
        <Select onValueChange={(value) => setValue('visaType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select visa type" />
          </SelectTrigger>
          <SelectContent>
            {visaTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.visaType && <p className="text-red-500 text-sm mt-1">{errors.visaType.message}</p>}
      </div>

      {/* Start Date */}
      <div>
        <label className="block text-sm font-medium mb-1">Start Date</label>
        <Input type="date" {...register('startDate')} />
        {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
      </div>

      {/* End Date */}
      <div>
        <label className="block text-sm font-medium mb-1">End Date</label>
        <Input type="date" {...register('endDate')} />
        {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
          Next
        </Button>
      </div>
    </form>
  );
}

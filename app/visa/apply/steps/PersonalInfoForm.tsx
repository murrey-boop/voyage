'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from 'sonner';
import { personalInfoSchema, PersonalInfoFormType } from '../formSchema';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const countries = ['UAE', 'Australia', 'Nigeria', 'Kenya', 'Ghana', 'South Africa'];

export function PersonalInfoForm({ onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PersonalInfoFormType>({
    resolver: zodResolver(personalInfoSchema),
  });

  const onSubmit = (data: PersonalInfoFormType) => {
    console.log('Personal Info:', data);
    toast.success('Personal info saved!');
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <Input {...register('fullName')} placeholder="John Doe" />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input type="email" {...register('email')} placeholder="you@example.com" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <Input {...register('phone')} placeholder="+1234567890" />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      {/* Passport Number */}
      <div>
        <label className="block text-sm font-medium mb-1">Passport Number</label>
        <Input {...register('passportNumber')} placeholder="A12345678" />
        {errors.passportNumber && <p className="text-red-500 text-sm mt-1">{errors.passportNumber.message}</p>}
      </div>

      {/* Passport Expiry */}
      <div>
        <label className="block text-sm font-medium mb-1">Passport Expiry Date</label>
        <Input type="date" {...register('passportExpiry')} />
        {errors.passportExpiry && <p className="text-red-500 text-sm mt-1">{errors.passportExpiry.message}</p>}
      </div>

      {/* Nationality */}
      <div>
        <label className="block text-sm font-medium mb-1">Nationality</label>
        <Select onValueChange={(value) => setValue('nationality', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select nationality" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" type="button" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
          Next
        </Button>
      </div>
    </form>
  );
}

// Example: Replace 'formData' with the actual data you want to send, e.g., 'data' from the form submission
// Remove or move this code inside the onSubmit function if you want to send form data after form submission

// const res = await fetch('/api/create-application', {
//   method: 'POST',
//   body: JSON.stringify({ ...formData }),
// });

// const data = await res.json();
// useVisaFormStore.getState().setVisaAppId(data.id); // store it

//TODO : add a document viewr/admin panel to view uploaded documents
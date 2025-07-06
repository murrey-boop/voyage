'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { personalInfoSchema, PersonalInfoFormType } from '../formSchema';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { AiOutlineInfoCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { FaTransgender } from 'react-icons/fa';

const countries = [
  { label: 'UAE', icon: '🇦🇪' },
  { label: 'Australia', icon: '🇦🇺' },
  { label: 'Nigeria', icon: '🇳🇬' },
  { label: 'Kenya', icon: '🇰🇪' },
  { label: 'Ghana', icon: '🇬🇭' },
  { label: 'South Africa', icon: '🇿🇦' },
  { label: 'India', icon: '🇮🇳' },
  { label: 'Pakistan', icon: '🇵🇰' },
  { label: 'Bangladesh', icon: '🇧🇩' },
  { label: 'Philippines', icon: '🇵🇭' },
  { label: 'Indonesia', icon: '🇮🇩' },
  { label: 'Malaysia', icon: '🇲🇾' },
  { label: 'Singapore', icon: '🇸🇬' },
  { label: 'Thailand', icon: '🇹🇭' },
  { label: 'Vietnam', icon: '🇻🇳' },
  { label: 'United Kingdom', icon: '🇬🇧' },
  { label: 'United States', icon: '🇺🇸' },
];

const genders = [
  { value: 'Male', label: 'Male', icon: '♂️' },
  { value: 'Female', label: 'Female', icon: '♀️' },
  { value: 'Other', label: 'Other', icon: <FaTransgender /> },
  { value: 'Prefer not to say', label: 'Prefer not to say', icon: '⚪' },
];

const todayISO = new Date().toISOString().split('T')[0];

interface Props {
  onNext: () => void;
  onBack: () => void;
  progress?: number; // 0-1 for circular indicator
}

export function PersonalInfoForm({ onNext, onBack, progress = 0.5 }: Props) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(true);

  // Load draft/defaults
  const defaultValues: Partial<PersonalInfoFormType> = {
    gender: 'Male',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    reset,
  } = useForm<PersonalInfoFormType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
    mode: 'onTouched',
  });

  // Restore from draft on mount
  useEffect(() => {
    setLoadingDraft(true);
    const draft = localStorage.getItem('personalInfoDraft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        reset(parsed);
      } catch {}
    }
    setLoadingDraft(false);
  }, [reset]);

  // Save draft on change
  useEffect(() => {
    const sub = setTimeout(() => {
      localStorage.setItem('personalInfoDraft', JSON.stringify(getValues()));
    }, 300);
    return () => clearTimeout(sub);
  }, [getValues]);

  // Confetti timer
  const confettiTimeout = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (showConfetti) {
      confettiTimeout.current = setTimeout(() => setShowConfetti(false), 2000);
    }
    return () => {
      if (confettiTimeout.current) clearTimeout(confettiTimeout.current);
    };
  }, [showConfetti]);

  // Save Draft Handler (identical logic to previous step)
  const handleSaveDraft = () => {
    if (typeof window !== 'undefined') {
      try {
        const draft = getValues();
        localStorage.setItem('personalInfoDraft', JSON.stringify(draft));
        toast.success('Draft saved! You can continue later.', {
          icon: <AiOutlineCheckCircle className="text-green-500" />
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error('Failed to save draft. Please try again.');
      }
    }
  };

  // Circular progress indicator SVG
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  // On submit
  const onSubmit = (data: PersonalInfoFormType) => {

    console.log('Form submitted:', data);
    toast.success('Personal info saved! 🎉');
    setShowConfetti(true);
    localStorage.removeItem('personalInfoDraft');
    setTimeout(() => {
      onNext();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {loadingDraft ? (
        <div className="flex items-center justify-center min-h-[40vh]">Loading…</div>
      ) : (
        <motion.div
          key="personal-info"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -32 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="w-full sm:max-w-xl mx-auto my-4"
        >
          {showConfetti && (
            <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={120} />
          )}

          <div className="rounded-3xl shadow-xl bg-gradient-to-br from-orange-50 via-orange-100 to-white p-6 sm:p-10 border border-orange-100 relative overflow-hidden">
            {/* Circular progress at top */}
            <div className="flex justify-center mb-5">
              <svg width={68} height={68} className="drop-shadow" aria-label="Form progress">
                <circle
                  cx={34}
                  cy={34}
                  r={radius}
                  stroke="#fb923c"
                  fill="none"
                  strokeWidth={6}
                  opacity={0.18}
                />
                <circle
                  cx={34}
                  cy={34}
                  r={radius}
                  stroke="#fb923c"
                  fill="none"
                  strokeWidth={6}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1)' }}
                />
                {/* Circle joints */}
                <circle cx={34} cy={6} r={3} fill="#fb923c" />
                <circle cx={62} cy={34} r={3} fill={progress >= 0.33 ? "#fb923c" : "#fde68a"} />
                <circle cx={34} cy={62} r={3} fill={progress >= 0.66 ? "#fb923c" : "#fde68a"} />
                <circle cx={6} cy={34} r={3} fill={progress >= 0.99 ? "#fb923c" : "#fde68a"} />
              </svg>
            </div>
            {/* Heading and description */}
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-orange-600 mb-1 flex items-center justify-center gap-2">
                Step 2: Personal Information
              </h2>
              <p className="text-gray-600 text-base">Provide your personal and passport details exactly as they appear on your official documents.</p>
            </div>

            <TooltipProvider>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Full Name */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="block text-sm font-semibold text-gray-700" htmlFor="fullName">
                      Full Name
                    </label>
                    {errors.fullName && (
                      <span title={errors.fullName.message}>
                        <AiOutlineInfoCircle className="text-red-500" size={16} />
                      </span>
                    )}
                  </div>
                  <Input
                    {...register('fullName')}
                    placeholder="Your Full Name"
                    className={`w-full border-2 rounded-xl px-4 py-3 shadow-sm focus:outline-none transition
                      focus:ring-2 focus:ring-orange-300 focus:border-orange-400
                      ${errors.fullName ? 'border-red-400' : 'border-orange-100'}
                      hover:border-orange-300`}
                  />
                  {errors.fullName && (
                    <span className="block mt-1 text-sm text-red-500 animate-pulse">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="block text-sm font-semibold text-gray-700" htmlFor="email">
                      Email
                    </label>
                    {errors.email && (
                      <span title={errors.email.message}>
                        <AiOutlineInfoCircle className="text-red-500" size={16} />
                      </span>
                    )}
                  </div>
                  <Input
                    type="email"
                    {...register('email')}
                    placeholder="you@example.com"
                    className={`w-full border-2 rounded-xl px-4 py-3 shadow-sm focus:outline-none transition
                      focus:ring-2 focus:ring-orange-300 focus:border-orange-400
                      ${errors.email ? 'border-red-400' : 'border-orange-100'}
                      hover:border-orange-300`}
                  />
                  {errors.email && (
                    <span className="block mt-1 text-sm text-red-500 animate-pulse">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="block text-sm font-semibold text-gray-700" htmlFor="phone">
                      Phone Number
                    </label>
                    {errors.phone && (
                      <span title={errors.phone.message}>
                        <AiOutlineInfoCircle className="text-red-500" size={16} />
                      </span>
                    )}
                  </div>
                  <Input
                    {...register('phone')}
                    placeholder="+1234567890"
                    className={`w-full border-2 rounded-xl px-4 py-3 shadow-sm focus:outline-none transition
                      focus:ring-2 focus:ring-orange-300 focus:border-orange-400
                      ${errors.phone ? 'border-red-400' : 'border-orange-100'}
                      hover:border-orange-300`}
                  />
                  {errors.phone && (
                    <span className="block mt-1 text-sm text-red-500 animate-pulse">
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="block text-sm font-semibold text-gray-700" htmlFor="gender">
                      Gender
                    </label>
                    {errors.gender && (
                      <span title={errors.gender.message}>
                        <AiOutlineInfoCircle className="text-red-500" size={16} />
                      </span>
                    )}
                  </div>
                  <Select
                    onValueChange={(value) => setValue('gender', value, { shouldValidate: true })}
                    defaultValue={getValues('gender')}
                  >
                    <SelectTrigger
                      className={`w-full bg-white border-2 rounded-xl pl-3 py-3 pr-4 shadow-sm focus:outline-none transition
                        focus:ring-2 focus:ring-orange-300 focus:border-orange-400
                        ${errors.gender ? 'border-red-400' : 'border-orange-100'}
                        hover:border-orange-300`}
                      tabIndex={0}
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl shadow-lg">
                      {genders.map(({ value, label, icon }) => (
                        <SelectItem
                          key={value}
                          value={value}
                          className="flex items-center gap-2 py-2 px-3 hover:bg-orange-50 focus:bg-orange-100"
                        >
                          <span className="inline-flex items-center">{typeof icon === 'string' ? icon : icon}</span> {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <span className="block mt-1 text-sm text-red-500 animate-pulse">
                      {errors.gender.message}
                    </span>
                  )}
                </div>

                {/* Address */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="block text-sm font-semibold text-gray-700" htmlFor="address">
                      Address
                    </label>
                    {errors.address && (
                      <span title={errors.address.message}>
                        <AiOutlineInfoCircle className="text-red-500" size={16} />
                      </span>
                    )}
                  </div>
                  <textarea
                    {...register('address')}
                    placeholder="123 Your Street, City, Country"
                    rows={2}
                    className={`w-full border-2 rounded-xl px-4 py-3 shadow-sm focus:outline-none transition
                      focus:ring-2 focus:ring-orange-300 focus:border-orange-400
                      ${errors.address ? 'border-red-400' : 'border-orange-100'}
                      hover:border-orange-300 resize-none`}
                  />
                  {errors.address && (
                    <span className="block mt-1 text-sm text-red-500 animate-pulse">
                      {errors.address.message}
                    </span>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="block text-sm font-semibold text-gray-700" htmlFor="dob">
                      Date of Birth
                    </label>
                    {errors.dob && (
                      <span title={errors.dob.message}>
                        <AiOutlineInfoCircle className="text-red-500" size={16} />
                      </span>
                    )}
                  </div>
                  <Input
                    type="date"
                    {...register('dob')}
                    className={`w-full border-2 rounded-xl px-4 py-3 shadow-sm focus:outline-none transition
                      focus:ring-2 focus:ring-orange-300 focus:border-orange-400
                      ${errors.dob ? 'border-red-400' : 'border-orange-100'}
                      hover:border-orange-300`}
                    max={todayISO}
                  />
                  {errors.dob && (
                    <span className="block mt-1 text-sm text-red-500 animate-pulse">
                      {errors.dob.message}
                    </span>
                  )}
                </div>

                {/* Passport Number */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="block text-sm font-semibold text-gray-700" htmlFor="passportNumber">
                      Passport Number
                    </label>
                    {errors.passportNumber && (
                      <span title={errors.passportNumber.message}>
                        <AiOutlineInfoCircle className="text-red-500" size={16} />
                      </span>
                    )}
                  </div>
                  <Input
                    {...register('passportNumber')}
                    placeholder="A12345678"
                    className={`w-full border-2 rounded-xl px-4 py-3 shadow-sm focus:outline-none transition
                      focus:ring-2 focus:ring-orange-300 focus:border-orange-400
                      ${errors.passportNumber ? 'border-red-400' : 'border-orange-100'}
                      hover:border-orange-300`}
                  />
                  {errors.passportNumber && (
                    <span className="block mt-1 text-sm text-red-500 animate-pulse">
                      {errors.passportNumber.message}
                    </span>
                  )}
                </div>

                {/* Passport Expiry */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="block text-sm font-semibold text-gray-700" htmlFor="passportExpiry">
                      Passport Expiry Date
                    </label>
                    {errors.passportExpiry && (
                      <span title={errors.passportExpiry.message}>
                        <AiOutlineInfoCircle className="text-red-500" size={16} />
                      </span>
                    )}
                  </div>
                  <Input
                    type="date"
                    {...register('passportExpiry')}
                    className={`w-full border-2 rounded-xl px-4 py-3 shadow-sm focus:outline-none transition
                      focus:ring-2 focus:ring-orange-300 focus:border-orange-400
                      ${errors.passportExpiry ? 'border-red-400' : 'border-orange-100'}
                      hover:border-orange-300`}
                    min={todayISO}
                  />
                  {errors.passportExpiry && (
                    <span className="block mt-1 text-sm text-red-500 animate-pulse">
                      {errors.passportExpiry.message}
                    </span>
                  )}
                </div>

                {/* Nationality */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="block text-sm font-semibold text-gray-700" htmlFor="nationality">
                      Nationality
                    </label>
                    {errors.nationality && (
                      <span title={errors.nationality.message}>
                        <AiOutlineInfoCircle className="text-red-500" size={16} />
                      </span>
                    )}
                  </div>
                  <Select
                    onValueChange={(value) => setValue('nationality', value, { shouldValidate: true })}
                    defaultValue={getValues('nationality')}
                  >
                    <SelectTrigger
                      className={`w-full bg-white border-2 rounded-xl px-4 py-3 shadow-sm focus:outline-none transition
                        focus:ring-2 focus:ring-orange-300 focus:border-orange-400
                        ${errors.nationality ? 'border-red-400' : 'border-orange-100'}
                        hover:border-orange-300`}
                      tabIndex={0}
                    >
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl shadow-lg">
                      {countries.map(({ label, icon }) => (
                        <SelectItem
                          key={label}
                          value={label}
                          className="flex items-center gap-2 py-2 px-3 hover:bg-orange-50 focus:bg-orange-100"
                        >
                          <span>{icon}</span> {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.nationality && (
                    <span className="block mt-1 text-sm text-red-500 animate-pulse">
                      {errors.nationality.message}
                    </span>
                  )}
                </div>

                {/* Navigation & Save Draft */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto border-orange-200 focus:ring-orange-300"
                    onClick={onBack}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto border-orange-200 focus:ring-orange-300"
                    onClick={handleSaveDraft}
                  >
                    Save Draft
                  </Button>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all"
                    disabled={isSubmitting}
                  >
                    Next
                  </Button>
                </div>
              </form>
            </TooltipProvider>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
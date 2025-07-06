'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import { toast } from 'sonner';
import { tripDetailsSchema, TripDetailsFormType } from '../formSchema';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { AiOutlineInfoCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { MdOutlineFlightTakeoff, MdOutlineToday } from 'react-icons/md';

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
const visaTypes = [
  { label: 'Tourist', icon: '🎒' },
  { label: 'Business', icon: '💼' },
  { label: 'Student', icon: '🎓' },
];

const todayISO = new Date().toISOString().split('T')[0];

interface Props {
  onNext: () => void; 
  prefill?: Partial<TripDetailsFormType>; // Outfilled from hero search if any
  progress?: number; // 0-1 for circular indicator
}

export function TripDetailsForm({ onNext, prefill, progress = 0.25 }: Props) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(true);

  // Restore from draft/localStorage if available, else use prefill
  const defaultValues: TripDetailsFormType = {
    country: prefill?.country || '',
    visaType: prefill?.visaType || '',
    startDate: prefill?.startDate || todayISO,
    endDate: prefill?.endDate || '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    reset,
  } = useForm<TripDetailsFormType>({
    resolver: zodResolver(tripDetailsSchema),
    defaultValues,
    mode: 'onTouched',
  });

  // Load draft on mount
  useEffect(() => {
    setLoadingDraft(true);
    const draft = localStorage.getItem('tripDetailsDraft');
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
      localStorage.setItem('tripDetailsDraft', JSON.stringify(getValues()));
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

  const onSubmit = () => {
    toast.success('Trip details saved! 🎉');
    setShowConfetti(true);
    localStorage.removeItem('tripDetailsDraft');
    setTimeout(() => {
      onNext();
    }, 1200);
  };

  const handleSaveDraft = () => {
    localStorage.setItem('tripDetailsDraft', JSON.stringify(getValues()));
    toast.success('Draft saved! You can continue later.', 
    { icon: <AiOutlineCheckCircle className="text-green-500" /> });
  };

  // Circular progress indicator SVG
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <AnimatePresence>
      {loadingDraft ? (
        <div className="flex items-center justify-center min-h-[40vh]">Loading…</div>
      ) : (
        <motion.div
          key="trip-details"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -32 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="w-full sm:max-w-xl mx-auto my-4"
        >
          {/* Confetti */}
          {showConfetti && (
            <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={120} />
          )}

          {/* Card with gradient + shadow */}
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
                <MdOutlineFlightTakeoff /> Step 1: Trip Details
              </h2>
              <p className="text-gray-600 text-base">Tell us where and when you want to go. This helps us tailor your visa process.</p>
            </div>

            {/* Form */}
            <TooltipProvider>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Destination Country */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="block text-sm font-semibold text-gray-700">Destination Country</label>
                    <Tooltip>
                      <TooltipTrigger tabIndex={0}>
                        <AiOutlineInfoCircle className="text-orange-400 cursor-pointer" size={16} />
                      </TooltipTrigger>
                      <TooltipContent className="rounded bg-white px-3 py-2 shadow text-gray-700 text-xs">
                        Select the country you wish to travel to.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select
                    onValueChange={(value) => setValue('country', value, { shouldValidate: true })}
                    defaultValue={getValues('country')}
                  >
                    <SelectTrigger
                      className={`
                        w-full bg-white border-2 rounded-xl px-4 py-3 shadow-sm focus:outline-none transition
                        focus:ring-2 focus:ring-orange-300 focus:border-orange-400
                        ${errors.country ? 'border-red-400' : 'border-orange-100'}
                        hover:border-orange-300
                      `}
                      tabIndex={0}
                    >
                      <SelectValue placeholder="Select a country" />
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
                  {errors.country && (
                    <span className="block mt-1 text-sm text-red-500 animate-pulse">
                      {errors.country.message}
                    </span>
                  )}
                </div>

                {/* Visa Type */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="block text-sm font-semibold text-gray-700">Visa Type</label>
                    <Tooltip>
                      <TooltipTrigger tabIndex={0}>
                        <AiOutlineInfoCircle className="text-orange-400 cursor-pointer" size={16} />
                      </TooltipTrigger>
                      <TooltipContent className="rounded bg-white px-3 py-2 shadow text-gray-700 text-xs">
                        Choose the type of visa that suits your travel (tourist, business, student).
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select
                    onValueChange={(value) => setValue('visaType', value, { shouldValidate: true })}
                    defaultValue={getValues('visaType')}
                  >
                    <SelectTrigger
                      className={`
                        w-full bg-white border-2 rounded-xl px-4 py-3 shadow-sm focus:outline-none transition
                        focus:ring-2 focus:ring-orange-300 focus:border-orange-400
                        ${errors.visaType ? 'border-red-400' : 'border-orange-100'}
                        hover:border-orange-300
                      `}
                      tabIndex={0}
                    >
                      <SelectValue placeholder="Select visa type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl shadow-lg">
                      {visaTypes.map(({ label, icon }) => (
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
                  {errors.visaType && (
                    <span className="block mt-1 text-sm text-red-500 animate-pulse">
                      {errors.visaType.message}
                    </span>
                  )}
                </div>

                {/* Start Date */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="block text-sm font-semibold text-gray-700">Start Date</label>
                    <Tooltip>
                      <TooltipTrigger tabIndex={0}>
                        <AiOutlineInfoCircle className="text-orange-400 cursor-pointer" size={16} />
                      </TooltipTrigger>
                      <TooltipContent className="rounded bg-white px-3 py-2 shadow text-gray-700 text-xs">
                        When do you plan to start your journey? (We suggest today or later)
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="relative">
                    <Input
                      type="date"
                      {...register('startDate')}
                      className={`
                        w-full border-2 rounded-xl px-4 py-3 shadow-sm focus:outline-none transition
                        focus:ring-2 focus:ring-orange-300 focus:border-orange-400
                        ${errors.startDate ? 'border-red-400' : 'border-orange-100'}
                        hover:border-orange-300
                      `}
                      min={todayISO}
                      defaultValue={getValues('startDate') || todayISO}
                    />
                    <MdOutlineToday className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-300" size={18} />
                  </div>
                  {errors.startDate && (
                    <span className="block mt-1 text-sm text-red-500 animate-pulse">
                      {errors.startDate.message}
                    </span>
                  )}
                </div>

                {/* End Date */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="block text-sm font-semibold text-gray-700">End Date</label>
                    <Tooltip>
                      <TooltipTrigger tabIndex={0}>
                        <AiOutlineInfoCircle className="text-orange-400 cursor-pointer" size={16} />
                      </TooltipTrigger>
                      <TooltipContent className="rounded bg-white px-3 py-2 shadow text-gray-700 text-xs">
                        When does your trip end? (Optional)
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="relative">
                    <Input
                      type="date"
                      {...register('endDate')}
                      className={`
                        w-full border-2 rounded-xl px-4 py-3 shadow-sm focus:outline-none transition
                        focus:ring-2 focus:ring-orange-300 focus:border-orange-400
                        ${errors.endDate ? 'border-red-400' : 'border-orange-100'}
                        hover:border-orange-300
                      `}
                      min={getValues('startDate') || todayISO}
                      defaultValue={getValues('endDate')}
                    />
                    <MdOutlineToday className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-300" size={18} />
                  </div>
                  {errors.endDate && (
                    <span className="block mt-1 text-sm text-red-500 animate-pulse">
                      {errors.endDate.message}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between mt-6">
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
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AiOutlineInfoCircle, AiOutlineCheckCircle, AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

type FileWithPreview = File & { preview?: string };

const REQUIRED_FIELDS = [
  {
    key: 'passportPhoto',
    label: 'Passport Photo',
    accept: 'image/jpeg,image/png',
    description: 'Upload a recent color photo (JPEG or PNG, 2x2 inches, <2MB) on a white background.',
    imagePreview: true,
    multiple: false,
  },
  {
    key: 'passportBio',
    label: 'Passport Bio Page',
    accept: 'image/jpeg,image/png,application/pdf,application/docx',
    description: 'Upload a clear scan/photo of your passport’s main (bio) page.',
    imagePreview: true,
    multiple: false,
  },
  {
    key: 'flightItinerary',
    label: 'Flight Itinerary',
    accept: 'application/pdf,image/jpeg,image/png,application/docx',
    description: 'Upload your flight booking confirmation or itinerary.',
    imagePreview: false,
    multiple: false,
  },
  {
    key: 'hotelBooking',
    label: 'Hotel Booking / Accommodation Proof',
    accept: 'application/pdf,image/jpeg,image/png,application/docx',
    description: 'Upload your hotel booking or accommodation proof.',
    imagePreview: false,
    multiple: false,
  },
];

const SUPPORTING_KEY = 'supportingDocuments';

export default function DocumentUploadForm({ onNext, onBack, progress = 0.75, id }: {
  onNext: () => void;
  onBack: () => void;
  progress?: number;
  id: string;
}) {
  const [files, setFiles] = useState<Record<string, FileWithPreview[]>>({});
  const [loading, setLoading] = useState(false);

  // Helper for image preview
  const createPreview = (file: File) =>
    file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;

  // Handle file selection
  const handleInputChange = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []).map(f =>
      Object.assign(f, { preview: createPreview(f) })
    );
    setFiles((prev) => {
      const newFiles = REQUIRED_FIELDS.find(f => f.key === field)?.multiple
        ? (prev[field] || []).concat(selected)
        : selected;
      return { ...prev, [field]: newFiles };
    });
  
  };

  // Remove file from field
  const removeFile = (field: string, idx: number) => {
    setFiles((prev) => {
      const arr = (prev[field] || []).slice();
      arr.splice(idx, 1);
      return { ...prev, [field]: arr };
    });
  };

  // Add supporting documents (multiple)
  const handleSupportingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []).map(f =>
      Object.assign(f, { preview: createPreview(f) })
    );
    setFiles((prev) => ({
      ...prev,
      [SUPPORTING_KEY]: (prev[SUPPORTING_KEY] || []).concat(selected),
    }));
  
  };

  // All required fields must have a file (not empty)
  const allRequiredUploaded = REQUIRED_FIELDS.every(f => files[f.key]?.length);

  // Handle submit & upload
  const handleNext = async () => {
    if (!allRequiredUploaded) {
      toast.error('Please upload all required documents before proceeding.');
      return;
    }

    setLoading(true);
    try {
      // Gather all entries
      const allFields = [...REQUIRED_FIELDS.map(f => f.key), SUPPORTING_KEY];
      for (const field of allFields) {
        const fieldFiles = files[field];
        if (fieldFiles && fieldFiles.length) {
          const formData = new FormData();
          formData.append('id', id);
          formData.append('field', field);
          for (const file of fieldFiles) {
            formData.append('files', file);
          }

       const res = await fetch('/api/upload-local', { method: 'POST', body: formData });
          const data = await res.json();
          if (!res.ok) {
            toast.error(data.error || `Upload failed for ${field}`);
            continue;
          }
          (data.uploads as unknown[])?.forEach((u) => {
            const upload = u as { originalName: string };
            toast.success(`Uploaded ${upload.originalName}`, { icon: <AiOutlineCheckCircle className="text-green-500" /> });
          });
        }
      }
      onNext();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || 'Upload failed.');
      } else {
        toast.error('Upload failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Circular progress indicator SVG
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  function handleFileChange(key: string, e: React.ChangeEvent<HTMLInputElement>): void {
    handleInputChange(key, e);
  }

  return (
    <AnimatePresence>
      <motion.div
        key="document-upload"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -32 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="w-full sm:max-w-xl mx-auto my-4"
      >
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
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-orange-600 mb-1 flex items-center justify-center gap-2">
              Step 3: Upload Required Documents
            </h2>
            <p className="text-gray-600 text-base">Please upload all required documents. Images will preview automatically. You can remove and re-upload if needed.</p>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleNext();
            }}
            className="space-y-6"
          >
            {REQUIRED_FIELDS.map(field => (
              <div key={field.key}>
                <div className="flex items-center gap-1 mb-1">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor={field.key}>
                    {field.label}
                  </label>
                  <AiOutlineInfoCircle size={16} className="text-orange-400" title={field.description} />
                  {(!files[field.key] || files[field.key].length === 0) && (
                    <span title="Required">
                      <span className="text-red-500 text-lg">*</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-2">{field.description}</p>
                <input
                  type="file"
                  id={field.key}
                  accept={field.accept}
                  className="block w-full border-2 border-orange-200 rounded-xl px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition hover:border-orange-300 cursor-pointer text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 file:hover:bg-orange-100"
                  multiple={field.multiple}
                  onChange={e => handleFileChange(field.key, e)}
                  aria-describedby={`${field.key}-description`}
                  style={{}}
                />
                {/* Preview */}
                <div className="flex gap-3 mt-2 flex-wrap">
                  {(files[field.key] || []).map((file, idx) => (
                    <div key={idx} className="relative group">
                      {field.imagePreview && file.preview ? (
                        <Image
                          src={file.preview}
                          alt={file.name}
                          width={96}
                          height={96}
                          className="w-24 h-24 object-cover rounded shadow"
                        />
                      ) : (
                        <span className="inline-block text-xs max-w-[10rem] truncate">{file.name}</span>
                      )}
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
                        onClick={() => removeFile(field.key, idx)}
                        aria-label="Remove"
                      >
                        <AiOutlineDelete className="text-red-500" />
                      </button>
                      {/* Filename tooltip on hover */}
                      <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-2
                          opacity-0 group-hover:opacity-100 pointer-events-none
                          bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap transition"
                          style={{ minWidth: 'max-content' }}>
                        {file.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Supporting documents */}
            <div>
              <div className="flex items-center gap-1 mb-1">
                <label className="block text-sm font-semibold text-gray-700" htmlFor={SUPPORTING_KEY}>
                  Supporting Documents (optional, multiple)
                </label>
                <AiOutlineInfoCircle size={16} className="text-orange-400" title="Upload any additional supporting documents (e.g. invitation letter, employment, financial proof, etc.)" />
              </div>
              <p className="text-xs text-gray-500 mb-2">
                You may upload any additional documents that support your application.
              </p>
              <input
                type="file"
                id={SUPPORTING_KEY}
                multiple
                accept="application/pdf,image/jpeg,image/png"
                onChange={handleSupportingChange}
                className="block w-full border-2 border-orange-200 rounded-xl px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition hover:border-orange-300 cursor-pointer text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 file:hover:bg-orange-100"
              />
              <div className="flex gap-3 mt-2 flex-wrap">
                {(files[SUPPORTING_KEY] || []).map((file, idx) => (
                  <div key={idx} className="relative group">
                    {(file.type.startsWith('image/') || file.type.startsWith('application/')) && file.preview ? (
                      <Image
                        src={file.preview}
                        alt={file.name}
                        width={96}
                        height={96}
                        className="w-24 h-24 object-cover rounded shadow"
                      />
                    ) : (
                      <span className="inline-block text-xs max-w-[10rem] truncate">{file.name}</span>
                    )}
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
                      onClick={() => removeFile(SUPPORTING_KEY, idx)}
                      aria-label="Remove"
                    >
                      <AiOutlineDelete className="text-red-500" />
                    </button>
                    {/* Filename tooltip on hover */}
                    <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-2
                        opacity-0 group-hover:opacity-100 pointer-events-none
                        bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap transition"
                        style={{ minWidth: 'max-content' }}>
                      {file.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto border-orange-200 focus:ring-orange-300"
                onClick={onBack}
                disabled={loading}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all"
                disabled={loading}
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
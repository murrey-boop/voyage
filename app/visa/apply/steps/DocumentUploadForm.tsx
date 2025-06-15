'use client';

import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useDocumentStore } from '@/utils/formStore';
import { uploadDocumentToCloudinary } from '@/utils/upload';
import { useVisaFormStore } from '@/stores/VisaFormStore';



type DocumentUploadFormProps = {
  onNext: () => void;
  onBack: () => void;
  autoUpload?: boolean;
};

export default function DocumentUploadForm({ onNext, onBack, autoUpload = true }: DocumentUploadFormProps) {
  const { visaAppId } = useVisaFormStore();
  const { setValue } = useFormContext();
  const { documents, setDocuments } = useDocumentStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setDocuments(files);
    setValue('documents', files);

    if (!visaAppId) {
       console.warn('VisaApp ID missing — cannot save document to DB');
       return;
    }

    if (autoUpload) {
      for (const file of files) {
        try {
          toast.loading(`Uploading ${file.name}...`);
          const result = await uploadDocumentToCloudinary(file);
          //save to neon
          await fetch('/api/save-document', {
            method: 'POST',
            body: JSON.stringify({
              fileName: file.name,
              fileUrl: result.secure_url,
              publicId: result.public_id,
              visaAppId,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          toast.success(`${file.name} uploaded and saved!`);
          // clear the input field after upload
          if (inputRef.current) {
            inputRef.current.value = '';
          }

          console.log('Uploaded file URL:', result.secure_url);
        } catch (err) {
          console.error(err);
          toast.error(`Failed to upload ${file.name}`);
        }
      }
    }
  };

  const [loading, setLoading] = React.useState(false);
  const documentUrl = documents.length > 0;

  function nextStep(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    if (!documentUrl) {
      toast.error('Please upload at least one document before proceeding.');
      return;
    }
    setLoading(true);
    // Simulate async step or validation if needed
    setTimeout(() => {
      setLoading(false);
      // Call the onNext prop to proceed to the next step
      onNext();
    }, 500);
  }

  return (
    <div className="space-y-4">
      <label htmlFor="documents" className="block font-medium">
        Upload Required Documents
      </label>
      <input
        type="file"
        id="documents"
        ref={inputRef}
        onChange={handleFileChange}
        multiple
        className="block w-full"
      />
      <ul className="list-disc pl-5 text-sm">
        {documents.map((file, idx) => (
          <li key={idx}>{file.name}</li>
        ))}
      </ul>
      {!autoUpload && (
        <Button
          onClick={async () => {
            for (const file of documents) {
              try {
                toast.loading(`Uploading ${file.name}...`);
                await uploadDocumentToCloudinary(file);
                toast.success(`${file.name} uploaded`);
              } catch (err) {
                console.error(err);
                toast.error(`Failed to upload ${file.name}`);
              }
            }
          }}
        >
          Upload All
        </Button>
      )}

      <div className="flex justify-between">
        <Button variant="outline" type="button" onClick={onBack}>
          Back
        </Button>
        <Button
          type="button"
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={nextStep}
          disabled={loading}
        >
          Next
        </Button>
      </div>
    </div>
  );
}



export async function uploadDocumentToCloudinary(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'visa_uploads'); 

for (const [key, value] of formData.entries()) {
  console.log(`${key}: ${value}`);
}



  const res = await fetch('https://api.cloudinary.com/v1_1/ddzoggdqd/auto/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Cloudinary upload failed');

  return await res.json(); // Contains secure_url, public_id, etc.
}

import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { prisma } from '@/lib/db'; 
import path from 'path';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id = formData.get('visaAppId') as string | undefined;
    const field = formData.get('field') as string | undefined;
    const files = formData.getAll('files') as File[];

    if (!id || !field || files.length === 0) {
      return NextResponse.json({ error: 'Missing visaAppId, field, or files' }, { status: 400 });
    }

    type Upload = {
      url: string;
      originalName: string;
      type: string;
      id: string;
      field: string;
      uploadedAt: string;
    };

    const uploads: Upload[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const timestamp = Date.now();
      const ext = path.extname(file.name);
      const fileName = `${id}_${field}_${timestamp}_${Math.random().toString(36).slice(2)}${ext}`;
      const uploadPath = path.join(process.cwd(), 'public', 'uploads', fileName);

      await writeFile(uploadPath, buffer);

      uploads.push({
        url: `/uploads/${fileName}`,
        originalName: file.name,
        type: file.type,
        id,
        field,
        uploadedAt: new Date().toISOString(),
      });

      await prisma.uploadedDocument.create({
        data: {
          id,
          field,
          fileName,
          fileUrl: `/uploads/${fileName}`,
          originalName: file.name,
          fileType: file.type,
          uploadedAt: new Date(),
          fileSize: buffer.length,
          publicId: `${id}_${field}_${timestamp}`,
          visaApp: {
            connect: { id }
          }
        }
      });
    }

    return NextResponse.json({ uploads });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server Error', uploads: [] }, { status: 500 });
  }
}
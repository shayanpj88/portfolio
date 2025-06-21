import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileExtension = path.extname(file.name);
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

  if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }

  const fileName = `${randomUUID()}${fileExtension}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  try {
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    // Return the accessible URL
    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({ url: fileUrl }, { status: 200 });
  } catch (err) {
    console.error('File upload error:', err);
    return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
  }
}

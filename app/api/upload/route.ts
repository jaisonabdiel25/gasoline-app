import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const getCloudinaryPublicId = (url: string): string | null => {
  if (!url.includes("res.cloudinary.com")) return null;
  const parts = url.split("/");
  const uploadIndex = parts.indexOf("upload");
  if (uploadIndex === -1) return null;
  let startIndex = uploadIndex + 1;
  if (parts[startIndex]?.match(/^v\d+$/)) startIndex++;
  return parts.slice(startIndex).join("/").replace(/\.[^/.]+$/, "");
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const oldImageUrl = formData.get("oldImageUrl") as string | null;

    if (oldImageUrl) {
      const publicId = getCloudinaryPublicId(oldImageUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId).catch(() => null);
      }
    }

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de archivo no permitido" },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "El archivo supera el tamaño máximo de 5MB" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const upload = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "avatars" }, (err, result) => {
          if (err) {
            console.error("Cloudinary error:", err);
            reject(err);
          } else {
            resolve(result as UploadApiResponse);
          }
        })
        .end(buffer);
    });

    return NextResponse.json({ url: upload.secure_url });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

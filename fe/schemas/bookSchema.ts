import { z } from "zod";

export const bookPayloadSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  author: z.string().min(1, "Penulis wajib diisi"),
  isbn: z.string().min(1, "ISBN wajib diisi"), // Uniqueness dicek di backend
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  publication_year: z
    .number()
    .int()
    .min(1000, "Tahun tidak valid")
    .max(
      new Date().getFullYear(),
      `Maksimal tahun ${new Date().getFullYear()}`
    ),
  categories: z
    .array(z.string().min(1, "Kategori tidak boleh kosong"))
    .min(1, "Minimal 1 kategori"),
  stock_available: z.number().int().min(0, "Stok tidak boleh negatif"),
  cover_image: z
    .instanceof(File) // File object (untuk FormData)
    .refine((file) => file.size <= 2 * 1024 * 1024, "Ukuran maksimal 2MB")
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "Hanya format JPEG/PNG"
    ),
});

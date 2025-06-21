import { z } from "zod";

export const bookPayloadSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  author: z.string().min(1, "Penulis wajib diisi"),
  isbn: z.string().regex(/^(97(8|9))?\d{9}(\d|X)$/, "Format ISBN tidak valid"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  publication_year: z
    .number()
    .int()
    .min(1000, "Tahun tidak valid")
    .max(new Date().getFullYear()),
  cover_image: z.string().url("Cover harus berupa URL gambar"),
  categories: z.array(z.string()).min(1, "Minimal satu kategori"),
  stock_available: z.number().int().min(0),
});

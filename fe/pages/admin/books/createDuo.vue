<!-- <script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { h } from "vue";
import * as z from "zod";
import { useToast } from "@/components/ui/toast";

definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});

useHead({
  title: "Admin Dashboard",
});

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(100),
    author: z.string().min(2).max(50),
    description: z.string().min(10),
    categories: z
      .array(
        z.enum([
          "children",
          "adventure",
          "fiction",
          "non-fiction",
          "science",
          "history",
        ])
      )
      .nonempty(),
    isbn: z
      .string()
      .regex(/^(?:\d{9}[\dXx]|\d{13})$/)
      .optional(),
    publication_year: z
      .number()
      .int()
      .min(1900)
      .max(new Date().getFullYear())
      .optional(),
    stock_available: z.number().int().min(0).default(0).optional(),
    cover_image: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.type.startsWith("image/"), {
        message: "Hanya file gambar yang diperbolehkan",
      }),
  })
);

const { toast } = useToast();
const createBook = useBookStore();
const error = ref<string | null>(null);

const { handleSubmit, isFieldDirty } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    error.value = null;
    await createBook.addBook(values);

    toast({
      title: "Book Added Successfully!",
      description: "Your book has been added to the collection.",
    });

    // Reset form atau navigasi jika perlu
    // form.value = { ...defaultValues };
    // atau navigateTo('/books');
  } catch (e: any) {
    error.value = e.message || "Failed to add book";
    toast({
      title: "Error",
      description: error.value,
      variant: "destructive",
    });
  }
});
</script>

<template>
  <form class="w-2/3 space-y-6" @submit="onSubmit">
    <FormField
      v-slot="{ componentField }"
      name="username"
      :validate-on-blur="!isFieldDirty"
    >
      <FormItem v-auto-animate>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription> This is your public display name. </FormDescription>
        <FormMessage />
      </FormItem>
      <FormItem v-auto-animate>
        <FormLabel>Author</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription> This is your public display name. </FormDescription>
        <FormMessage />
      </FormItem>
      <FormItem v-auto-animate>
        <FormLabel>Publication Year</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription> This is your public display name. </FormDescription>
        <FormMessage />
      </FormItem>
      <FormItem v-auto-animate>
        <FormLabel>ISBN</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription> This is your public display name. </FormDescription>
        <FormMessage />
      </FormItem>
      <FormItem v-auto-animate>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription> This is your public display name. </FormDescription>
        <FormMessage />
      </FormItem>
      <FormItem v-auto-animate>
        <FormLabel>Category</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription> This is your public display name. </FormDescription>
        <FormMessage />
      </FormItem>
      <FormItem v-auto-animate>
        <FormLabel>Stock Available</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription> This is your public display name. </FormDescription>
        <FormMessage />
      </FormItem>
      <FormItem v-auto-animate>
        <FormLabel>Cover Book</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription> This is your public display name. </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit"> Submit </Button>
  </form>
</template> -->

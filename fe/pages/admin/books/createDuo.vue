<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useToast } from "@/components/ui/toast";
import { bookPayloadSchema } from "@/schemas/bookSchema"; 

definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});

useHead({
  title: "Add New Book",
});

const { toast } = useToast();
const createBook = useBookStore();
const error = ref(""); // Menggunakan string kosong sebagai default

const { handleSubmit, defineField, setFieldValue } = useForm({
  validationSchema: toTypedSchema(bookPayloadSchema),
});

// Definisikan field-field form
const [title, titleAttrs] = defineField("title");
const [author, authorAttrs] = defineField("author");
const [description, descriptionAttrs] = defineField("description");
const [categories, categoriesAttrs] = defineField("categories");
const [isbn, isbnAttrs] = defineField("isbn");
const [publicationYear, publicationYearAttrs] = defineField("publication_year");
const [stockAvailable, stockAvailableAttrs] = defineField("stock_available");
const [coverImage, coverImageAttrs] = defineField("cover_image");

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    setFieldValue("cover_image", input.files[0]);
  }
};

const onSubmit = handleSubmit(async (values) => {
  try {
    error.value = "";
    // await createBook.addBook(values);

    toast({
      title: "Book Added Successfully!",
      description: "Your book has been added to the collection.",
    });
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
    <FormField v-slot="{ componentField }" name="title">
      <FormItem v-auto-animate>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter book title" v-bind="titleAttrs" />
        </FormControl>
        <FormDescription>The title of the book</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="author">
      <FormItem v-auto-animate>
        <FormLabel>Author</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter author name" v-bind="authorAttrs" />
        </FormControl>
        <FormDescription>The author of the book</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="publication_year">
      <FormItem v-auto-animate>
        <FormLabel>Publication Year</FormLabel>
        <FormControl>
          <Input
            type="number"
            placeholder="Enter publication year"
            v-bind="publicationYearAttrs"
          />
        </FormControl>
        <FormDescription>The year the book was published</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="isbn">
      <FormItem v-auto-animate>
        <FormLabel>ISBN</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter ISBN" v-bind="isbnAttrs" />
        </FormControl>
        <FormDescription>The book's ISBN number</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="description">
      <FormItem v-auto-animate>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea
            placeholder="Enter book description"
            v-bind="descriptionAttrs"
          />
        </FormControl>
        <FormDescription>A brief description of the book</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="categories">
      <FormItem v-auto-animate>
        <FormLabel>Categories</FormLabel>
        <FormControl>
          <Select v-bind="categoriesAttrs" multiple>
            <SelectTrigger>
              <SelectValue placeholder="Select categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="children">Children</SelectItem>
              <SelectItem value="adventure">Adventure</SelectItem>
              <SelectItem value="fiction">Fiction</SelectItem>
              <SelectItem value="non-fiction">Non-Fiction</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="history">History</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormDescription>Select at least one category</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="stock_available">
      <FormItem v-auto-animate>
        <FormLabel>Stock Available</FormLabel>
        <FormControl>
          <Input
            type="number"
            placeholder="Enter stock quantity"
            v-bind="stockAvailableAttrs"
          />
        </FormControl>
        <FormDescription>Number of copies available</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="cover_image">
      <FormItem v-auto-animate>
        <FormLabel>Cover Image</FormLabel>
        <FormControl>
          <Input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            @change="handleFileUpload"
          />
        </FormControl>
        <FormDescription>Upload a cover image (JPEG/PNG, max 2MB)</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit">Submit</Button>
    
    <div v-if="error" class="text-red-500">
      {{ error }}
    </div>
  </form>
</template>
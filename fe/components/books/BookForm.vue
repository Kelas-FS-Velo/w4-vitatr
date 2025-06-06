<template>
  <form @submit.prevent="submit">
    <input v-model="form.title" placeholder="Title" required class="border" />
    <input v-model="form.author" placeholder="Author" required class="border" />
    <input v-model="form.isbn" placeholder="ISBN" required class="border" />
    <input v-model="form.catalog" placeholder="Catalog" required class="border" />
    <input type="file" @change="uploadCover" />
    <img v-if="form.cover_img" :src="form.cover_img" alt="Cover" class="w-32 mt-2" />

    <button type="submit" class="bg-blue-500 text-white p-2 mt-2">{{ isEdit ? 'Update' : 'Add' }}</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useBookStore } from '~/stores/books'

const props = defineProps({
  book: Object
})
const emit = defineEmits(['saved'])

const bookStore = useBookStore()
const isEdit = ref(!!props.book)
const form = ref({
  title: props.book?.title || '',
  author: props.book?.author || '',
  isbn: props.book?.isbn || '',
  catalog: props.book?.catalog || '',
  cover_img: props.book?.cover_img || ''
})

async function uploadCover(e) {
  const file = e.target.files[0]
  const formData = new FormData()
  formData.append('file', file)

  const res = await $fetch('/api/upload-cover', {
    method: 'POST',
    body: formData
  })
  form.value.cover_img = res.url
}

async function submit() {
  if (isEdit.value) {
    await bookStore.updateBook(props.book.id, form.value)
  } else {
    await bookStore.addBook(form.value)
  }
  emit('saved')
}
</script>

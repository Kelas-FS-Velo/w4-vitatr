<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Pinjam Buku</h2>
    <form @submit.prevent="submit">
      <label>Buku</label>
      <select v-model="form.book_id" required>
        <option v-for="book in books" :value="book.id">{{ book.title }}</option>
      </select>

      <label>Tanggal Pinjam</label>
      <input type="date" v-model="form.borrowed_at" required />

      <label>Batas Pengembalian</label>
      <input type="date" v-model="form.due_at" required />

      <button type="submit" class="btn mt-4">Pinjam</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLoanStore } from '~/stores/loans'

const form = ref({
  book_id: 0,
  borrowed_at: '',
  due_at: ''
})

const books = ref([])
const loanStore = useLoanStore()

onMounted(async () => {
  const res = await $fetch('/api/books')
  books.value = res
})

const submit = async () => {
  await loanStore.createLoan(form.value)
  alert('Peminjaman berhasil')
}
</script>

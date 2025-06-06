<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Daftar Peminjaman</h2>
    <table class="table-auto w-full text-left">
      <thead>
        <tr>
          <th>User</th>
          <th>Buku</th>
          <th>Pinjam</th>
          <th>Jatuh Tempo</th>
          <th>Kembali</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="loan in loanStore.loans" :key="loan.id">
          <td>{{ loan.user?.name }}</td>
          <td>{{ loan.book?.title }}</td>
          <td>{{ loan.borrowed_at }}</td>
          <td>{{ loan.due_at }}</td>
          <td>{{ loan.returned_at || 'Belum' }}</td>
          <td>
            <button
              v-if="!loan.returned_at"
              @click="handleReturn(loan.id)"
              class="text-blue-600 underline"
            >
              Kembalikan
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useLoanStore } from '~/stores/loans'

const loanStore = useLoanStore()

onMounted(() => {
  loanStore.fetchLoans()
})

const handleReturn = async (id: number) => {
  await loanStore.returnLoan(id)
  await loanStore.fetchLoans()
}
</script>

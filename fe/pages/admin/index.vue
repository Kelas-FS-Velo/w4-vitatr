<script setup lang="ts">
definePageMeta({
  layout: "admin", // <== layout ini akan pakai layouts/admin.vue
  middleware: ["admin"],
});

useHead({
  title: "Admin Dashboard",
});
// Contoh data dummy, bisa ambil dari API juga
const stats = [
  { label: "Total Buku", value: 120 },
  { label: "Peminjaman Aktif", value: 35 },
  { label: "User Terdaftar", value: 50 },
];
</script>

<template>
  <div>
    <!-- Header -->
    <HeaderAdmin />
    <div class="container lg:grid lg:grid-cols-12 lg:gap-10">
      <!-- Sidebar -->
      <SidebarAdmin
        class="sticky top-[65px] hidden h-[calc(100vh-65px)] py-5 lg:col-span-3 lg:block"
      />

      <!-- Main Section -->
      <main class="py-5 lg:col-span-6">
        <!-- Status Cards -->
        <StatusCard />
        <!-- New customer list -->
        <NewCustomers />
        <!-- Charts -->
        <SalesChart />
        <!-- Recent orders -->
        <RecentOrders />
      </main>
      <div class="hidden py-5 lg:col-span-3 lg:block">
        <!-- Profile info to the side -->
        <ProfileInfo />
        <hr class="my-5" />
        <!-- Reminders to the side -->
        <Reminders />
      </div>
    </div>
  </div>
</template>

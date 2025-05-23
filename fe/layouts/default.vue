<script setup lang="ts"></script>

<template>
  <div
    class="bg-[radial-gradient(ellipse_150%_100%_at_bottom_left,_#FFF4CC,_#FFFAF0_60%)] dark:bg-[radial-gradient(ellipse_150%_100%_at_bottom_left,_#1E1B14,_#2C261A_60%)]"
  >
    <Navbar />
    <div>
      <slot />
    </div>
    <Footer />
  </div>
</template>

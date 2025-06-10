<template>
  <header class="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
    <!-- Container of flex -->
    <div class="px-4 flex h-16 items-center justify-between">
      <!-- Logo and page title -->
      <div class="flex items-center gap-3">
        <!-- Burger Menu for Mobile -->
        <button
          @click="openMenu"
          aria-label="Open menu"
          class="flex h-9 w-9 items-center justify-center rounded-full border bg-background lg:hidden"
        >
          <span class="sr-only">Open menu</span>
          <Icon name="heroicons:bars-2" />
        </button>
        <!-- Logo -->
        <img
          src="https://randomuser.me/api/portraits/med/men/75.jpg"
          alt="Analytics logo"
          class="h-7 w-7 object-contain"
        />
        <!-- Page title -->
        <NuxtLink class="text-xl font-bold" to="/">Analytics</NuxtLink>
      </div>

      <!-- Right side of header -->
      <div class="flex items-center gap-5">
        <button
          @click="toggleTheme"
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background"
        >
          <Icon name="heroicons:sun" class="h-5 w-5" />
        </button>

        <!-- Profile Dropdown menu -->
        <!-- <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink> -->
        <!-- <Button @click.prevent="logoutUser">Logout</Button> -->
        <div class="inline-flex gap-1 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span class="">{{ auth.user?.name }}!</span>
        </div>
        <!-- <HMenu as="div" class="relative">
          <HMenuButton
            class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border bg-background"
          >
            <img
              src="https://randomuser.me/api/portraits/med/men/75.jpg"
              alt="Logged in user"
              class="h-full w-full"
            />
          </HMenuButton>
          <TransitionScale :scale="0.8" origin="top right">
            <HMenuItems
              class="absolute right-0 z-10 mt-3 w-48 rounded-md border bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div class="border-b px-3 py-1.5 text-sm">
                <p class="font-semibold">Hello John</p>
                <a
                  href="mailto:johndoe@test.com"
                  class="leading-none text-muted-foreground"
                  >johndoe@test.com</a
                >
              </div>
              <div class="p-1">
                <template v-for="(p, i) in profileMenuOptions" :key="i">
                  <template v-if="!p.divider">
                    <HMenuItem v-slot="slotProps">
                      <button
                        :class="[slotProps?.active ? 'bg-muted' : '']"
                        class="inline-flex w-full items-center rounded-md p-2 text-sm font-medium"
                      >
                        {{ p.title }}
                      </button>
                    </HMenuItem>
                  </template>
                  <template v-else>
                    <hr class="my-1" />
                  </template>
                </template>
              </div>
            </HMenuItems>
          </TransitionScale>
        </HMenu> -->
      </div>
    </div>
    <!-- Mobile menu -->
    <!-- <MobileMenu v-model="isOpen" /> -->
  </header>
</template>

<script setup lang="ts">
const mode = useColorMode();
const toggleTheme = () => {
  mode.value = mode.value === "dark" ? "light" : "dark";
};

const props = defineProps<{
  isOpen: boolean;
}>();
const emit = defineEmits(["update:isOpen"]);

function openMenu() {
  emit("update:isOpen", true);
}

const auth = useAuthStore();

function logoutUser() {
  auth.logout().then(() => {
    navigateTo("/");
  });
}

// Items that will be displayed in menu
// const profileMenuOptions = [
//   { title: "Profile" },
//   { title: "Billing" },
//   { title: "Settings" },
//   { title: "Team members" },
//   { title: "Sales" },
//   { divider: true },
//   { title: "Logout" },
// ];

// Used to open/close menu
const isOpen = ref(false);
</script>

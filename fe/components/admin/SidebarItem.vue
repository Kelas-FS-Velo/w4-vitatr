<template>
  <div class="flex flex-col">
    <template v-for="(item, index) in links" :key="index">
      <!-- === Simple Link === -->
      <NuxtLink
        v-if="item.path && !item.children"
        :to="item.path"
        :class="[
          'inline-flex items-center gap-4 p-3 px-4 text-left text-[15px] transition-all border-l-4',
          isActive(item.path)
            ? 'border-primary text-primary font-medium bg-muted'
            : 'border-transparent hover:border-border hover:bg-muted/50',
        ]"
      >
        <Icon
          v-if="item.icon"
          :name="item.icon"
          class="h-5 w-5 text-muted-foreground"
        />
        <span class="truncate">{{ item.title }}</span>
      </NuxtLink>

      <!-- === Dropdown with Children === -->
      <Disclosure
        v-else-if="item.children"
        v-slot="{ open }"
        as="div"
        class="w-full"
      >
        <DisclosureButton
          :class="[
            'inline-flex w-full items-center justify-between p-3 px-4 text-left text-[15px] transition-all border-l-4',
            isDropdownActive(item.children)
              ? 'border-primary text-primary font-medium bg-muted'
              : 'border-transparent hover:border-border hover:bg-muted/50',
          ]"
        >
          <!-- item books dan loans -->
          <div class="flex items-center gap-4">
            <Icon :name="item.icon!" class="h-5 w-5 text-muted-foreground" />
            <span class="truncate">{{ item.title }}</span>
          </div>
          <!-- Icon dropdown -->
          <Icon
            name="heroicons:chevron-down"
            :class="[
              open ? 'rotate-180' : '',
              'h-4 w-4 text-muted-foreground transition-transform duration-300',
            ]"
          />
        </DisclosureButton>

        <DisclosurePanel class="flex flex-col gap-1 pl-10">
          <NuxtLink
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.path"
            :class="[
              'rounded-md px-3 py-1.5 text-sm',
              isActive(child.path)
                ? 'bg-primary/10 text-primary font-medium'
                : 'hover:bg-muted',
            ]"
          >
            {{ child.title }}
          </NuxtLink>
        </DisclosurePanel>
      </Disclosure>

      <!-- === Action Button (e.g., Logout) === -->
      <button
        v-else-if="item.action === 'logout'"
        @click.prevent="logoutUser"
        class="inline-flex items-center gap-4 p-3 px-4 text-left text-[15px] w-full border-l-4 border-transparent hover:border-border hover:bg-muted/50"
      >
        <Icon :name="item.icon!" class="h-5 w-5 text-muted-foreground" />
        <span class="truncate">{{ item.title }}</span>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { useAuthStore } from "~/stores/auth"; // atau sesuaikan dengan path-mu

const route = useRoute();
const auth = useAuthStore();

defineProps<{
  links?: Array<{
    title: string;
    icon?: string;
    path?: string;
    children?: { title: string; path: string }[];
    action?: "logout";
  }>;
}>();

function logoutUser() {
  auth.logout().then(() => {
    navigateTo("/");
  });
}

function isActive(path: string) {
  return route.path === path;
}

function isDropdownActive(children: { path: string }[]) {
  return children.some((child) => isActive(child.path));
}
</script>

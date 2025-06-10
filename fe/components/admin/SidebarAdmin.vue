<template>
  <aside>
    <div
      class="flex h-full w-full flex-col gap-5 overflow-y-auto rounded-md border bg-card pb-5 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent scrollbar-thumb-rounded-full"
    >
      <SidebarItem :links="menu" />
      <div class="mt-auto">
        <SidebarItem :links="bottomMenu" />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
type SidebarLink = {
  title: string;
  icon?: string;
  path?: string;
  children?: { title: string; path: string }[];
  action?: "logout";
};

const menu: SidebarLink[] = [
  {
    title: "Dashboard",
    icon: "heroicons:home",
    path: "/admin",
  },
  {
    title: "Books",
    icon: "heroicons:book-open",
    children: [
      { title: "List", path: "/admin/books/list" },
      { title: "Create", path: "/admin/books/create" },
    ],
  },
  {
    title: "Loans",
    icon: "heroicons:shopping-cart",
    children: [
      { title: "List", path: "/admin/loans/list" },
      { title: "Create", path: "/admin/loans/create" },
    ],
  },
  {
    title: "Users",
    icon: "heroicons:user-group",
    path: "/admin/users",
  },
];

const bottomMenu: SidebarLink[] = [
  {
    title: "Settings",
    icon: "heroicons:cog-8-tooth",
    path: "/admin/settings",
  },
  {
    title: "Logout",
    icon: "heroicons:arrow-left-on-rectangle",
    action: "logout",
  },
];
</script>

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore();

  // Kalau belum login
  if (!auth.user) {
    return navigateTo("/auth/login");
  }

  // Kalau bukan admin
  if (auth.user.role !== "admin") {
    return navigateTo("/dashboard"); // atau halaman 403 custom
  }
});

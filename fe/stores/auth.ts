import { defineStore } from 'pinia'

interface IUser {
  name: string
  email: string
  role?: 'admin' | 'user'
}

export const useAuthStore = defineStore('auth', () => {
  const { user, login, logout } = useSanctum<IUser>()
  const isLoggedIn = computed(() => !!user.value)

  return {
    user,
    isLoggedIn,
    login,
    logout,
  }
})

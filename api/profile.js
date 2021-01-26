import { request } from '@/plugins/request'
export const getProfile = username => request(`/api/profiles/${username}`, {
  method: "GET"
})

if (typeof window !== 'undefined') {
  window.getProfile = getProfile
}
export const follow = username => request(`/api/profiles/${username}/follow`, {
  method: "POST"
})

export const unfollow = username => request(`/api/profiles/${username}/follow`, {
  method: "DELETE"
})
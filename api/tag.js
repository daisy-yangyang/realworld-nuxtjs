import { request } from '@/plugins/request'

// 获取标签列表
export const getTags = () => request("/api/tags", {
  method: "GET",
})
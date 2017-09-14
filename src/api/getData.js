import http from '@/util/ajax'

export const topics = () => http.get('/api/v1/topics/')

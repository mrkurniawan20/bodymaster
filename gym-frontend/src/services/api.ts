import axios from 'axios';

export const api = axios.create({
  baseURL: '/member',
});

export function getMember(id: string) {
  return api.get('/getmember/:id', { params: { id } });
}

import axios from 'axios';
import queryString from 'query-string';
import { PaintingInterface, PaintingGetQueryInterface } from 'interfaces/painting';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPaintings = async (
  query?: PaintingGetQueryInterface,
): Promise<PaginatedInterface<PaintingInterface>> => {
  const response = await axios.get('/api/paintings', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPainting = async (painting: PaintingInterface) => {
  const response = await axios.post('/api/paintings', painting);
  return response.data;
};

export const updatePaintingById = async (id: string, painting: PaintingInterface) => {
  const response = await axios.put(`/api/paintings/${id}`, painting);
  return response.data;
};

export const getPaintingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/paintings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePaintingById = async (id: string) => {
  const response = await axios.delete(`/api/paintings/${id}`);
  return response.data;
};

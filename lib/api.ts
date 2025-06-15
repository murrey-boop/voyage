
interface ApiResponse<T> {
  data: T;
  error?: string;
}

interface TourFilters {
  [key: string]: string | number | boolean | Array<string | number | boolean> | undefined | null;
}

interface Tour {
  id: string;
  name: string;
  description?: string;
  price?: number;
}

export const fetchTours = async (filters: TourFilters): Promise<ApiResponse<Tour[]>> => {
  const query = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => query.append(key, v.toString()));
      } else {
        query.append(key, value.toString());
      }
    }
  });

  try {
    const res = await fetch(`/api/tours?${query}`);
    return { data: await res.json() };
  } catch (error) {
    return { data: [], error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const fetchRecommendations = async (userId?: string): Promise<ApiResponse<Tour[]>> => {
  try {
    const res = await fetch(`/api/recommendations${userId ? `?userId=${userId}` : ''}`);
    return { data: await res.json() };
  } catch (error) {
    return { data: [], error: error instanceof Error ? error.message : 'Unknown error' };
  }
};
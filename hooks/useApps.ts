// hooks/useApps.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

type App = {
  app_id: string;
  app_name: string;
  is_active: boolean;
  production: boolean;
  translations_done: string;
  api_calls: string;
  client_id: string;
};

type Origin = {
  id: number;
  app_id: string;
  client_id: string;
  is_active: boolean;
  production: boolean;
  api_calls: string;
  origin: string;
};

type CreateAppInput = {
  app_name: string;
};

type UpdateAppInput = {
  app_id: string;
  is_active?: boolean;
  production?: boolean;
};

type DeleteAppInput = {
  app_id: string;
};

type AddOriginInput = {
  app_id: string;
  origins: string; // example: http://localhost:5173
};

export const useApps = (token: string) => {
  const queryClient = useQueryClient();
  // 🔹 GET all apps
  const appsQuery = useQuery<App[]>({
    queryKey: ['apps'],
    queryFn: async () => {
      const res = await apiClient.get('/api/v1/apps', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
    enabled: !!token, // Only run this query if the token exists
  });

  // 🔹 CREATE app
  const createAppMutation = useMutation({
    mutationFn: async (input: CreateAppInput) => {
      const res = await apiClient.post('/api/v1/apps', input, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] });
    },
  });

  // 🔹 UPDATE app
  const updateAppMutation = useMutation({
    mutationFn: async (input: UpdateAppInput) => {
      const res = await apiClient.put('/api/v1/apps', input, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] });
    },
  });

  // 🔹 DELETE app
  const deleteAppMutation = useMutation({
    mutationFn: async ({ app_id }: DeleteAppInput) => {
      console.log(app_id,"app_id")
      const res = await apiClient.delete(`/api/v1/apps/${app_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] });
    },
  });

  // 🔹 ADD origin
  const addOriginMutation = useMutation({
    mutationFn: async (input: AddOriginInput) => {
      const res = await apiClient.post(
        `/api/v1/origins?app_id=${input.app_id}`,
        { origins: input.origins },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
    onSuccess: (_, { app_id }) => {
      queryClient.invalidateQueries({ queryKey: ['origins', app_id] });
    },
  });

  // 🔹 GET origins for an app
  const useGetOriginsQuery = (app_id: string) =>
    useQuery<Origin[]>({
      queryKey: ['origins', app_id],
      queryFn: async () => {
        const res = await apiClient.get(`/api/v1/origins?app_id=${app_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data;
      },
      enabled: !!app_id,
    });

  return {
    appsQuery,
    createApp: createAppMutation.mutate,
    updateApp: updateAppMutation.mutate,
    deleteApp: deleteAppMutation.mutate,
    addOrigin: addOriginMutation.mutate,
    useGetOriginsQuery,
    // Optional for async/await use
    createAppMutation,
    updateAppMutation,
    deleteAppMutation,
    addOriginMutation,
  };
};

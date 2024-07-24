import { callExternalApi } from "./external-api.service";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;
console.log('API Server URL:', apiServerUrl);

export const getPublicResource = async () => {
  console.log('Calling getPublicResource');
  const config = {
    url: `${apiServerUrl}/api/messages/public`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };
  console.log('API request config:', config);

  const { data, error } = await callExternalApi<any>({ config });
  console.log('API response:', { data, error });

  return {
    data: data || null,
    error,
  };
};

export const getProtectedResource = async (accessToken: string) => {
  const config = {
    url: `${apiServerUrl}/api/messages/protected`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi<any>({ config });

  return {
    data: data || null,
    error,
  };
};

export const getAdminResource = async (accessToken: string) => {
  const config = {
    url: `${apiServerUrl}/api/messages/admin`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi<any>({ config });

  return {
    data: data || null,
    error,
  };
};

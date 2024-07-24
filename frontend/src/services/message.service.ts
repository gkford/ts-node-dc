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
    timeout: 5000, // 5 seconds timeout
  };
  console.log('API request config:', config);

  try {
    const { data, error } = await callExternalApi<any>({ config });
    console.log('API response:', { data, error });
    return {
      data: data || null,
      error,
    };
  } catch (error) {
    console.error('Error in getPublicResource:', error);
    return {
      data: null,
      error: {
        message: 'Failed to fetch public resource',
        details: error,
      },
    };
  }
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

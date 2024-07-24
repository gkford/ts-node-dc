import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface ApiOptions {
  config: AxiosRequestConfig;
}

interface ApiResponse<T> {
  data: T | null;
  error: { message: string; details?: unknown } | null;
}

// Assuming a standard error response format from the API
interface ApiErrorResponse {
  message: string;
}

export const callExternalApi = async <T>(options: ApiOptions): Promise<ApiResponse<T>> => {
  console.log('Calling external API with options:', options);
  try {
    const response: AxiosResponse<T> = await axios(options.config);
    const { data } = response;
    console.log('API call successful. Response:', data);
    return {
      data,
      error: null,
    };
  } catch (error: unknown) {
    console.error('API call failed. Error:', error);
    let message = "HTTP request failed";
    let details: unknown = null;

    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      console.error('Axios error details:', {
        message: axiosError.message,
        code: axiosError.code,
        response: axiosError.response?.data,
      });

      if (axiosError.code === 'ECONNABORTED') {
        message = "Request timed out";
      } else if (axiosError.response) {
        const responseData = axiosError.response.data;

        // Check if the response data conforms to ApiErrorResponse
        if (typeof responseData === 'object' && responseData !== null && 'message' in responseData) {
          message = (responseData as ApiErrorResponse).message;
        } else {
          message = "Unexpected error response format";
          details = responseData;
        }
      } else if (axiosError.message) {
        message = axiosError.message;
      }

      return {
        data: null,
        error: {
          message,
          details,
        },
      };
    }

    // Handle non-Axios errors (e.g., network errors)
    return {
      data: null,
      error: {
        message: (error as Error).message,
        details: error,
      },
    };
  }
};

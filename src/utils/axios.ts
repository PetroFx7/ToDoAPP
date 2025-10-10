import axios from "axios";

export const TOKEN_TYPE = "Bearer";
export const ACCESS_TOKEN = "accessToken";
export const AUTH_HEADER = "Authorization";

const baseUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}` : "/api";

const request = axios.create({
  baseURL: baseUrl,
});
const refreshTokenIns = axios.create({
  baseURL: baseUrl,
});

refreshTokenIns.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken) {
      const headers = config?.headers ?? {};
      if (headers) {
        config.headers = {
          [AUTH_HEADER]: `${TOKEN_TYPE} ${accessToken}`,
          ...config.headers,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error).then();
  },
);

request.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken) {
      const headers = config?.headers ?? {};
      if (headers) {
        config.headers = {
          [AUTH_HEADER]: `${TOKEN_TYPE} ${accessToken}`,
          ...config.headers,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

request.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line require-await
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (originalRequest.url === "/auth/login" && response.status === 401) {
      throw new Error(
        JSON.stringify({
          message: "Invalid credentials",
          status: 401,
        }),
      );
    }

    if (originalRequest.url === "/auth/password" && response.status === 401) {
      throw new Error(
        JSON.stringify({
          message: "Invalid credentials",
          status: 401,
        }),
      );
    }

    if (axios.isCancel(error)) {
      throw new Error(
        JSON.stringify({
          message: "canceled",
          status: "canceled",
        }),
      );
    }

    if (response?.status === 401) {
      // if (!isRefreshing) {
      //   isRefreshing = true;
      //
      //   return refreshTokenIns
      //     .post("/auth/refresh", {}, { withCredentials: true })
      //     .then((resp) => {
      //       if (resp?.status === 201) {
      //         const newAccessToken = resp?.data?.access_token;
      //         localStorage.setItem(ACCESS_TOKEN, newAccessToken);
      //         request.defaults.headers.common[AUTH_HEADER] =
      //                           `${ACCESS_TOKEN} ${newAccessToken}`;
      //         originalRequest.headers[AUTH_HEADER] =
      //                           `${TOKEN_TYPE} ${newAccessToken}`;
      //         isRefreshing = false;
      //         refreshQueue.forEach((resolve: () => void) => resolve());
      //         refreshQueue = [];
      //
      //         return request(originalRequest);
      //       }
      //     })
      //     .catch((resp) => {
      //       console.error(resp);
      //     });
      // } else {
      //   return new Promise((resolve) => {
      //     refreshQueue.push(() => {
      //       originalRequest.headers[AUTH_HEADER] =
      //                       `${TOKEN_TYPE} ${localStorage.getItem(ACCESS_TOKEN)}`;
      //       resolve(request(originalRequest));
      //     });
      //   });
      // }
    } else {
      return Promise.reject(error);
    }
  },
);


export default request;

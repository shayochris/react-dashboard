import { HTTP_UNAUTHORIZED } from "#/api/http-status-codes";
import { lsKeys, lStorage } from "#/utils/local-storage";
import axios from "axios";

type RefreshTokenResponse = {
    accessToken: string;
    refreshToken: string;
};

let isRefreshing = false;

let failedRequests: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

const resolveAll = (token: string) => {
    failedRequests.forEach((request) => request.resolve(token));
    failedRequests = [];
};

const rejectAll = (error: unknown) => {
    failedRequests.forEach((request) => request.reject(error));
    failedRequests = [];
};

const refreshAuthtokens = async (): Promise<RefreshTokenResponse> => {
    const refreshInstance = axios.create({
        baseURL: process.env.API_BASE_URL,
    });

    const refreshToken = lStorage.get<string>(lsKeys.TOKENS.REFRESH);

    const response = await refreshInstance.post<RefreshTokenResponse>(
        "/auth/refresh",
        {
            refreshToken,
        },
    );

    lStorage.set(lsKeys.TOKENS.ACCESS, response.data.accessToken);
    lStorage.set(lsKeys.TOKENS.REFRESH, response.data.refreshToken);

    return response.data;
};

export const axiosClient = axios.create({
    baseURL: process.env.API_BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
    const accessToken = lStorage.get<string>(lsKeys.TOKENS.ACCESS);

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const shouldReject =
            error.response?.status !== HTTP_UNAUTHORIZED ||
            originalRequest._retry;

        if (shouldReject) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedRequests.push({ resolve, reject });
            }).then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axiosClient(originalRequest);
            });
        }

        isRefreshing = true;
        originalRequest._retry = true;

        try {
            const { accessToken } = await refreshAuthtokens();

            resolveAll(accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axiosClient(originalRequest);
        } catch (refreshError) {
            rejectAll(refreshError);
            lStorage.removeMultiple([
                lsKeys.TOKENS.ACCESS,
                lsKeys.TOKENS.REFRESH,
            ]);

            window.location.href = "/login";
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    },
);

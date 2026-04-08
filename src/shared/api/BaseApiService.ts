import { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { httpClient } from "./httpClient";

export class ApiRequestError extends Error {
  public readonly status?: number;
  public readonly details?: unknown;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.details = details;
  }
}

export abstract class AbstractAxiosService {
  protected readonly client: AxiosInstance;

  protected constructor(client: AxiosInstance = httpClient) {
    this.client = client;
  }

  protected async request<TResponse, TBody = unknown>(
    config: AxiosRequestConfig<TBody>,
  ): Promise<TResponse> {
    try {
      const response: AxiosResponse<TResponse> = await this.client.request<TResponse>(config);
      return response.data;
    } catch (error) {
      throw this.normalizeError(error);
    }
  }

  protected get<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> {
    return this.request<TResponse>({ ...config, method: "GET", url });
  }

  protected post<TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig<TBody>,
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>({ ...config, method: "POST", url, data });
  }

  protected put<TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig<TBody>,
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>({ ...config, method: "PUT", url, data });
  }

  protected patch<TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig<TBody>,
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>({ ...config, method: "PATCH", url, data });
  }

  protected delete<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> {
    return this.request<TResponse>({ ...config, method: "DELETE", url });
  }

  private normalizeError(error: unknown): ApiRequestError {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const details = error.response?.data;
      const message =
        error.response?.data && typeof error.response.data === "object"
          ? JSON.stringify(error.response.data)
          : error.message;

      return new ApiRequestError(message, status, details);
    }

    if (error instanceof Error) {
      return new ApiRequestError(error.message);
    }

    return new ApiRequestError("Unknown API request error");
  }
}

export abstract class BaseApiService extends AbstractAxiosService {}

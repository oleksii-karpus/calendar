import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { env } from '../../env';
import { AxiosRequest, IAxiosAdapter } from '../types/axios.adapter';

class AxiosAdapter implements IAxiosAdapter {
    #adapter: AxiosInstance;

    constructor() {
        this.#adapter = axios.create({
            baseURL: env.urls.holidayApi
        });
    }

    doDelete<T>(dto: AxiosRequest): AxiosPromise<T> {
        const { url, headers, queryParams } = dto;
        return this.#adapter.delete(url, {
            headers,
            params: queryParams
        });
    }

    doGet<T>(dto: AxiosRequest): AxiosPromise<T> {
        const { url, headers, queryParams } = dto;
        return this.#adapter.get(url, {
            headers,
            params: queryParams
        });
    }

    doPatch<T>(dto: AxiosRequest): AxiosPromise<T> {
        const { url, payload, headers, queryParams } = dto;
        return this.#adapter.patch(url, payload, {
            headers,
            params: queryParams
        });
    }

    doPost<T>(dto: AxiosRequest): AxiosPromise<T> {
        const { url, payload, headers, queryParams } = dto;
        return this.#adapter.post(url, payload, {
            headers,
            params: queryParams
        });
    }

    doPut<T>(dto: AxiosRequest): AxiosPromise<T> {
        const { url, payload, headers, queryParams } = dto;
        return this.#adapter.put(url, payload, {
            headers,
            params: queryParams
        });
    }
}

export const axiosAdapter = new AxiosAdapter();

import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {Config} from '../config';

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  refetchOnFocus: true,
});

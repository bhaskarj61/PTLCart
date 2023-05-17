import {api} from '../../api';
import listing from './listing';

export const listingApi = api.injectEndpoints({
  endpoints: build => ({
    fetchList: listing(build),
  }),
  overrideExisting: false,
});

export const {useFetchListQuery} = listingApi;

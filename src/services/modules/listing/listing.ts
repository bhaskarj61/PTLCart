import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<PRODUCT, any>({
    query: params => ({
      url: 'benirvingplt/products/products',
      method: 'GET',
      params: params,
    }),
  });

export type PRODUCT = {
  id: number;
  colour: string;
  name: string;
  price: number;
  img: string;
};

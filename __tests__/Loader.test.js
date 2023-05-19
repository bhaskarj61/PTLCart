import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {store} from '../src/store';
import {useFetchListQuery} from '../src/services/modules/listing';
import HomeContainer from '../src/containers/HomeContainer';

const mockData = [
  {
    id: 1,
    colour: 'Black',
    name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
    price: 10,
    img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
  },
  {
    id: 2,
    colour: 'Stone',
    name: 'Stone Ribbed Strappy Cut Out Detail Bodycon Dress',
    price: 4,
    img: 'https://cdn-img.prettylittlething.com/3/6/5/a/365a5d1dce6a2b77b564379b302c9d83afccf33b_cmd2051_1.jpg?imwidth=1024',
  },
];

jest.mock('../src/services/modules/listing', () => {
  return {
    __esModule: true,
    useFetchListQuery: jest.fn().mockReturnValue({
      data: [],
      isLoading: true,
    }),
  };
});

describe('HomeContainer loader should be visible when data loading', () => {
  test('loader should render when data is fetching', () => {
    const mockProductData = [];
    const mockIsLoading = true;

    jest.spyOn(React, 'useEffect').mockImplementation(f => f());

    useFetchListQuery.mockReturnValueOnce({
      data: mockProductData,
      isLoading: mockIsLoading,
    });

    const navigation = {navigate: jest.fn()};

    const home = render(
      <Provider store={store}>
        <HomeContainer navigation={navigation} />
      </Provider>,
    );

    const loader = home.getByTestId('loader');
    expect(loader).toBeTruthy();
  });
});

import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {Provider, useDispatch} from 'react-redux';
import {store} from '../src/store';
import CartContainer from '../src/containers/CartContainer';
import {clearCart} from '../src/store/cart';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('CartContainer', () => {
  test('renders empty cart image when no data in cart', () => {
    const navigation = {navigate: jest.fn()};

    const home = render(
      <Provider store={store}>
        <CartContainer navigation={navigation} />
      </Provider>,
    );

    const emptyCartImage = home.getByTestId('empty-cart-image');
    expect(emptyCartImage).toBeTruthy();
  });

  test('dispatches clearCart action when CLEAR CART button is pressed', () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    const navigation = {navigate: jest.fn()};

    const home = render(
      <Provider store={store}>
        <CartContainer navigation={navigation} />
      </Provider>,
    );

    const clearCartButton = home.getByTestId('clear-cart-button');
    fireEvent.press(clearCartButton);
    expect(dispatchMock).toHaveBeenCalledWith(clearCart());
  });
});

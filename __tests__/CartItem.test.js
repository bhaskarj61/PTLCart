import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import CartItem from '../src/components/CartItem';

const item = {
  id: 1,
  colour: 'Black',
  name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
  price: 10,
  img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
  quantity: 3,
};

test('renders CartItem component without errors', () => {
  const cartAction = jest.fn();

  const cartItem = render(<CartItem item={item} cartAction={cartAction} />);

  expect(cartItem).toBeTruthy();
});

test('renders correct item names', () => {
  const cartAction = jest.fn();

  const cartItem = render(<CartItem item={item} cartAction={cartAction} />);
  const cartItemName = cartItem.getByText(
    'Black Sheet Strappy Textured Glitter Bodycon Dress',
  );

  expect(cartItemName).toBeTruthy();
});

test('calls add cartAction with correct parameters and updates quantity state', () => {
  const cartAction = jest.fn();

  const {getByText} = render(<CartItem item={item} cartAction={cartAction} />);
  const plusButton = getByText('+');
  const quantityText = getByText('3');

  fireEvent.press(plusButton);

  expect(cartAction).toHaveBeenCalledWith(item, 'add');
  expect(quantityText.props.children).toBe(4);
});

test('calls remove cartAction with correct parameters and updates quantity state', () => {
  const cartAction = jest.fn();

  const {getByText} = render(<CartItem item={item} cartAction={cartAction} />);
  const plusButton = getByText('-');
  const quantityText = getByText('3');

  fireEvent.press(plusButton);

  expect(cartAction).toHaveBeenCalledWith(item, 'remove');
  expect(quantityText.props.children).toBe(2);
});

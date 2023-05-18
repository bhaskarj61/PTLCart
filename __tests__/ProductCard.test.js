import React from 'react';
import {render} from '@testing-library/react-native';
import ProductCard from '../src/components/ProductCard';

const item = {
  id: 1,
  colour: 'Black',
  name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
  price: 10,
  img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
};

test('renders ProductCard component without errors', () => {
  const cartAction = jest.fn();

  const cartItem = render(<ProductCard item={item} cartAction={cartAction} />);

  expect(cartItem).toBeTruthy();
});

test('renders correct item names', () => {
  const cartAction = jest.fn();

  const cartItem = render(<ProductCard item={item} cartAction={cartAction} />);
  const cartItemName = cartItem.getByText(
    'Black Sheet Strappy Textured Glitter Bodycon Dress',
  );

  expect(cartItemName).toBeTruthy();
});

import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeItem} from '../store/cart';

const CartContainer = () => {
  const items = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.total);
  const dispatch = useDispatch();

  return (
    <View>
      {items.map(item => (
        <View key={item.id}>
          <Text>{item.name}</Text>
          <Text>
            {item.quantity} x {item.price}
          </Text>
          <Button
            title="Remove"
            onPress={() => dispatch(removeItem(item.id))}
          />
        </View>
      ))}
      <Text>Total: {total}</Text>
    </View>
  );
};

export default CartContainer;

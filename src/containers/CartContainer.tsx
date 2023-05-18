import React from 'react';
import {View, Text, FlatList, Image, StyleSheet, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationProp} from '@react-navigation/native';
import {PRODUCT} from '../services/modules/listing/listing';
import CartItem from '../components/CartItem';
import NormalHeader from '../components/Header';

interface CartState {
  items: PRODUCT[];
  total: number;
}

type Props = {
  navigation: NavigationProp<any, any>;
};

const CartContainer = ({navigation}: Props) => {
  const items = useSelector((state: {cart: CartState}) => state.cart.items);
  const total = useSelector((state: {cart: CartState}) => state.cart.total);

  const renderEmptyComponent = () => {
    return (
      <Image
        style={styles.noItemImage}
        source={require('../assets/images/emptyCart.png')}
      />
    );
  };

  return (
    <View style={styles.container}>
      <NormalHeader navigation={navigation} textRight="Cart" />
      <FlatList
        data={items}
        ListEmptyComponent={renderEmptyComponent}
        renderItem={({item}) => <CartItem item={item} cartAction={() => {}} />}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.cartContainer}>
        <View style={styles.cartPriceContainer}>
          <Text style={styles.cartText}>TOTAL: {total.toFixed(2)}$</Text>
        </View>
        <Pressable style={styles.viewCartContainer}>
          <Text style={styles.cartText}>CHECKOUT</Text>
          <Image
            source={require('../assets/images/right-arrow.png')}
            style={styles.arrowRight}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  noItemImage: {
    flex: 1,
  },
  cartContainer: {
    flexDirection: 'row',
    backgroundColor: '#fcd01f',
  },
  cartPriceContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6c80a',
  },
  viewCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flex: 1,
  },
  cartText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#363837',
  },
  arrowRight: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
});

export default CartContainer;

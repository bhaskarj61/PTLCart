import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationProp} from '@react-navigation/native';
import {PRODUCT} from '../services/modules/listing/listing';
import CartItem from '../components/CartItem';
import NormalHeader from '../components/Header';
import {addItem, clearCart, removeItem} from '../store/cart';

type CartItemProps = PRODUCT & {
  quantity?: number;
};
type CartState = {
  items: CartItemProps[];
  total: number;
};

type Props = {
  navigation: NavigationProp<any, any>;
};

const CartContainer = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const items = useSelector((state: {cart: CartState}) => state.cart.items);
  const total = useSelector((state: {cart: CartState}) => state.cart.total);

  const cartAction = (item: CartItemProps, action: 'add' | 'remove') => {
    if (action === 'add') {
      dispatch(addItem(item));
    } else {
      dispatch(removeItem(item));
    }
  };

  const removeCartItems = () => {
    dispatch(clearCart());
  };

  const checkoutItems = () => {
    Alert.alert('Work in progress! Please come back later.');
  };

  const renderEmptyComponent = () => {
    return (
      <Image
        style={styles.noItemImage}
        source={require('../assets/images/emptyCart.png')}
      />
    );
  };

  const renderFooter = () => (
    <View style={styles.cartPriceContainer}>
      <Text style={[styles.cartText, {color: '#363837'}]}>
        TOTAL: {total.toFixed(2)}$
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <NormalHeader navigation={navigation} textRight="Cart" />
      <View style={styles.items}>
        <FlatList
          data={items}
          ListEmptyComponent={renderEmptyComponent}
          renderItem={({item}) => (
            <CartItem item={item} cartAction={cartAction} />
          )}
          ListFooterComponent={renderFooter}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <View style={styles.cartContainer}>
        <Pressable style={styles.cartClearContainer} onPress={removeCartItems}>
          <Text style={styles.cartText}>CLEAR CART</Text>
        </Pressable>
        <Pressable style={styles.viewCartContainer} onPress={checkoutItems}>
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
  items: {
    flex: 1,
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  cartContainer: {
    flexDirection: 'row',
    backgroundColor: '#fcd01f',
  },
  cartPriceContainer: {
    justifyContent: 'center',
  },
  cartClearContainer: {
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
    fontWeight: 'bold',
    // color: '#363837',
    color: '#fff',
  },
  arrowRight: {
    height: 20,
    width: 20,
    marginLeft: 10,
    tintColor: '#fff',
  },
});

export default CartContainer;

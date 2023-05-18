import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useFetchListQuery} from '../services/modules/listing';
import ProductCard from '../components/ProductCard';
import {PRODUCT} from '../services/modules/listing/listing';
import {addItem, removeItem} from '../store/cart';
import Header from '../components/Header';

type CartItem = PRODUCT & {
  quantity?: number;
};

type CartState = {
  items: CartItem[];
  total: number;
};

type Props = {
  navigation: NavigationProp<any, any>;
};

const HomeContainer = ({navigation}: Props) => {
  const [listData, setListData] = useState<CartItem[]>([]);
  const dispatch = useDispatch();

  const allItems = useSelector((state: {cart: CartState}) => state.cart.items);
  const total = useSelector((state: {cart: CartState}) => state.cart.total);

  const {data: productData, isLoading} = useFetchListQuery(null);

  useEffect(() => {
    if (productData?.length) {
      setListData(productData);
    }
  }, [productData]);

  useEffect(() => {
    if (allItems?.length) {
      const updatedData = productData?.map((item: CartItem) => {
        const element = allItems?.find(ele => ele.id === item.id);
        if (element) {
          const temp = {...item};
          temp.quantity = element.quantity;

          return temp;
        }
        return item;
      });
      setListData(updatedData);
    } else {
      setListData(productData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allItems]);

  const goToCart = () => {
    navigation.navigate('Cart');
  };

  const cartAction = (item: CartItem, action: 'add' | 'remove') => {
    if (action === 'add') {
      dispatch(addItem(item));
    } else {
      dispatch(removeItem(item));
    }
  };

  const renderItem = ({item}: {item: PRODUCT}) => {
    return <ProductCard cartAction={cartAction} item={item} />;
  };

  if (isLoading) {
    return (
      <View style={[styles.fill, styles.center]}>
        <ActivityIndicator testID="loader" size={40} color={'#2dcc70'} />
      </View>
    );
  }
  return (
    <View style={styles.fill}>
      <Header
        showBack={false}
        navigation={navigation}
        textRight="Pretty Little Things"
      />
      <View style={styles.listingContainer}>
        <FlatList
          data={listData}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <View style={styles.cartContainer}>
        <View style={styles.cartPriceContainer}>
          <Text style={styles.cartText}>{total.toFixed(2)}$</Text>
        </View>
        <Pressable
          testID="cartButton"
          style={styles.viewCartContainer}
          onPress={goToCart}>
          <Text style={styles.cartText}>
            VIEW CART {`(${allItems?.length})`}
          </Text>
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
  fill: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  listingContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginVertical: 16,
    backgroundColor: '#fff',
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
    flex: 2,
  },
  cartText: {
    fontSize: 14,
    fontWeight: '600',
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

export default HomeContainer;

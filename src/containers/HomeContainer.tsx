import React, {useEffect} from 'react';
import {View, Text, Pressable, StyleSheet, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {useFetchListQuery} from '../services/modules/listing';
import ProductCard from '../components/ProductCard';
import {PRODUCT} from '../services/modules/listing/listing';
import {addItem} from '../store/cart';

const HomeContainer = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useFetchListQuery(null);

  const goToCart = () => {
    navigation.navigate('Cart');
  };

  const cartAction = (item: PRODUCT) => {
    dispatch(addItem(item));
  };

  const renderItem = ({item}: {item: PRODUCT}) => {
    return <ProductCard cartAction={cartAction} item={item} />;
  };

  return (
    <View style={styles.fill}>
      <FlatList
        data={productData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Pressable
        style={{backgroundColor: 'red', padding: 20}}
        onPress={goToCart}>
        <Text>Go to Cart</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});

export default HomeContainer;

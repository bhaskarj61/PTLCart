import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {PRODUCT} from '../services/modules/listing/listing';

type CartItem = PRODUCT & {
  quantity?: number;
};
interface CardProps {
  item: CartItem;
  cartAction: (item: PRODUCT, action: 'add' | 'remove') => void;
}

const ProductCard: React.FC<CardProps> = ({item, cartAction}) => {
  const [quantity, setQuantity] = useState(item?.quantity || 0);

  useEffect(() => {
    if (item?.quantity) {
      setQuantity(item?.quantity);
    } else {
      setQuantity(0);
    }
  }, [item?.quantity]);

  const handleAddQuantityChange = (value: number) => {
    cartAction(item, 'add');
    setQuantity(value);
  };

  return (
    <View style={[styles.container]}>
      <Image source={{uri: item?.img}} style={styles.image} />
      <View style={styles.allInfo}>
        <Text style={styles.name} numberOfLines={2}>
          {item?.name}
        </Text>
        <View style={styles.info}>
          <Text style={styles.price}>${item?.price}</Text>
          <View style={styles.quantity}>
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: quantity < 1 ? '#2dcc70' : '#81E0A9'},
              ]}
              disabled={quantity < 1 ? false : true}
              onPress={() => handleAddQuantityChange(quantity + 1)}>
              <Text style={styles.buttonText}>
                {quantity < 1 ? 'Add To Cart' : 'Already in Cart'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    margin: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
  },
  image: {
    width: '100%',
    height: 200,
  },
  allInfo: {
    padding: 10,
    backgroundColor: '#fff',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 12,
    color: '#363837',
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
    flex: 1,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#2dcc70',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 10,
    color: '#fff',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default React.memo(ProductCard);

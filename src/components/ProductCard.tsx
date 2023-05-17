import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {PRODUCT} from '../services/modules/listing/listing';

interface CardProps {
  item: PRODUCT;
  cartAction: (item: PRODUCT) => void;
}

const ProductCard: React.FC<CardProps> = ({item, cartAction}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    cartAction(item);
  }, [quantity]);

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: item?.img}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{item?.name}</Text>
        <Text style={styles.price}>${item?.price}</Text>
        <View style={styles.quantity}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleQuantityChange(quantity - 1)}
            disabled={quantity === 1}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleQuantityChange(quantity + 1)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default ProductCard;

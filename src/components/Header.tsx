import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';

type Props = {
  navigation: NavigationProp<any, any>;
  textRight?: string;
  showBack?: boolean;
};

const Header = ({textRight, navigation, showBack}: Props) => {
  return (
    <View style={styles.container}>
      {showBack && (
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/images/backIcon.png')}
            style={styles.icon}
          />
        </Pressable>
      )}
      <Text style={styles.heading}>{textRight}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: '#2dcc70',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  icon: {
    paddingHorizontal: 10,
    height: 20,
    width: 20,
    tintColor: '#fff',
    marginRight: 20,
  },
});

Header.defaultProps = {
  textRight: '',
  goTo: '',
  showBack: true,
};

export default Header;

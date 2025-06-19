import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Banner = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://via.placeholder.com/340x120.png?text=%D0%90%D0%BA%D1%86%D0%B8%D0%B8+%D0%B8+%D1%81%D0%BA%D0%B8%D0%B4%D0%BA%D0%B8',
        }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
});

export default Banner;
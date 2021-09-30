import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ArtistCard = (props) => {
  return <View style={styles.card}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.artistImage}
        source={{
          uri: props.imageUrl,
        }}
      />
    </View>

    <View style={styles.textContainer}>
      <Text style={styles.artistTitle}>{props.name}</Text>
      <Text style={styles.artistTitle}>{props.is_verified ? "Verified" : ""}</Text>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderWidth: 3,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 2,
    padding: 10,
  },
  artistImage: {
    height: 100,
    width: '100%',
  },
  artistTitle: {
    fontSize: 20,
  },
});

export default ArtistCard;

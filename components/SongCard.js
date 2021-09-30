import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const SongCard = (props) => {
  return <View key={props.id} style={styles.card}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.songImage}
        source={{
          uri: props.imageUrl,
        }}
      />
    </View>

    <View style={styles.textContainer}>
      <Text style={styles.songTitle}>{props.title}</Text>
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
  songImage: {
    height: 100,
    width: '100%',
  },
  songTitle: {
    fontSize: 20,
  },
});

export default SongCard;

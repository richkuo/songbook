import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import SongCard from '../components/SongCard'

export default function SongsScreen({ route, navigation }) {
  const { artist } = route.params;
  const [songList, setSongList] = useState([]);

  const submitSearch = async () => {
    try {
      const response = await fetch('https://api.genius.com/search?per_page=50&q=' + artist.name, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer e18K699_KGYDWob1J9n2N4eZhnRPFcCLgZ6wC3Xm3xlpKGK7_mbaNXB2WEeTSjx-',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      const hits = json.response.hits;

      let songs = hits.filter(song => song.type == 'song');

      setSongList(songs);
    } catch (error) {
      console.error(error);
    }
  }

  const renderSong = (song) => {
    let item = song.item.result;

    return (
      <SongCard
        id={item.id}
        key={item.id}
        title={item.title}
        stats={item.stats}
        imageUrl={item.header_image_url}
      />
    )
  };

  useEffect(() => { submitSearch() })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Song Results for {artist.name}</Text>
      <FlatList
        data={songList}
        renderItem={song => renderSong(song)}
        keyExtractor={song => song.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginVertical: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    fontSize: 35,
    borderRadius: 5,
    width: '100%',
    borderWidth: 3,
    padding: 15,
  },
});

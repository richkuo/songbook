import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SongCard from '../components/SongCard';
import {GENIUS_CLIENT_ACCESS_TOKEN} from '@env'

export default function SongsScreen({ route, navigation }) {
  const { artist } = route.params;
  const [songList, setSongList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const submitSearch = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://api.genius.com/search?per_page=50&q=' + artist.name, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + GENIUS_CLIENT_ACCESS_TOKEN,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if(json.error) {
        setResponseMessage(json.error_description);
        setSongList([]);
        setLoading(false);
        return
      }

      const hits = json.response.hits;

      let songs = hits.filter(song => song.type == 'song');

      setSongList(songs);
      setResponseMessage("Song Results for " + artist.name);
      setLoading(false);
    } catch (error) {
      setResponseMessage("There was an error with the app, please go back and try again");
      setLoading(false);
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
      <FlatList
        ListHeaderComponent=<Text style={styles.title}>{responseMessage}</Text>
        data={songList}
        extraData={responseMessage}
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
});

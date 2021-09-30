import * as React from 'react';
import {useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function SearchScreen() {
  const [artist, setArtist] = useState('');
  const [songList, setSongList] = useState([]);

  const submitSearch = async (searchTerm) => {
    try {
      const response = await fetch('https://api.genius.com/search?q=' + searchTerm, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer e18K699_KGYDWob1J9n2N4eZhnRPFcCLgZ6wC3Xm3xlpKGK7_mbaNXB2WEeTSjx-',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      let songs = json.response.hits.filter(song => song.type == 'song');

      setSongList(songs);
    } catch (error) {
      console.error(error);
    }
  }

  const renderSong = (song) => {
    let item = song.item.result;

    return (
      <View>
        <Text>{item.title}</Text>
        <Text>{item.header_image_url}</Text>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search by Artist</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setArtist(text)}
        value={artist}
      />

      <Button
        onPress={() => submitSearch(artist)}
        title="Search"
        color="#841584"
        accessibilityLabel="Artist Search Button"
      />

      <Text style={styles.title}>Song Results</Text>
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
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 25,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    fontSize: 35,
    borderRadius: 5,
    width: '100%',
    borderWidth: 2,
    padding: 15,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6
  },
});

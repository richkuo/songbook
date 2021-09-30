import * as React from 'react';
import {useState} from 'react';
import {
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import ArtistCard from '../components/ArtistCard'

export default function SearchScreen({ navigation }) {
  const [artistList, setArtistList] = useState([]);
  const [songList, setSongList] = useState([]);

  const submitSearch = async (searchTerm) => {
    try {
      const response = await fetch('https://api.genius.com/search?per_page=50&q=' + searchTerm, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer e18K699_KGYDWob1J9n2N4eZhnRPFcCLgZ6wC3Xm3xlpKGK7_mbaNXB2WEeTSjx-',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      const hits = json.response.hits;

      // display only unique artists
      let artists = [...new Map(hits.map(hit => [hit.result.primary_artist.id, hit.result.primary_artist])).values()]
      setArtistList(artists);
    } catch (error) {
      console.error(error);
    }
  }

  // example primary_artist object
  // "primary_artist": Object {
  //   "api_path": "/artists/1312707",
  //   "header_image_url": "https://images.genius.com/7512e4d75df60c4dd6f8bee8cac477e3.1000x333x1.jpg",
  //   "id": 1312707,
  //   "image_url": "https://images.genius.com/8e31f6d0355c4b073cbc92a89d11c618.680x680x1.jpg",
  //   "is_meme_verified": false,
  //   "is_verified": false,
  //   "name": "Krimelife Ca$$",
  //   "url": "https://genius.com/artists/Krimelife-ca",
  // },

  const renderArtist = (artist) => {
    let item = artist.item;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Songs by Artist', {
          songList: songList.filter(song => song.result.primary_artist.id == item.id),
          artist: item,
        })}
      >
        <ArtistCard
          id={item.id}
          key={item.id}
          name={item.name}
          imageUrl={item.header_image_url}
          is_verified={item.is_verified}
        />
      </TouchableOpacity>
    )
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={text => submitSearch(text)}
      />

      <Text style={styles.title}>Artist Results</Text>
      <FlatList
        data={artistList}
        renderItem={artist => renderArtist(artist)}
        keyExtractor={artist => artist.id}
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
    borderWidth: 3,
    padding: 15,
  },
});

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
import Config from "react-native-config";

export default function SearchScreen({ navigation }) {
  const [artistList, setArtistList] = useState([]);
  const [songList, setSongList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const submitSearch = async (searchTerm) => {
    setLoading(true);

    try {
      const response = await fetch('https://api.genius.com/search?per_page=50&q=' + searchTerm, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + 'uEl74vepbfLSQ4dkcnOc0CnP0XWAruPR5BvnzWoOIzRGLeP7VskgX0nkNCKI0McX',
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

      // display only unique artists
      let artists = [...new Map(hits.map(hit => [hit.result.primary_artist.id, hit.result.primary_artist])).values()]

      setArtistList(artists);
      setResponseMessage("Search Results");
      setLoading(false);
    } catch (error) {
      setResponseMessage("There was an error with the search, please try again");
      setLoading(false);
      console.error(error);
    }
  }

  const renderArtist = (artist) => {
    let item = artist.item;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Songs', {
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

      <FlatList
        ListHeaderComponent=<Text style={styles.title}>{responseMessage}</Text>
        refreshing={loading}
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

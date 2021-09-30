## 📚 Documentation

This project uses [Expo](https://docs.expo.dev/get-started/installation/),
 [react-navigation](https://reactnavigation.org/docs/getting-started/) for navigation,
 and [react-native-config](https://github.com/luggit/react-native-config) for environment variables

1. Install expo-cli with `npm install --global expo-cli`
> If you run into issues installing expo-cli, docs are available here [Expo docs](https://docs.expo.dev/get-started/installation/)
2. Clone the repository
3. Create an account at [genius.com/api-clients](https://genius.com/api-clients)  
4. Once your account is created, click on Generate Access Token, this is your `generated-client-access-token`
5. Create a `.env` file in the root `/songbook` directory
6. Set `GENIUS_CLIENT_ACCESS_TOKEN` to the `generated-client-access-token` in the `.env` file
```
GENIUS_CLIENT_ACCESS_TOKEN=generated-client-access-token
```
7. Start the expo server with:
```
yarn start
```

8. You can scan the QR code provided with Expo Go (Android) or the Camera app (iOS)  
Or you can use any of the following commands to launch an emulator or website  

> Press `a` │ to open Android  
> Press `i` │ to open iOS simulator  
> Press `w` │ to open web  

Please be aware that the Genius api has an unknown request limit

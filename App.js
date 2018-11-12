/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import { StackNavigator } from 'react-navigation'

import Login from './screens/Login'
import Home from './screens/Home'


const App = StackNavigator({
  initial: {screen:Login},
  home: {screen:Home},
  },
  {
    headerMode: 'none',
  }
)

// export default (<Provider store={store}><App /></Provider>)
export default App











/*

import React, {Component} from 'react';
import { View, Platform, StyleSheet } from 'react-native'
// import {Platform, StyleSheet, Text, View, Alert, TouchableHighlight, Button} from 'react-native';
import Spotify from 'rn-spotify-sdk'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(){
		super();
		  this.state = {
        spotifyInitialized: false,
        loggedIn: false,
        profile: {},
        playlists: []
      };
		  this.handleLogin = this.handleLogin.bind(this);
	  }


    async componentDidMount(){
      if(!Spotify.isInitialized()){
        let spotifyOptions = {
          "clientID": "178d7b96e8be4134ab1747a83f21ef54",
          "sessionUserDefaultsKey":"SpotifySession",
          "redirectURL":"https://adaptify.herokuapp.com/callback",
          "scopes":["user-read-private", "playlist-read", "playlist-read-private", "streaming"],
          "tokenSwapURL":"https://adaptify.herokuapp.com/swap",
          "tokenRefreshURL":"https://adaptify.herokuapp.com/refresh",
          "android": {
            "loginLoadingText": "Are you ready for some cool stuff?"
          }

        }
        try{
          const loggedIn = await Spotify.initialize(spotifyOptions)
          this.setState({spotifyInitialized: true})
          if(loggedIn){

            this.setState({loggedIn: true})

          }
        } catch (err) {
          Alert.alert("Error", err.message)
        }

      }
    }

    async handleLogin(){
      const loggedIn = await Spotify.login()
      try {
        if(loggedIn){
          const profile = await Spotify.getMe()
          const playlists = await Spotify.getMyPlaylists()
          this.setState({loggedIn: true, profile, playlists: playlists.items})
        }
      } catch (err){
        Alert.alert("Error", err.message)
      }
    }
    handleLogout = async () => {
      await Spotify.logout()
      this.setState({loggedIn: false})
    }
    handlePlay = async () => {
      await Spotify.playURI("spotify:user:dbm5upwtjf00xribeoglqqaw6:playlist:2H5nOGw4kwD1kAHliRAtR4", 0, 0)

    }
    handleSkip = async () => {
      await Spotify.skipToNext( )
      // Alert.alert(await Object.values(Spotify.getPlaybackMetadata()).toString())
    }

  render() {
    if(true){
      return(

        <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>
            This is Content Section
          </Text>
        </Content>
        <Footer>
        <FooterTab>
            <Button vertical>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical>
              <Icon name="refresh" />
              <Text>History</Text>
            </Button>
            <Button vertical active>
              <Icon active name="settings" />
              <Text>Settings</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
      )
    }
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>Welcome to React Native!!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>

        <Text style={styles.instructions}>Is initialized: {this.state.spotifyInitialized.toString()}</Text>
        <Text style={styles.instructions}>Is loggedIn: {this.state.loggedIn.toString()}</Text>
        <Text style={styles.instructions}>Me: {Object.keys(this.state.profile)}</Text>
        <Text style={styles.instructions}>Me: {this.state.profile.display_name}</Text>
        <Text style={styles.instructions}>Playlists: </Text>
        {this.state.playlists.map(playlist => (
          <Text key={playlist.name}>{playlist.name}</Text>
        ))}
        <TouchableHighlight onPress={this.handleLogin}>
						<Text>Log into Spotify</Text>
					</TouchableHighlight>
        <TouchableHighlight onPress={this.handleLogout}>
						<Text>Log out</Text>
					</TouchableHighlight>
        <Button onPress={this.handleSkip} title='Skip' />
        <Button onPress={this.handlePlay} title='Play' />
        {/* <Button onPress={async ()=> {
          await Spotify.setPlaying({playing: true})}}
          title='Play' /> }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

*/

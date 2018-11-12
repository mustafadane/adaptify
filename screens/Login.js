import React, {Component} from 'react'
import Spotify from 'rn-spotify-sdk'
import { connect } from 'react-redux'
import {setMe, setPlaylists} from '../store'

import { StackActions, NavigationActions } from 'react-navigation';
import {
	ActivityIndicator,
	Alert,
	StyleSheet,
	Text,
	TouchableHighlight,
    View,
    Image
} from 'react-native';
import {H1} from 'native-base'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            spotifyInitialized: false
        }
    }

    async componentDidMount(){
        if(!Spotify.isInitialized()){
          let spotifyOptions = {
            "clientID": "178d7b96e8be4134ab1747a83f21ef54",
            "sessionUserDefaultsKey":"SpotifySession",
            "redirectURL":"https://adaptify.herokuapp.com/callback",
            "scopes":["user-read-private", "playlist-read", "playlist-read-private", "streaming", "playlist-modify-public", "playlist-modify-private"],
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
                const profile = await Spotify.getMe()
                setMe(profile)
                const playlists = await Spotify.getMyPlaylists()
                setPlaylists(playlists)
              this.goToHome()

            }
          } catch (err) {
            Alert.alert("Error", err.message)
          }

        }
        else
		{
			// update UI state
			this.setState((state) => {
				state.spotifyInitialized = true;
				return state;
			});
			// handle logged in
			if(Spotify.isLoggedIn())
			{

				this.goToHome();
			}
		}
    }

    goToHome = () => {
        const navAction = StackActions.reset({
			index: 0,
			actions: [
			  NavigationActions.navigate({ routeName: 'home'})
			]
		});
		this.props.navigation.dispatch(navAction);
    }

    handleLogin = async () => {
        const loggedIn = await Spotify.login()
        try {
          if(loggedIn){

            this.goToHome()
          }

        } catch (err){
          Alert.alert("Error", err.message)
        }
      }

    render(){
        if(!this.state.spotifyInitialized) {
            return (
                <View style={styles.container}>
					<ActivityIndicator animating={true} style={styles.loadIndicator}>
					</ActivityIndicator>
					<Text style={styles.loadMessage}>
						Loading...
					</Text>
				</View>
            )
        }
        else
		{
			return (
				<View style={styles.container}>
                    <Image source={require('../logo.png')} />
					<Text style={styles.greeting}>
						Hey! You! Log into your spotify
					</Text>
					<TouchableHighlight onPress={this.handleLogin} style={styles.spotifyLoginButton}>
						<Text style={styles.spotifyLoginButtonText}>Log into Spotify</Text>
					</TouchableHighlight>
				</View>
			);
		}

    }
}

const mapState = state => ({
    isLoggedIn: !!state.me.display_name,
    playlists: state.playlists,
    me: state.me
})



const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},

	loadIndicator: {
		//
	},
	loadMessage: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},

	spotifyLoginButton: {
		justifyContent: 'center',
		borderRadius: 18,
		backgroundColor: 'green',
		overflow: 'hidden',
		width: 200,
		height: 40,
		margin: 20,
	},
	spotifyLoginButtonText: {
		fontSize: 20,
		textAlign: 'center',
		color: 'white',
	},

	greeting: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
});

// export default connect(mapState)(Login)
export default Login

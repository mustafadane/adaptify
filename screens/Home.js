import React, { Component } from 'react'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Separator, List, ListItem, Thumbnail, Subtitle, Picker } from 'native-base';
import Spotify from 'rn-spotify-sdk'
import { connect } from 'react-redux'
import { Alert } from 'react-native'
import {setMe, setPlaylists} from '../store'
import { StackActions, NavigationActions } from 'react-navigation';


export class Home extends Component {

    constructor(){
        super()
        this.state = {
            me: {},
            playlists: [],
            tracks: [],
            playlistView: false,
            skipData: {},
            isPlaying: false,
            currentlyPlaying: 0,
            selectedPlaylist: 0
        }
    }

    async componentDidMount() {
        const profile = await Spotify.getMe()
        setMe(profile)
        const playlists = await Spotify.getMyPlaylists()
        setPlaylists(playlists)
        this.setState({me: profile, playlists: playlists.items})
        // Alert.alert(playlists.items[0].name)
    }

    handleClick = async (playlistId, playlistUri) => {
        const tracks = await Spotify.getPlaylistTracks(playlistId)
        this.setState({tracks: tracks.items, playlistView: true, selectedPlaylist: playlistUri})
    }

    handleLogout = async () => {
        await Spotify.logout()
        this.goToLogin()
    }
    goToLogin = () => {
        const navAction = StackActions.reset({
			index: 0,
			actions: [
			  NavigationActions.navigate({ routeName: 'initial'})
			]
		});
		this.props.navigation.dispatch(navAction);
    }
    handleBack = () => {
        this.setState({
            tracks: [],
            playlistView: false
        })
    }
    handlePlay = async () => {
        // await Spotify.playURI(uri, position, 0)
        await Spotify.setPlaying(!this.state.isPlaying)
        this.setState({
            isPlaying: !this.state.isPlaying
        })
    }

    handleStart = async (uri, position, trackId) => {
        await Spotify.playURI(uri, position, 0)
        this.setState({
            isPlaying: !this.state.isPlaying,
            currentlyPlaying: trackId
        })
    }

    render() {
        return (
            <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
            <Subtitle>Welcome, {this.state.me.display_name}</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content>
            {this.state.playlistView

                ?
                <Container>
                <Button iconLeft full onPress={this.handleBack}>
                    <Icon name='arrow-back' />
                    <Text>Go Back To Playlists</Text>
                </Button>
                <List>

                    {!this.state.tracks.length && <Text>No song in this playlist</Text>}
                    {this.state.tracks.map((track, idx) => {
                        return (
                            <ListItem thumbnail key={track.track.name}
                                onPress={() => this.handleStart(this.state.selectedPlaylist, idx, track.track.id)}
                            >
                            <Left>
                                <Thumbnail square source={{uri: track.track.album.images[0].url}}></Thumbnail>
                            </Left>
                            <Body>
                                 <Text>{track.track.name}</Text>
                            </Body>
                            <Right>
                                <Text note>{ Math.floor(track.track.duration_ms/1000/60)}:{Math.floor(track.track.duration_ms/1000%60) }</Text>
                            </Right>
                            </ListItem>
                        )
                    })}

                </List>
                </Container>

                    :
                    <Container>

                  <List>
                    <ListItem itemDivider>
                        <Text>Your Playlists:</Text>
                    </ListItem>

                    {this.state.playlists.map(playlist=>{
                        return(
                            <ListItem key={playlist.id} bordered onPress={()=>this.handleClick(playlist.id, playlist.uri)}>
                                    <Text>{playlist.name}</Text>
                            </ListItem>
                        )
                    })}
                  </List>
                  </Container>



            }




          <Button onPress={this.handleLogout}>
              <Text>
                  LOGOUT
              </Text>
          </Button>
        </Content>
        <Footer>
        <FooterTab>
            <Button vertical>
              <Icon name="skip-backward" />

            </Button>
            <Button vertical onPress={this.handlePlay}>
              <Icon name={this.state.isPlaying ? "pause" : "play"} />

            </Button>
            <Button vertical>
              <Icon  name="skip-forward" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
        )
    }
}

const mapState = state => ({
    playlists: state.playlists
})

// export default connect(mapState)(Home)
export default Home

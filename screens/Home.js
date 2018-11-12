import React, { Component } from 'react'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Separator, List, ListItem, Thumbnail } from 'native-base';
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
            tracks: []
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

    handleClick = async (playlistId) => {
        const tracks = await Spotify.getPlaylistTracks(playlistId)
        this.setState({tracks: tracks.items})
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
          </Body>
          <Right />
        </Header>
        <Content>
            <Text>
                Welcome, {this.state.me.display_name}
            </Text>
            {this.state.tracks.length

                ?
                <Container>
                <Button iconLeft full>
                    <Icon name='arrow-back' />
                    <Text>Playlists</Text>
                </Button>
                <List>
                    {this.state.tracks.map(track => {
                        return (
                            <ListItem thumbnail key={track.track.name}>
                            <Left>
                                <Thumbnail square source={{uri: track.track.album.images[0].url}}></Thumbnail>
                            </Left>
                            <Body>
                                 <Text>{track.track.name}</Text>
                            </Body>
                            </ListItem>
                        )
                    })}

                </List>
                </Container>

                    :
                    <Container>
                    <Text>
                    Your Playlists:
                  </Text>
                  <List>
                  <ListItem avatar>
                      <Left>
                        <Thumbnail  />
                      </Left>
                      <Body>
                        <Text>Kumar Pratik</Text>
                        <Text note>Doing what you like will always keep you happy . .</Text>
                      </Body>
                      <Right>
                        <Text note>3:43 pm</Text>
                      </Right>
                    </ListItem>
                    {this.state.playlists.map(playlist=>{
                        return(
                            <ListItem key={playlist.id} bordered onPress={()=>this.handleClick(playlist.id)}>
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
}

const mapState = state => ({
    playlists: state.playlists
})

// export default connect(mapState)(Home)
export default Home

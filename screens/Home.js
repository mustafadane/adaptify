import React, { Component } from 'react'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import Spotify from 'rn-spotify-sdk'
import { connect } from 'react-redux'


export class Home extends Component {
    handleLogout = async () => {
        await Spotify.logout()
        this.setState({loggedIn: false})
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
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>
            This is Content Section
          </Text>
          {/* <Button> */}
              <Text>
                  {/* HERE:{this.props.me} */}
              </Text>
          {/* </Button> */}
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
    me: state.me
})

export default connect(mapState)(Home)

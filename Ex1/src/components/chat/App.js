import React, { Component } from 'react';
import ChatBlock from './ChatBlock.js';
import Config from '../../containers/ConfigContainer';
import FriendList from './FriendList';

class App extends Component {
  componentWillMount() {
    // console.log( 'app will:', this.props );
    console.log( 'this.props.loadFriend();' );
    // this.props.loadFriend();
  }

  componentDidMount() {
    // console.log( 'chat app:', this.props );
  }

  componentDidUpdate() {
    const a = async () => {
      await console.log( 'loadFriend1', this.props );
      await this.props.loadFriend();
      await console.log( 'loadFriend2', this.props );
    };
    // a();

  }

  render() {
    return ( <div className = "container-fluid" style = {{ height: '90%' }}>
        <div className = "row">
          <div className = "col-xs-4">
            <FriendList friendList = { this.props.friendList }
              chatIdx = { this.props.chatIdx }
              switchFriend = { this.props.switchFriend } 
              addFriend = { this.props.addFriend }
              />
          </div>
          <div className = "col-xs-4" >
            { console.log( 'this.props in App', this.props ) }
            <ChatBlock msg = { this.props.friendList[ this.props.chatIdx ].msgs } 
              setChat = { this.props.setChat }
              getChat = { this.props.getChat }
              username = { this.props.username }
              loadFriend = { this.props.loadFriend }
            />
          </div>
          <div className = "col-xs-4">
            <Config/>
          </div>
        </div>
      </div> );
  }
}

export default App;

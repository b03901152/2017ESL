import React, { Component } from 'react';
import './FriendList.css';
class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      option: 'chat',
      addFriendHint: '',
    };
  }

  componentDidMount() {
  }

  renderOption = () => {
    switch( this.state.option ) {
      case 'chat':
        return  <div className = 'FriendList'>
        <input type="text" className="form-control" 
                  ref = { ref => this.input = ref }
                  onClick = { () => {} }
                  placeholder = 'Search by ID'/>
        {
          this.props.friendList.map( ( v, i ) => <div 
            className = { 'Friend' + ( i === this.props.chatIdx ? ' chatting' : '' ) }
            key = {i} 
            onClick = { () => this.props.switchFriend( i ) }>
            <div className = 'name'> { v.name } </div>
            <div className = 'date'> { v.msgs[0].sentDate.toLocaleString() } </div>
            <div className = 'msg'> { v.msgs[0].msg } </div>
          </div>  )
        }
      </div>
      case 'people':
        return <div>
        </div>;
      case 'group':
        return <div>
        </div>;
      case 'addFriend':
        return <div>
          <input type="text" className="form-control" 
                            ref = { ref => this.friendID = ref }
                            onKeyPress = { e => {
                              if ( e.key === 'Enter' ) {
                                if ( this.props.addFriend( this.friendID.value ) ) {
                                  this.friendID.value = '';
                                  this.setState( { addFriendHint: `add ${this.friendID.value} success.` } );
                                } else {
                                  this.setState( { addFriendHint: `${this.friendID.value} not found.` } );
                                }
                              }
                            } }
                            placeholder = 'Search by ID'/>
          <div> { this.state.addFriendHint } </div>
        </div>;

    }

  }

  render() {
    return ( 
      <div>
        { this.renderOption() }
        <div className = 'row' >
          <div className = 'col-xs-3' onClick = { () => this.setState( { option: 'chat' } ) }>chat</div>
          <div className = 'col-xs-3' onClick = { () => this.setState( { option: 'people' } ) }>people</div>
          <div className = 'col-xs-3' onClick = { () => this.setState( { option: 'group' } ) }>group</div>
          <div className = 'col-xs-3' onClick = { () => this.setState( { option: 'addFriend' } ) }>addFriend</div>
        </div>  
      </div>
 );
  }
}

export default App;

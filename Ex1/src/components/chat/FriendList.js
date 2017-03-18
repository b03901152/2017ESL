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

  componentWillMount() {
    console.log( 'friend list componentWillMount' );
    // this.props.loadFriend( '123' )''
    fetch( '/loadFriend', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
      credentials: 'same-origin',
    } )
    .then( res => res.json() )
    .then( res => {
      console.log( 'friend list res', res );
      this.props.loadFriend( res.friendList );
    } );
  }

  addFriend = friendName => {
    fetch( '/addFriend', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify( { friendName } ),
      credentials: 'same-origin',
    } )
    .then( res => res.json() )
    .then( res => {
      if( res.status ) {
        console.log(' add friend ' );
        this.props.addFriend( friendName, res.groupID );
        this.setState( { addFriendHint: `add ${this.friendID.value} success.` } );
      }
      else
         this.setState( { addFriendHint: `add ${this.friendID.value} fail.` } );
    } );
  }
  
  renderPreMsg = msgs => ( msgs[0] === 'text' ? msgs[1] : msgs[0] );

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
            <div className = 'msg'> { this.renderPreMsg( v.msgs[0].msg ) } </div>
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
                                if ( this.addFriend( this.friendID.value ) )
                                  this.friendID.value = '';
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

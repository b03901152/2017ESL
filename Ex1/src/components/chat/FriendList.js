import React, { Component } from 'react';
import './FriendList.css';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      option: 'chat',
      addFriendHint: '',
      profile: '',
      data_uri: '',
      filename: '',
      filetype: '',
    };
  }

  componentDidMount() {
  }

  componentWillMount() {
    console.log( 'friend list componentWillMount' );
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
      console.log( "after fetch", res.friendList );
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

  uploadProfilePhoto = file  => {
    console.log( "fetch( '/uploadProfilePhoto'" );
    let uploadIdx;
    let signUpForm = new FormData();
    signUpForm.append( "icon", file );
    fetch( '/uploadProfilePhoto', {
      method: 'POST',
      body: signUpForm,
      credentials: 'same-origin',
    } ).then( res => res.json() )
    .then( res => {
      res.originalname
    } );
  };

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
            className = { 'Friend' + ( i === this.props.chatIdx ? ' chatting' : '' ) + ' row' }
            key = {i} 
            onClick = { () => this.props.switchFriend( i ) }>
            <div className="col-sm-3">
              <img className = { "img-circle" } width = { '50em' } height = { '50em' }
              style = {{
                width: '5em',
                height: '5em',
              }}
              src={ v.profilePath } alt=""/>
            </div>
            <div className="col-sm-9">
              <div className = 'name'> { v.name } </div>
              <div className = 'date'> { 
                () => {
                  if ( v.msgs[ v.msgs.length - 1 ].sentDate )
                    return v.msgs[ v.msgs.length - 1 ].sentDate.toLocaleString();
                  else 
                    return 'no foune!';
                }
              } </div>
              <div className = 'msg'> { this.renderPreMsg( v.msgs[0].msg ) } </div>
            </div>
          </div>  )
        }
      </div>
      case 'upload profile':
        return <div>
          <input type="file" className="form-control" id={"uploadImage"}
            className = { "hide" } 
            ref = { ref => this.photo = ref }
            style = {{ display: 'none'}}
            onChange = { e => { 
              console.log('onchamge');
              const file  = e.target.files[0];
              const profileReader = new FileReader();
              profileReader.onload = (upload) => {
                this.setState({
                  data_uri: upload.target.result,
                  filename: file.name,
                  filetype: file.type
                });
              };
              profileReader.readAsDataURL( file );
            } }
            accept="image/*" />
            <label htmlFor="uploadImage" >
              <img 
                htmlFor="uploadImage"
                src = { this.state.data_uri ||
                        "data:image/jpeg;base64,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"  
                      }
                width='400px' height='400px' />

            </label>
            <div>
              <Button onClick = { () => {
                console.log( 'submit profile ', this.photo.files[0] );
                this.uploadProfilePhoto( this.photo.files[0] );
              } }>Submit</Button>
            </div>
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
      <div className = "FriendListContainer" style = {{
          height: '66em',
        }}>
        { this.renderOption() }
        <div className = 'row selectors'>
          <div className = 'col-xs-3 selector' onClick = { () => this.setState( { option: 'chat' } ) }>chat</div>
          <div className = 'col-xs-3 selector' onClick = { () => this.setState( { option: 'upload profile' } ) }>upload profile</div>
          <div className = 'col-xs-3 selector' onClick = { () => this.setState( { option: 'group' } ) }>group</div>
          <div className = 'col-xs-3 selector' onClick = { () => this.setState( { option: 'addFriend' } ) }>addFriend</div>
        </div>
      </div>
 );
  }
}

export default App;

import React, { Component } from 'react';
import { Button, ButtonToolbar, DropdownButton, MenuItem, Dropdown, Modal } from 'react-bootstrap/lib';
import './config.css';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      showModal: false,
      showSetGroupNameModal: false,
      addFriendToGroupHint: '',
    }
  }

  componentDidMount() {
    console.log( "this.props.profilePathss", this.props );
  }

  addFriendToGroup = friendName => {
    console.log( 'addFriendToGroup', friendName);
    fetch( '/addFriendToGroup', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify( { friendName, groupID: this.props.groupID } ),
      credentials: 'same-origin',
    } )
    .then( res => res.json() )
    .then( res => {
      // console.log( 'addFriendToGroup', res );
      if ( res.status )
        this.setState( { addFriendToGroupHint: ( 'add ' + this.friendName.value.trim() + ' success' ) } );
      else
        this.setState( { addFriendToGroupHint: ( 'add ' + this.friendName.value.trim() + ' fail' ) } );

    } );
  }

  setGroupName = name => {
    console.log( 'setGroupName', name, this.props.groupID );
    fetch( '/setGroupName', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify( {
        groupName: name,
        groupID: this.props.groupID,
      } ),
      credentials: 'same-origin',
    } );
    this.props.setGroupName( name );
  };

  model = () => ( <Modal show={ this.state.showModal } onHide={ () => this.setState( { showModal: false } ) } >
        <Modal.Header closeButton>
          <Modal.Title>Add your friend to this chat group:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control"
            ref = { ref => this.friendName = ref }
            onKeyPress = { e => {
                if ( e.key === 'Enter' && this.friendName.value.trim() ) {
                  this.setGroupName( 'DEFAULT GROUP!' );
                  this.addFriendToGroup( this.friendName.value.trim() );
                  this.friendName.value = '';
                }
              }
            }
            placeholder = 'Please enter friend name'/>
            <div> { this.state.addFriendToGroupHint } </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.setState( { showModal: false } )}>Close</Button>
        </Modal.Footer>
      </Modal> );

  setGroupNameModal = () => ( <Modal show={ this.state.showSetGroupNameModal } onHide={ () => this.setState( { showSetGroupNameModal: false } ) } >
      <Modal.Header closeButton>
          <Modal.Title>Reset this group name:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control"
            ref = { ref => this.groupNameInput = ref }
            onKeyPress = { e => {
                if ( e.key === 'Enter' && this.groupNameInput.value.trim() ) {
                  this.setGroupName( this.groupNameInput.value.trim() );
                  this.groupNameInput.value = '';
                }
              }
            }
            placeholder = 'Please enter friend name'/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ () => this.setState( { showSetGroupNameModal: false } ) }>Close</Button>
        </Modal.Footer>
      </Modal> );

  imgPath = n => {
    if ( !n )
      return "http://baxtercoaching.com/wp-content/uploads/2013/12/facebook-default-no-profile-pic.jpg";
    else
      return 'http://localhost:3000/' + n;
  }

  render() {
    return <div className = "config" style = {{ margin: '0.5em'}} >
      <div className="floatLeft">
        <span style = {{ margin: '2em'}}>
          { this.props.username }
        </span>
        <img className = { "img-circle" } width = { '50em' } height = { '50em' }
        style = {{
          width: '5em',
          height: '5em',
          margin: '1em',
        }}
        src={ this.imgPath( this.props.profilePath ) } alt=""/>
        <Dropdown id="dropdown-custom-1" pullRight = { true } >
          <Dropdown.Toggle noCaret>
            <span className="glyphicon glyphicon-th-list"></span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
            <MenuItem eventKey="1" onClick = { () => this.setState( { showModal: true } ) } > addFriend </MenuItem>
            <MenuItem eventKey="3" onClick = { () => this.setState( { showSetGroupNameModal: true } ) }> rename group name </MenuItem>
            <MenuItem eventKey="2" onClick = { () => this.props.logout() }> Logout </MenuItem>
          </Dropdown.Menu>
        </Dropdown>
        { this.model() }
        { this.setGroupNameModal() }
        </div>
    </div>;
  }
}

export default App;

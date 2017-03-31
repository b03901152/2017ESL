import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ChatBlock.css';

const socket = io.connect();

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      intitialized: false,
      showModal: false,
      addFriendToGroupHint: '',
    };
    socket.on( 'getChat', msg => this.props.getChat( msg ) );
  }

  isread = isread => {
    if ( isread === 'read' )
      return <div className = 'isread' > Read </div>;
    else if ( isread === 'all' )
      return <div className = 'isread' > { 'All read' } </div>;
    else if ( isread )
      return <div className = 'isread' > { isread + ' read' } </div>;
    return;

  }

  getLastReadTime() {
  }

  componentWillMount() {
  }

  componentWillReceiveProps( next ) {
    if ( ! this.state.intitialized ) {
      socket.emit( 'init', next.username );
      this.setState( { intitialized: true } );
    }
  }

  componentDidUpdate() {
    this.chattingBlock.scrollTop = this.chattingBlock.scrollHeight;
  }

  componentDidMount() {
  }

  renderMsg = msg => {
    switch( msg[ 0 ] ) {
      case 'text':
        return <div> { msg[1] } </div>
      case 'image':
        return <img 
              src = { 'http://localhost:3000/' + msg[ 1 ] }
              width='400px' height='400px' />
      case 'audio':
        return (<audio
                src = { 'http://localhost:3000/' + msg[ 1 ] }
                controls>
              </audio>);
      case 'vedio':
        return <video width="480" controls
        poster="https://archive.org/download/WebmVp8Vorbis/webmvp8.gif" >
        <source
          src = { 'http://localhost:3000/' + msg[ 1 ] }
          type="video/mp4"/>
      </video>
    }

  };

  isread = isread => {
    if ( !isread )
      return
    else if ( isread === 'all' )
      return "All read ";
    else if ( !isNaN( Number( isread ) ) )
      return this.timeUI( isread ) + ' read ';
    else
      return 'read';
  }

  timeUI = date => {
    if ( !date )
      return 'err';
    date = new Date( date );
    return date.getHours() + ':' + date.getMinutes();
  }

  chatting = () => this.props.msg.map( ( msg, idx ) => {
    console.log("msgggg", msg);
    if ( msg.author === this.props.username )
      return (
        <div key = { idx } >
          {
            <div className = 'myMsg row' >
              <div className = 'myInsideMsg'>
                <div className = 'myText' >
                  { this.renderMsg( msg.msg ) }
                </div>
              </div>
              <div className = 'myInfo' >
                { this.isread( msg.isread ) }
                <div className = 'sentDate' >
                  { this.timeUI( msg.sentDate ) }
                </div>
              </div>
            </div>
          }
        </div>
      );
    else
      return (
        <div key = { idx } >
          {
            <div className = 'msg row' >
              <div className = 'author' > { msg.author } </div>
              <div className = 'content'>
                <div className = 'insideMsg'>
                  <div className = 'text' >
                    { this.renderMsg( msg.msg ) }
                  </div>
                </div>
                <div className = 'info' >
                  <div className = 'sentDate' > {
                    this.timeUI( msg.sentDate )
                  } </div>
                </div>
              </div>
            </div>
          }
        </div>
      );
    } );

  upload = ( type, icon ) => {
    let uploadIdx;
    let signUpForm = new FormData();
    signUpForm.append( "icon", icon );
    fetch( '/upload', {
      method: 'POST',
      body: signUpForm,
    } ).then( res => res.json() )
    .then( res =>
      this.props.setChat( [ type, res.originalname ] )
    );
  };



  render() {
    return ( <div className = 'ChatBlock' >
      <div className="chatting" 
      ref = { ref => this.chattingBlock = ref }>
        { this.chatting() }
      </div>
      <div className="row icons">
        <label htmlFor="uploadImage" className = "glyphicon icon glyphicon-picture"></label>
        <label htmlFor="uploadVedio" className = "glyphicon icon glyphicon-facetime-video"></label>
        <label htmlFor="uploadAudio" className = "glyphicon icon glyphicon-headphones"></label>
      </div>
        <input type="text" className="form-control"
          ref = { ref => this.input = ref }
          onKeyPress = { async e => {
              if ( e.key === 'Enter' && this.input.value.trim() ) {
                this.props.sort();
                this.props.setChat( [ 'text', this.input.value.trim() ] );
                this.input.value = '';
              }
            }
          }
          placeholder = 'Please enter a message'/>
        <input type="file" className="form-control" id={"uploadImage"}
          className = { "hide" } 
          ref = { ref => this.vedio = ref }
          onChange = { e => {
            this.upload( 'image', e.target.files[ 0 ]  );
          } }
          accept="image/*" />

        <input type="file" className="form-control" id={"uploadVedio"}
          className = { "hide" } ref = { ref => this.audio = ref }
          onChange = { e => this.upload( 'vedio', e.target.files[ 0 ] ) }
          accept="audio/*"/>

        <input type="file" className="form-control" id={"uploadAudio"}
          className = { "hide" } ref = { ref => this.image = ref }
          onChange = { e => {
            // console.log( 'e.value:', e.value );
            this.upload( 'audio', e.target.files[ 0 ] ); 
          } }
          accept="vedio/*"/>

      </div> );
  }
}

export default App;

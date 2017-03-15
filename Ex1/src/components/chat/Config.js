import React, { Component } from 'react';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      icon: null,
      vedio: null,
      audio: null,
    };
  }

  componentDidMount() {
  }

  upload = () => {
    let signUpForm = new FormData();
    signUpForm.append( "icon", this.state.icon );
    fetch( '/upload', {
      method: 'POST',
      body: signUpForm,
    } );
  };

  loadImage = e => {
    this.setState( { icon: new Blob( [ e.target.files[ 0 ] ], { type: 'image/*' } ) } );
  };

  loadAudio = e => {
    console.log( 'e.target:', e.target );
    this.setState( { icon: new Blob( [ e.target.files[ 0 ] ], { type: 'audio/*' } ) } );
  };

  loadVedio = e => {
    this.setState( { icon: new Blob( [ e.target.files[ 0 ] ], { type: 'vedio/*' } ) } );
  };

  uploadImg = () => (<div>
          <form>
            <input type="file" accept="image/*" onChange={ this.loadImage }/>
          </form>
            <img 
              src={ this.state.icon ? ( window.URL || window.webkitURL ).createObjectURL( this.state.icon ) : 'https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg' } 
              width='400px' height='400px' />
              <button onClick = { this.upload } >upload</button>
        </div> );

  uploadAudio = () => (
    <div>
      <form>
        <input type="file" accept="audio/*" onChange={ this.loadAudio }/>
      </form>
      <button onClick = { this.upload } >upload</button>
      <audio
        src="http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg"
        controls>
      </audio>uploadAudio
    </div>
  );

  uploadVedio = () => (
    <div>
      <input type="file" accept="vedio/*" onChange={ this.loadVedio }/>
      <button onClick = { this.upload } >upload</button>
      <video width="480" controls
        poster="https://archive.org/download/WebmVp8Vorbis/webmvp8.gif" >
        <source
          src="https://archive.org/download/WebmVp8Vorbis/webmvp8_512kb.mp4"
          type="video/mp4"/>
      </video>
    </div>
  );

  render() {
    return this.uploadImg();
  }
}

export default App;

import React, { Component } from 'react';
import style from './Login.css';

class Login extends Component {
  componentDidUpdate() {
    if ( this.props.error ) {
      document.getElementById( 'wrongPassword' ).innerHTML = 'Wrong User Name or Password!';
      document.getElementById( 'wrongPassword' ).className = 'alert alert-danger';
    }
  }

  componentWillMount() {
    console.log('login componentWillMount');
    console.log( 'componentsWillMount' );
    fetch( '/auth/check/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'same-origin',
    } ).then( res => res.json() )
      .then( ( res ) => {
        if ( res.status ) {
          this.props.setLoc( 'chat' );
          this.props.setUser( res.username );
        }
      } );
  }

  componentDidMount() {
      this.username.value = '1';
      this.password.value = '1';
  }

  login = () => {
    console.log( 'login' );
    const user = {
      name: this.username.value.trim(),
      password: this.password.value.trim(),
    };
    console.log( 'user:', user );
    fetch( '/auth/login/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify( user ),
      credentials: 'same-origin',
    } ).then( res => res.json() )
      .then( ( res ) => {
        if ( res.status ) {
          this.props.setLoc( 'chat' );
          console.log( 'login res', res );
          this.props.setUser( res.username );
        }
      } );
  };

  render() {
    return (
      <div className="login jumbotron">
        <h1>Foodzone</h1>
        <form>
          <h2>Logisn</h2>
          <div id="wrongPassword"/>
          <div className="form-group">
            <label htmlFor="username" />
            <input type="text" id="username" 
            className="form-control" placeholder="User Name"
            ref = { ref => this.username = ref }
            />
          </div>
          <div className="form-group" id="passwordDiv">
            <input type="password" id="password" 
            className="form-control" placeholder="Password"
            ref = { ref => this.password = ref }
            />
          </div>

        </form>
        <button id="submit" className="btn btn-default" 
          onClick={ () => this.login( this.username.value, this.password.value ) }>
            submit
        </button>
          <a onClick = { () => this.props.setLoc( 'signup' ) } id="signup">Sign Up</a>
      </div>
    );
  }
}

export default Login;

import React, { Component } from 'react';
import './SignUp.css';

class SignUp extends Component {

  componentDidMount() {
    this.username.value = '123';
    this.email.value = '123';
    this.password.value = '123';
  }

  componentWillMount() {
    console.log('signup componentWillMount');
  }

  clear() {
    this.username.value = '';
    this.email.value = '';
    this.password.value = '';
  }


  submit() {
    if ( this.username.value.trim() === '' )
      window.alert( 'Please enter your name!' );
    else if ( this.email.value.trim() === '' )
      window.alert( 'Please enter your email!' );
    else if ( this.password.value.trim() === '' )
      window.alert( 'Please enter your password!' );
    else {
      const signUpForm = {
        name: this.username.value.trim(),
        email: this.email.value.trim(),
        password: this.password.value.trim(),
      };
      console.log( 'signUpForm:', signUpForm );
      try {
        fetch( '/auth/signup', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify( signUpForm ),
          credentials: 'same-origin',
        } )
          .then( res => res.json() )
          .then( ( res ) => {
            console.log( 'res:', res );
            if ( res.status )
              this.props.setLoc( 'login' );
          } );
      } catch ( err ) {
          console.log( 'err' );
      };

    }
  }

  render() {
    return (
      <div className="signup">
        <div className="jumbotron">
          <h1>Chat room <small>Sign Up</small></h1>
        </div>
        <div className="col-xs-12 col-sm-6">
          <form>
            <div className="form-group">
              <label htmlFor="username">User Name*</label>
              <input type="text" id="username" className="form-control" placeholder="User Name" 
              ref = { ref => this.username = ref }/>
            </div>
            <div className="form-group">
              <label htmlFor="email" id="emailLabel">Email Address*</label>
              <input type="email" id="email" className="form-control" placeholder="Email" 
              ref = { ref => this.email = ref }/>
            </div>
            <div className="form-group">
              <label htmlFor="email" id="emailLabel">Password*</label>
              <input type="password" id="email" className="form-control" placeholder="Password" 
              ref = { ref => this.password = ref }/>
            </div>            
          </form>
          <div className="col-xs-12">
            <div className="col-xs-3">
              <button id="submit" onClick={ this.submit.bind( this ) } className="btn btn-default">submit</button>
            </div>
            <div className="col-xs-3">
              <button id="clear" className="btn btn-default" onClick={ this.clear.bind( this ) }>clear</button>
            </div>
            <div className="col-xs-3">
            </div>
            <div className="col-xs-3">
              <button id="clear" className="btn btn-default"
              onClick={ () => this.props.setLoc( 'login' ) }>back</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;

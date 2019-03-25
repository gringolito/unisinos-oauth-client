import './App.css';

import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import logo from './logo.svg';

function Logo(props) {
  let className;
  if (props.rotate) {
    className = 'App-logo';
  } else {
    className = 'App-user-image';
  }

  return (
    <img src={props.image} className={className} alt='logo' />
  );
}

function Message(props) {
  return (
    <p>{props.message}</p>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Olá amiguinho! Por favor faça seu login.',
      image: logo,
      rotate: true,
      authenticated: false,
      user: null,
      token: ''
    };
    // this.handleGoogleLoginFailure = this.handleGoogleLoginFailure.bind(this);
    // this.handleGoogleLoginSuccess = this.handleGoogleLoginSuccess.bind(this);
  }

  handleGoogleLoginSuccess = (response) => {
    const user = response.getBasicProfile();
    this.setState({
      message: 'Olá ' + user.getName() + ' (' + user.getEmail() + ')',
      image: user.getImageUrl(),
      rotate: false
    });

    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
    };
    fetch('http://localhost:4000/api/v1/auth/google', options).then(reply => {
        const userAuthenticationToken = reply.headers.get('x-auth-token');
        console.log(reply);
        reply.json().then(userData => {
            if (userAuthenticationToken) {
                this.setState({authenticated: true, user: userData, token: userAuthenticationToken})
            }
        });
    })

  }

  handleGoogleLoginFailure = (response) => {
    console.log(response);
  }

  render() {
    let authentication;
    let footer;

    if (this.state.authenticated) {
      authentication = null;
      footer = null;
    } else {
      authentication = (
          <GoogleLogin
            clientId='499745103799-4bheeqtg6s96lvjf92jvp93a3tee8pco.apps.googleusercontent.com'
            // theme='dark'
            onSuccess={this.handleGoogleLoginSuccess}
            onFailure={this.handleGoogleLoginFailure}
          />
      );
      footer = (
        <a className="App-link"
           href="https://reactjs.org"
           target="_blank"
           rel="noopener noreferrer"
         >
          Learn React
        </a>
      );
    }

    return (
      <div className='App'>
        <header className='App-header'>
          <Logo image={this.state.image} rotate={this.state.rotate} />
          <Message message={this.state.message} />
          {authentication}
          <br></br>
          {footer}
       </header>
      </div>
    );
  }
}

export default App;

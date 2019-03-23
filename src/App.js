import './App.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
      rotate: true
    };
  }

  handleGoogleLoginSuccess(response) {
    const user = response.getBasicProfile();
    this.setState({
      message: 'Olá ' + user.getName() + ' (' + user.getEmail() + ')',
      image: user.getImageUrl(),
      rotate: false
    });
    ReactDOM.render(this, document.getElementById('root'));
  }

  handleGoogleLoginFailure(response) {
    console.log(response);
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <Logo image={this.state.image} rotate={this.state.rotate} />
          <Message message={this.state.message} />
          <GoogleLogin
            clientId='499745103799-4bheeqtg6s96lvjf92jvp93a3tee8pco.apps.googleusercontent.com'
            // theme='dark'
            onSuccess={this.handleGoogleLoginSuccess}
            onFailure={this.handleGoogleLoginFailure}
          />
          <br></br>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

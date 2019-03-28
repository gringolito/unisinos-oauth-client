import './App.css';
import React, {Component} from 'react';
import GoogleLogin, {GoogleLogout} from 'react-google-login';
import logo from './logo.svg';
import HealthPrograms from './HealthPrograms';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

var config = require('./config');

function Logo(props) {
    const className = props.rotate ? 'App-logo' : 'App-user-image';
    return <img src={props.image} className={className} alt='logo' />;
}

function Message(props) {
    return <p>{props.message}</p>;
}

const NavBar = () => {
    return(
        <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">
                Apps4Health - Health Programs Manager
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Olá amiguinho! Por favor faça seu login.',
            image: logo,
            authenticated: false,
            name: '',
            email: '',
            user: null,
            token: ''
        };
    }

    handleGoogleLoginSuccess = (response) => {
        const user = response.getBasicProfile();
        this.setState({
            message: 'Olá ' + user.getName() + ' (' + user.getEmail() + ')',
            name: user.getName(),
            email: user.getEmail(),
            image: user.getImageUrl()
        });

        const tokenBlob = new Blob(
            [JSON.stringify({ access_token: response.accessToken }, null, 2)],
            { type: 'application/json' }
        );
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:4000/api/v1/auth/google', options).then(reply => {
            const userAuthenticationToken = reply.headers.get('x-auth-token');
            reply.json().then(userData => {
                if (userAuthenticationToken) {
                    this.setState({
                        authenticated: true,
                        user: userData,
                        token: userAuthenticationToken
                    });
                }
            });
        });
    }

    handleGoogleLoginFailure = (response) => {
        console.log(response);
    }

    handleGoogleLogout = () => {
        this.setState({
            authenticated: false,
            user: null,
            name: '',
            email: '',
            token: '',
            message: 'Até mais amiguinho!',
            image: logo
        });
    }

    render() {
        var body = this.state.authenticated ? (
                <div id='AppBody'>
                    <HealthPrograms user={ { id: this.state.user.id, auth: this.state.token } } />
                    <GoogleLogout
                        onLogoutSuccess={this.handleGoogleLogout}
                        buttonText='Logout'
                    />
                </div>
            ) : (
                <div id='AppBody'>
                    <GoogleLogin
                        clientId={config.googleAuth.clientID}
                        onSuccess={this.handleGoogleLoginSuccess}
                        onFailure={this.handleGoogleLoginFailure}
                    />
                    <br />
                    <a className='App-link'
                         href='https://reactjs.org'
                         target='_blank'
                         rel='noopener noreferrer'>
                            Learn React
                    </a>
                </div>
            );

        return (
            <div className='App'>
                <header className='App-header'>
                    <NavBar />
                    <Logo image={this.state.image} rotate={!this.state.authenticated} />
                    <Message message={this.state.message} />
                    {body}
                </header>
            </div>
        );
    }
}

export default App;
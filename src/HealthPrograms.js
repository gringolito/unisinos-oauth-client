
import './App.css';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class HealthPrograms extends Component {
    constructor(props) {
      super(props);
      this.state = {
          response: ''
      };
    }

    handleClickRequest = (user) => {
       const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            headers: {
                'x-auth-token' : user.auth
            }
        };
        fetch('http://localhost:4000/api/v1/users/healthPrograms/' + user.id, options).then(reply => {
            reply.json().then(userData => {
                this.setState({ response: userData });
            });
        });
    }

    handleHealthProgramChange = () => {

    }
    render() {
        return (
            <div className='HealthPrograms'>
                <TextField
                    onChange={ () => this.handleHealthProgramChange() }
                    name='Health Program'
                    variant='outlined'
                    margin='dense'
                />
                <Button
                    onClick={ () => this.handleClickRequest(this.props.user) }
                    variant='contained'
                >
                    Subscribe
                </Button>
                 <Button
                    onClick={ () => this.handleClickRequest(this.props.user) }
                    variant='contained'
                >
                    Unsubscribe
                </Button>
                <p />
                <Button
                    onClick={ () => this.handleClickRequest(this.props.user) }
                    variant='contained'
                >
                    Get Health Programs
                </Button>
                <p>{this.state.response}</p>
            </div>
        );
    }
}

export default HealthPrograms;
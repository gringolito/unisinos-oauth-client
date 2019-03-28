
import './App.css';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class HealthPrograms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribedPrograms: null,
            program: ''
        };
    }

    handleGetHealthProgramsClick = (user) => {
        const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            headers: {
                'x-auth-token': user.auth
            }
        };
        fetch('http://localhost:4000/api/v1/users/healthPrograms/' + user.id, options).then(reply => {
            reply.json().then(userData => {
                this.setState({
                    subscribedPrograms: {
                        name: userData.name,
                        subcriptionDate: userData.subscriptionDate
                    }
                });
            });
        });
    }

    handleSubscribeClick = (user) => {
        const program = new Blob(
            [JSON.stringify({ healthProgram: this.state.program }, null, 2)],
            { type: 'application/json' }
        );
        const options = {
            method: 'POST',
            body: program,
            mode: 'cors',
            cache: 'default',
            headers: {
                'x-auth-token': user.auth
            }
        };
        fetch('http://localhost:4000/api/v1/users/healthPrograms/' + user.id, options).then(reply => {
            console.log(reply);
        });
    }

    handleUnsubscribeClick = (user) => {

    }

    handleHealthProgramChange = (event) => {
        if (event.target.value) {
            this.setState({ program: event.target.value })
        } else {
            this.setState({ program: '' })
        }
    }

    render() {
        return (
            <div className='HealthPrograms'>
                <TextField
                    value={this.state.program}
                    onChange={this.handleHealthProgramChange}
                    label='Health Program'
                    variant='outlined'
                    margin='dense'
                />
                <Button
                    onClick={() => this.handleSubscribeClick(this.props.user)}
                    variant='contained'
                >
                    Subscribe
                </Button>
                <Button
                    onClick={() => this.handleUnsubscribeClick(this.props.user)}
                    variant='contained'
                >
                    Unsubscribe
                </Button>
                <p />
                <Button
                    onClick={() => this.handleGetHealthProgramsClick(this.props.user)}
                    variant='contained'
                >
                    Get Health Programs
                </Button>
                <p>{this.state.subscribedPrograms}</p>
            </div>
        );
    }
}

export default HealthPrograms;
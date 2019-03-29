
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
                var str = JSON.stringify(userData, null, 2);
                this.setState({
                    subscribedPrograms: str
                });
            });
        });
    }

    handleSubscribeClick = (user) => {
        if (this.state.program === '') {
            return;
        }

        const program = new Blob(
            [JSON.stringify({ healthProgram: this.state.program })],
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
            this.setState({ program : '' });
        });
    }

    handleUnsubscribeClick = (user) => {
        if (this.state.program === '') {
            return;
        }

        const program = new Blob(
            [JSON.stringify({ healthProgram: this.state.program })],
            { type: 'application/json' }
        );
        const options = {
            method: 'DELETE',
            body: program,
            mode: 'cors',
            cache: 'default',
            headers: {
                'x-auth-token': user.auth
            }
        };
        fetch('http://localhost:4000/api/v1/users/healthPrograms/' + user.id, options).then(reply => {
            this.setState({ program : '' });
        });
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
            <div id='HealthPrograms' className='HealthProgram-header'>
                <div className='App-spacer'>
                    <TextField
                        value={this.state.program}
                        onChange={this.handleHealthProgramChange}
                        label='Health Program'
                        variant='outlined'
                        margin='dense'
                    />
                    <div className='App-spacer'>
                        <table className='HealthProgram-table'>
                        <tbody>
                        <tr>
                        <td>
                        <Button
                            onClick={() => this.handleSubscribeClick(this.props.user)}
                            variant='contained'
                        >
                            Subscribe
                        </Button>
                        </td>
                        <td>
                        </td>
                        <td>
                        <Button
                            onClick={() => this.handleUnsubscribeClick(this.props.user)}
                            variant='contained'
                        >
                            Unsubscribe
                        </Button>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
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
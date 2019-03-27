
import './App.css';
import React, {Component} from 'react';

class HealthPrograms extends Component {
    constructor(props) {
      super(props);
      this.state = {
          response: ''
      };
    }

    handleClickRequest = (userEmail) => {
        // const requestBlob = new Blob(
            // [JSON.stringify({ user: { id: userEmail } })],
            // { type: 'application/json' }
        // );
        const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:4000/api/v1/users/healthPrograms/' + userEmail, options).then(reply => {
            reply.json().then(userData => {
                this.setState({ response: userData });
            });
        });
    }

    render() {
        return (
            <div className='HealthPrograms'>
                <button onClick={ () => this.handleClickRequest(this.props.user) }>
                    Get Health Programs
                </button>
                <p>{this.state.response}</p>
            </div>
        );
    }
}

export default HealthPrograms;
import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/form';
import * as userService from '../services/userService';
import auth from '../services/authService';
import { Link } from 'react-router-dom';

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label('Username'),
    password: Joi.string().required().min(4).label('Password'),
    name: Joi.string().required().label('Name'),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location = '/';
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div style={{ width: '50%', margin: '10% auto' }}>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          <div
            style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}
          >
            {this.renderButton('Register')}
            <span>
              {' '}
              Already have an account? <Link to="/login">Login</Link>{' '}
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterForm;

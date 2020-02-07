import React from 'react'
import { Button, Form, Grid, Header,  Message, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'



export class LoginForm extends React.Component {
  state = { email:'', password: '',    redirect: false
};

setRedirect = () => {
  this.setState({
    redirect: true
  })
}
renderRedirect = () => {
  if (this.state.redirect) {
    console.log('render redirect true...')
    return <Redirect to='/' />
  }
}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    let {email, password } = this.state;
    let req={email,password};
    //console.log({email, password });
    //this.props.history.push('/');
    axios.post('http://localhost:3000/api/users/signin',req)
      .then(res =>{
        if(res.data === "user not found"){
        alert("user not found");
        //this.props.history.push('/')
      }
        else if(res.data ==="Wrong password."){
          alert("mdp incorect");
        }else {

        // save token in localstorage
        localStorage.setItem('token', JSON.stringify(res.data));
        // const user = localStorage.getItem('item');
        // JSON.parse(user);
        //this.props.history.push('/');

        window.location = '/';
      }
      }
      )
      //.catch(err => console.log(err) )
      
  } 
  handleload = () =>{
    alert('page loaded successfully...');
    console.log('2500')
  }
      //console.log(resp.data);
    // const response = axios.get('http://localhost:3000/api/users/');
    // console.log(response);
    //this.setState({ submittedlastname: lastname, submittedfirstname: firstname, submittedEmail: email , submittedphone: phone})
  
  render() {
    const { email, password} = this.state
    return(
      
  <Grid textAlign='center' style={{ height: '10vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' textAlign='center' >
        Log-in to your account
      </Header>
      <div>
      {this.renderRedirect()}
      </div>
      <Form size='large' onSubmit={this.handleSubmit}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' name='email' value={email} placeholder='E-mail address'  onChange={this.handleChange} />
          <Form.Input 
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={this.handleChange}
            name='password' 
            value={password}
          />

          <Button type='submit' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='/signup'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
    )};
}

import React from 'react';
import {Button,  Form, Segment, Divider, Transition } from 'semantic-ui-react';
import axios from 'axios';



export class signup extends React.Component{
    state = { lastname: '', firstname:'', email: '', phone: '', password: '',username: '', password2:'',
    emptymail:false, emptyusername: false, mdpnotmatch:false, emptymdp: false};

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    let { lastname, firstname,username, email, phone, password, password2 } = this.state;
    if(password === password2 && email && username){
    axios.post('http://localhost:3000/api/users/',{ lastname, firstname,username, email, phone, password })
        .then(res => console.log(res.data) ,
        this.props.history.push('/login'))
        .catch(this.props.history.push('/'))
  } else{
        if(! username){
          this.setState({emptyusername: true});
        }
        if(! email){
              this.setState({emptymail: true});
        }
        if(!password || !password2){
          this.setState({emptymdp: true});
        }
        if(password !== password2){
          this.setState({mdpnotmatch: true});
        }
    }
}

  render() {
    const { lastname, firstname,username, email, phone, password, password2, emptymail,emptyusername,emptymdp, mdpnotmatch} = this.state
    return (
      <Segment>
        <Form onSubmit={this.handleSubmit}>
           <h2 className='namediv'><h4 className='namediv' >Join us and find out what you've been missing, </h4> Sign up now ! </h2>
        <Divider hidden />
        <Transition visible={mdpnotmatch} animation='scale' duration={1000}>
          <p className='falsemdp' ><b>Password don't match</b></p>
        </Transition>

        <Divider hidden />
        <Transition visible={emptymail} animation='scale' duration={1000}>
          <p className='falsemdp' ><b>e-mail field can't be empty</b></p>
        </Transition>

        <Divider hidden />
        <Transition visible={emptyusername} animation='scale' duration={1000}>
          <p className='falsemdp' ><b>Username field can't be blank</b></p>
        </Transition>

        <Divider hidden />
        <Transition visible={emptymdp} animation='scale' duration={1000}>
          <p className='falsemdp' ><b>Password field can't be blank</b></p>
        </Transition>



            <Form.Group widths='equal'>
                <Form.Input label='Last Name' placeholder='Last name' name='lastname' value={lastname} onChange={this.handleChange} />
                <Form.Input label='First Name' placeholder='First name' name='firstname' value={firstname} onChange={this.handleChange} />
            </Form.Group>
            <Form.Input label='username' placeholder=' username' name='username' value={username} onChange={this.handleChange} />
            <Form.Group >
                <Form.Input 
                fluid label='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={this.handleChange}
                width='12'
                />
                <Form.Input fluid label='phone' width ='10' placeholder='XX-XXX-XXX' name='phone' value={phone} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input required label='Mot de passe:' value={password} placeholder='mot de passe' name='password' type='password' onChange={this.handleChange} />
                <Form.Input required label='Confirmation mot de passe' name='password2' onChange={this.handleChange}  placeholder='confirmez mot de passe' type='password' value={password2}/>
            </Form.Group>
            <Form.Checkbox label='I agree to the Terms and Conditions' />
            <Button type='submit' content='Submit' />
        </Form>
      </Segment>
    )
  }
}
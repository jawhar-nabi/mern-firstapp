import React from 'react';
import {Button,  Form, Segment } from 'semantic-ui-react';
import axios from 'axios'; 
import {getdate} from './getdate';




export class ajout extends React.Component{
    state = { title: '', text: ''};

    componentDidMount() {
        const user = localStorage.getItem('token');
        this.setState({ user });
    }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    let { title, text } = this.state;
    console.log(getdate());
    const date = getdate();
    const user = JSON.parse(localStorage.getItem('token'));
    const id = user.id ;
    //const id= user.id;
    //console.log({ lastname, firstname, email, phone });
    
    axios.post('http://localhost:3000/api/sujets/',{ title, text, date, id })
        .then(res => console.log(res.data),
        this.props.history.push('/sujet')
        )
        .catch(err => console.log(err))
      //this.setState({ submittedlastname: lastname, submittedfirstname: firstname, submittedEmail: email , submittedphone: phone})
  }

  render() {
    const { title, text} = this.state
    return (
      <Segment>
        {this.state.user ?
        <Form onSubmit={this.handleSubmit}>
                <Form.Input width='12' label='title' placeholder='title' name='title' value={title} onChange={this.handleChange} />
                <Form.Input 
                width='20'
                height='50'
                fluid label='text'
                placeholder='text'
                name='text'
                value={text}
                onChange={this.handleChange}
                />
            <Button type='submit' content='Submit' />
        </Form>
        : <h1 className='all'><i><strong>Please Login to add contents</strong></i></h1> }

      </Segment>
    )
  }
}
import React from 'react';
import { Accordion, Form, Menu ,Divider, Transition} from 'semantic-ui-react';
import axios from 'axios';
import './settings.css';


export class settings extends React.Component{
  state = { activeIndex: 3 , oldpass:'', newpass:'', msg:'', visible: false, errmdp: false}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })


  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }

  handleEnter = () => {
    let { newpass, oldpass } = this.state;
    console.log('lena 5edmet ...')
    const userid = JSON.parse(localStorage.getItem('token')).id;
    console.log(userid);
    axios.post('http://localhost:3000/api/users/changepassword',{ oldpass, newpass , userid})
        .then(window.location = '/') 
        
        .catch(err => {console.log(err); this.setState({ errmdp: true })})

        
  }

  handleCancel = () =>{
    this.setState({ oldpass: "", newpass: "", username: "", lastname: "", firstname: ""});
    this.setState({ activeIndex: 3 })
  }
  handleChangename = () => {
    let { username, lastname, firstname } = this.state;
    const userid = JSON.parse(localStorage.getItem('token')).id;
    axios.post('http://localhost:3000/api/users/changename',{ username, lastname, firstname , userid})
        .then(res => console.log(res.data) ,
        this.setState({ activeIndex: 3 }),this.setState({ visible: true })    )
        .catch(err => console.log(err))
  }


    render(){
      const {oldpass, newpass, username, lastname, firstname} = this.state;
      const panels = (
        <Form>
            <Form.Input id='myInput' type='password' label='entrer votre mot de passe :' name='oldpass' value={oldpass} onChange={this.handleChange}/>
            <Form.Input id='myInput' type='password' label='nouveau mdp' name='newpass' value={newpass} onChange={this.handleChange}/>
            <Form.Input id='myInput' type='password' label='confirm nmdp' name='nnmdp' onChange={this.handleChange}  />
            <Form.Group>      <Form.Button onClick={this.handleCancel} > cancel</Form.Button>     <Form.Button onClick={this.handleEnter} >Enter </Form.Button> </Form.Group>
        </Form>
      )
      const info_panel = (
        <Form>
            <Form.Input id='myInput' type='text' label='change user name :' name='username' value={username} onChange={this.handleChange}/>
            <Form.Input id='myInput' type='text' label='change last name' name='lastname' value={lastname} onChange={this.handleChange}/>
            <Form.Input id='myInput' type='text' label='change first name' name='firstname' value={firstname} onChange={this.handleChange}  />
            <Form.Group>      <Form.Button onClick={this.handleCancel} > cancel</Form.Button>     <Form.Button onClick={this.handleChangename} >Enter </Form.Button> </Form.Group>
        </Form>
      )


      const panel_email = (
        <Form>
            <Form.Input id='myInput' label='enter your e-mail :' name='e-mail' />
            <Form.Input id='myInput' label='enter a new e-mail' name='new-e-mail'  />
            <Form.Group>      <Form.Button onClick={this.handleCancel} > cancel</Form.Button>     <Form.Button onClick={this.handleEnter} >Enter </Form.Button> </Form.Group>
        </Form>
      )
      
      const { activeIndex,  visible, errmdp } = this.state
        return(
          <div>
          <h1><strong>Settings</strong></h1>
          <Divider hidden />
        <Transition visible={visible} animation='scale' duration={1000}>
          <p className='correct'><b>All changes were saved successfully</b></p>
        </Transition>          
        <Transition visible={errmdp} animation='scale' duration={1000}>
          <p className='falsemdp'><b>mot de passe incorrecte</b></p>
        </Transition>

          
          <hr/><br/>
          <Accordion  as={Menu}  fluid vertical>
            <Menu.Item >
            <Accordion.Title
              width={500}px
              active={activeIndex === 0}
              content={<strong style={{fontSize: 20}}>change information </strong>}
              index={0}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 0} content={info_panel} />
          </Menu.Item>
          <Menu.Item >
            <Accordion.Title
              width={500}px
              active={activeIndex === 1}
              content={<strong style={{fontSize: 20}}>change e-mail</strong>}
              index={1}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 1} content={panel_email} />
          </Menu.Item>
          <Menu.Item >
            <Accordion.Title
              width={500}px
              active={activeIndex === 2}
              content={<strong style={{fontSize: 20}}>change password<br/></strong>}
              index={2}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 2} content={panels} />
          </Menu.Item>
          </Accordion>
          </div>
        )
    }
}
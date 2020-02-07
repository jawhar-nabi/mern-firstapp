import faker from 'faker'
import React from 'react'
import {Dropdown, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';




class DropdownImageTriggerExample extends React.Component{
  state = {value:''}
 

  handleChange = (e, { value }) =>{ 
    
    // this.setState({ value },  console.log({value}),
    if(value==='settings'){
      window.location= '/settings';
    }else if(value==='account'){
      window.location = '/account/'+JSON.parse(localStorage.getItem('token')).id;
    }
     else {
    localStorage.removeItem('token');
    window.location = '/';
  }}



handleSignout = () => {
  console.log('sign out...');
  localStorage.removeItem('token');
}


render () {
  //const { value } = this.state
  var trigger = '';
  const user = JSON.parse(localStorage.getItem('token'));
  if(user){
  //console.log('render user: ', user.name);

  trigger = (
    <span style={{fontFamily:'Arial', align:'center'}}>
      <Image avatar src={faker.internet.avatar()} /><strong>{user.name}</strong> 
    </span>
  )
 }
   const options = [
    { key: 'user', text: 'Account', icon: 'user', value:'account' },
    { key: 'settings', text: 'Settings', icon: 'settings', value:'settings' },
    { key: 'sign-out', text: 'Sign Out', icon: 'sign out', value:'signout'  }
  ]
return (
  <Dropdown           onChange={this.handleChange}
   trigger={trigger} options={options} pointing='top left' icon={null} />

)


 }
}

export default withRouter(DropdownImageTriggerExample)
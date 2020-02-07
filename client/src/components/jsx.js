import React from 'react'


// export class Jsx extends React.Component {
// state={x:''};

//   handleChange = (e, { name, value }) =>{ this.setState({ [name]: value });
//                                         return value};

// //   handleSubmit = () => {
// //     const {email, password } = this.state;
// //     const req={email,password};
// //     console.log({email, password });
// //     axios.post('http://localhost:3000/api/users/signin',req)
// //       .then(console.log(req));
// //   } 
//       //console.log(resp.data);

  
//     // const response = axios.get('http://localhost:3000/api/users/');
//     // console.log(response);
    
//     //this.setState({ submittedlastname: lastname, submittedfirstname: firstname, submittedEmail: email , submittedphone: phone})
  


//   render() {
//    let {x} = this.state
//     return(
//     <div>
//         <Form.Input fluid icon='question' iconPosition='left' name='x' value={x} placeholder='enter a number'  onChange={this.handleChange} />
//         <h2>value is: {x}</h2>
//     </div>
//     )};
// }



 export class Jsx extends React.Component {
  state = {
    user: null
  }
  state={handle:''};

  componentDidMount () {

  }
  render() {
    let {handle} = this.state;
    return(
          <div>
              <h2>value is: {handle}</h2>
          </div>
          )};  
}
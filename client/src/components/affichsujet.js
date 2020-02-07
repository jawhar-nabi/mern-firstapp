import React from 'react';
import { Form, Container, Header, Button, Comment,Segment,Icon, Confirm } from 'semantic-ui-react';
import axios from 'axios';
import faker from 'faker';
import './affichsujet.css';
import {getdate} from './getdate';


export class affichsujet extends React.Component  {  
  // constructor(props){
  //   super(props)
  //   this.state={val: ''}
  // }
  state ={ sujet: '', commentaire: '', user:'', title:'', text:'', commentaireid:''};
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  show = (props) => {      
  this.setState({ open: true, commentaireid: props })  }

  show2 = () => this.setState({ open2: true })

  handleConfirm = () => { 
    axios.delete('http://localhost:3000/api/sujets/delete-sujet/'+this.props.match.params.id)
      .then( res =>(console.log(res.data) , window.location = '/sujet' , this.setState({ open: false }) ) )}

  handleConfirm2 = () => { 
    console.log('confirm  2')      }    

  handleCancel = () => (this.setState({ open: false } ), this.setState({ open2: false } ) )

  handleChange = (e, {name, value }) => this.setState({[name]: value})

  addcomment = () =>{
    let {commentaire}= this.state;   
    const date= getdate();
    const sujetid = this.props.match.params.id;
    const user = JSON.parse(localStorage.getItem('token'));
    this.setState({ user });
    const name = user.name;
    console.log(user.name);
    axios.post('http://localhost:3000/api/sujets/addcomment/'+sujetid,{commentaire, name, date})
      .then(res => console.log(res.data), window.location.reload()
      )
  }
  handleDeletecommentaire = () =>{
    let {commentaireid}=this.state;
    console.log('iddddd ... ', {commentaireid});
      axios.post('http://localhost:3000/api/sujets/delete-commentaire/'+this.props.match.params.id, {commentaireid})
        .then( res =>(console.log(res.data) ,  this.setState({ open: false }) ), window.location.reload() )
    
  }

  upvote = (props) => {
    const comid = props;
    const userid = JSON.parse(localStorage.getItem('token')).id;
    axios.post('http://localhost:3000/api/sujets/upvote/'+this.props.match.params.id,{comid, userid})
      .then(res => console.log(res.data))
  }

  downvote = (props) => {
    const comid = props;
    const userid = JSON.parse(localStorage.getItem('token')).id;
    axios.post('http://localhost:3000/api/sujets/downvote/'+this.props.match.params.id,{comid, userid})
      .then(res => console.log(res.data))
  }

  updown = (props) => {
    this.upvote(props);
    this.downvote(props);

  }
  downup = (props) => {
    this.downvote(props);
    this.upvote(props);


  }


  componentDidMount(){
      // let {sujet, user}= this.state;
      const user = JSON.parse(localStorage.getItem('token'));
      var x = '';
      axios.get('http://localhost:3000/api/sujets/affich-sujet/'+ this.props.match.params.id )
      .then(                
        res =>( 
        this.setState({ sujet: res.data }),
        this.setState({ user })
      ))
      //console.log('1888 true...'+res.data.Author))
      .catch(err => console.log('erreur..',err))

      // The code below is to get sujet author information, we replaced it with populate('author') in /api/sujets
      // axios.get('http://localhost:3000/api/users/'+x )
      // .then(
      //   res =>( console.log('react success 2222....'+res.data+'x = '+x),
      //     this.setState({ profil: res.data }),
          
      // console.log('6060 profile true...')))
      // .catch(err => console.log('erreur..',err))

  }
  render(){
    var userid= '';
    var username= '';
    const user = JSON.parse(localStorage.getItem('token'));
    if(user){
     userid = JSON.parse(localStorage.getItem('token')).id;
     username = JSON.parse(localStorage.getItem('token')).name;

    }
    const {commentaireid, sujet, commentaire, title, text}= this.state;
  return(
    <Segment>
    { !!this.state.user ?
    <div className='rr'>
    <div style={{background:'lightgray'}} className="sujet" >
      <Container text>

    <Header className='es-icon' as='h2'>{sujet.title}</Header>
    { sujet.author._id === userid ? 
    <div className='r'>
            <a href='#' onClick={this.show2}><Icon className='es-ion' name='edit' >edit</Icon></a>
            <dd/>
            <a href='#' onClick={this.show}><Icon className='es-ion' name='delete' >delete</Icon></a>
            <Confirm className="ui-button"
          open={this.state.open}
          header='Confirm delete'
          content='do you want to delete item(s) ?'
          cancelButton='No'
          confirmButton="Delete it!"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          />
          <Confirm className="ui-button2"
          open={this.state.open2}
          header='modify content'
          content = 'azerty'
          cancelButton='Cancel'
          confirmButton="Confirm"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm2}
          >
           <Confirm.content>
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
           </Confirm.content>
          </Confirm>
          </div>
          : null }
    <h6 style={{color:'green'}}>user : <a href='' onClick={() => this.props.history.push('/account/'+sujet.author._id)}> {sujet.author.firstname}{sujet.author.lastname}</a></h6>
    <p>
      {sujet.text}
    </p>
    <h6 style={{color:'gray'}}>Added on :{sujet.date}</h6>
  </Container>
    </div>
    <br/>
    <div>
    <Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>
      
    
    {sujet.comments.map(com =>( 
      

    <Comment className='comm'>
      <Comment.Avatar  src={faker.internet.avatar()} />
      <Comment.Content>
        <Comment.Author as='a'>{com.user} </Comment.Author>
        { sujet.author._id === userid || com.user === username ?
        <div className='comment-buttons'>
        <a href='#' onClick={this.show2}><Icon className='es-icon' name='edit' >edit</Icon></a>
            <dd/>
            <a href='#' onClick={ () => this.show(com._id) }>
            {/* () =>{   
               axios.post('http://localhost:3000/api/sujets/delete-commentaire/'+this.props.match.params.id+'/'+ com._id)
                .then( res =>(console.log(res.data) , window.location.reload(),  this.setState({ open: false }) ) )
            } */}
              <Icon className='es-icon' name='delete' >delete</Icon></a>
            <Confirm className="ui-button"
          open={this.state.open}
          header='Confirm delete'
          content='do you want to delete item(s) ?'
          cancelButton='No'
          confirmButton="Delete it!"
          onCancel={this.handleCancel}
          onConfirm={this.handleDeletecommentaire}
          />
          <Confirm className="ui-button2"
          open={this.state.open2}
          header='modify content'
          content = 'azerty'
          cancelButton='Cancel'
          confirmButton="Confirm"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm2}
          >
            <Confirm.content>
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
          </Confirm.content>
         </Confirm>
         </div>
         : null }
        <Comment.Metadata>
          <div>{com.date}</div>
        </Comment.Metadata>
        <Comment.Text>{com.content}</Comment.Text>
      </Comment.Content>
      { !!com.upvotes.find(up => up === userid) ? 
            <div >
            {/* //how to disable a button    disabled={!!com.upvotes.find(up => up === userid)  } */}
            <Button className="upvote2"  color= "black" onClick={() => {this.upvote(com._id); window.location.reload()}
          }>{com.upvotes.length}  <Icon name='thumbs up outline'/> </Button>

          <Button className="downvote" onClick={() => {this.updown(com._id); setTimeout(() =>{window.location.reload()},100)}}>
          {com.downvotes.length}  <Icon name='thumbs down outline'/></Button>
          
          </div>
          
    
      : !!com.downvotes.find(up => up === userid) ?
      <div id="voting">
        {/* //how to disable a button    disabled={!!com.upvotes.find(up => up === userid)  } */}
        <Button className="upvote" onClick={() => {this.downup(com._id); setTimeout(() =>{window.location.reload()},100)}}>
      {com.upvotes.length}  <Icon name='thumbs up outline'/></Button>
      <Button className="downvote2"  color="black" onClick={() => {this.downvote(com._id); window.location.reload()}}>
      {com.downvotes.length}  <Icon name='thumbs down outline'/></Button> 
      </div>
      :
      <div>
      <Button className="upvote" onClick={() => {this.upvote(com._id); window.location.reload()}}>
      {com.upvotes.length}  <Icon name='thumbs up outline'/></Button>

      <Button className="downvote"   onClick={() => {this.downvote(com._id); window.location.reload()}}>
      {com.downvotes.length}  <Icon name='thumbs down outline'/></Button> 


      </div>
      }
    </Comment>
    ))}
    
    <Form reply>
      <Form.TextArea name='commentaire' value={commentaire}  onChange={this.handleChange} />
      <Button type='Submit' content='Add Reply' labelPosition='left' icon='edit' onClick={this.addcomment} primary />
    </Form>
  </Comment.Group>

    </div>
    </div>
     : <div>
    <h1><i><strong>Please Login to view contents</strong></i></h1>
    <a href='/login'>go to login page</a>
    </div> } 
  </Segment>
  )
  }
}

import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import SearchExampleStandard from './search';
import './AppNavbar.css';
import DropdownImageTriggerExample from './profile';



class AppNavbar extends Component {
    
    state = {
            user: null,
        }
        constructor(props) {
            super(props);
        
            this.toggle = this.toggle.bind(this);
            this.state = {
              isOpen: false
            };
          }
        
    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('token'));
        //console.log('user is : '+user.id);
        this.setState({ user });
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){
        return(     
            <div>
                <Navbar expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand className="knockout">
                            {/* <img src=  {logo} alt="Site Logo"
                         width= {220} px height= {60} />  */}
                            <a className='knockout'  href="/" > Bloggy</a>
                        </NavbarBrand>
                        <NavbarToggler  onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav  className="ml-auto" navbar>
                                
                                <NavItem >
                                    <NavLink  className="items1 item2" href="/">
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem >
                                    <NavLink className="items1 item2" href="/sujet/">
                                        Subject
                                    </NavLink>
                                </NavItem>
                                
                                {this.state.user ? null :  <NavItem >
                                    <NavLink className="items1 item2" href="/login">
                                        Login
                                    </NavLink>
                                </NavItem>
                                }                                
                                {this.state.user ? null :
                                <NavItem >
                                    <NavLink className="items1 item2" href="/signup">
                                        Signup
                                    </NavLink>
                                </NavItem>}
                                
                                {this.state.user ? <NavItem >
                                    <NavLink className="items1 item2 item3" icon='user' href="/ajout-sujet"  >
                                        <strong>ajouter un sujet</strong>
                                    </NavLink>
                                </NavItem>
                                : null}

                            {this.state.user ? <NavItem >
                                    <NavLink className=" item3" href="#" >
                                        <DropdownImageTriggerExample />
                                    </NavLink>
                                </NavItem>
                                : null}
                                <NavItem width={8}px>
                                    <NavLink className="items1 search" href="#"  >
                                        <SearchExampleStandard/>
                                </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}



export default AppNavbar;
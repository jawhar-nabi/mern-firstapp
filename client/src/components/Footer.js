import React from 'react';
import './footer.css';

export default class Footer extends React.Component{

    render(){
        return(
            <div className='footer'>
                <br/>
                <hr/>
                 <h5 className ='c'><a href='/about' >About us ! </a></h5> | 
                <h5 className ='c'><a href='/contact' >Contact us ! </a></h5> |
                  <i className ='c'> 2019 &copy; copyrights  </i>

            </div>

        )
    }

}
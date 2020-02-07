import React from 'react';
import './account.css';

export class contact extends React.Component{

    render(){

        return(
            <div className='contact'>
                <h6 className='namediv'>Company name: </h6> 
                <h2 className='namediv'>Bloggy Company</h2>
                <br/>                
                <h6 className='namediv'>E-mail :</h6> 
                <h2 className='namediv'>bloggy@gmail.com</h2>
                <br/>                
                <h6 className='namediv'>Phone :</h6> 
                <h2 className='namediv'>+256 310 200 51 51</h2>
                <br/>                
                <h6 className='namediv'>Fax :</h6> 
                <h2 className='namediv'>+256 310 200 51 52</h2>

            </div>

        )
    }
}
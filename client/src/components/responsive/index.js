import React, { Component } from 'react';

import Item from './item'
import Lead from './lead'

import './index.css'

class TopMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menu_class: '',
        }
    }

    setToggleTopMenuClass = () => {
        if (this.state.menu_class === '') {
            this.setState({
                menu_class: 'toggled',
            })
        } else {
            this.setState({
                menu_class: '',
            })
        }
    }


    render = () => {
        let top_menu_class = `top-menu ${this.state.menu_class}`
        return (
            <div>
                <div className={top_menu_class} >
                    <Lead />

                    <div className='right'>
                        <Item text='Right1' />
                        <Item text='Right2' />
                    </div>
                    <a  className='top-menu-icon' onClick={this.setToggleTopMenuClass}>&#9776;</a>
                    <div className='clear-fix' />
                </div>
            </div>
        )
    }
}

export default TopMenu;

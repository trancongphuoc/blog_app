import React, {Component} from 'react';
import MyContext from '../commons/MyContext'

export default class MyContextProvider extends Component {

    render(){
        const {value} = this.props;
        return <MyContext.Provider value={value}>
            {this.props.children}
        </MyContext.Provider>
    }
}
/**
 * Created by Arison on 2018/11/1.
 */
import React from 'react';
/**
 * Created by Arison on 2018/11/1.
 */
class AccountPages extends React.Component{
       constructor(props){
        super(props);
    }
    render(){
        return <div>
            {JSON.stringify(this.props.location.search)}
        </div>
    }
}

export  default AccountPages;
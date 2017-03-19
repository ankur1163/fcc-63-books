import React, { Component } from 'react';


class Allsetiings extends Component {
    
    render() {
        
        //const zoneStyle = styles.zone; // needs to be inside the render func!
        
        return(<div>
        <Link to={`/mybooks/${username}`}>My Books</Link>&emsp;&emsp;
                
                <Link to ="/totalbooks">All member's  books</Link>&emsp;&emsp;
                <Link to= {`/srequests/${username}`}>Sent requests</Link>&emsp;&emsp;
                <Link to ={`/rrequests/${username}`}>Recieved requests</Link>&emsp;&emsp;
                <Link to={`/settings/${username}`}>My settings</Link>
                <h2> Your personal settings </h2>
                
                </div>);
    }
}

export default Allsetiings
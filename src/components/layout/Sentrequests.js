import React, { Component } from 'react';

import Api from '../../utils/ApiManager.js';


class Sentrequests extends Component {
    constructor(){
        super()
        this.state={
            sentrequest:[]
        }
    }
    handledelete(e){
        console.log("handle delete clicked")
        var isbn = e.target.id;
        var urlWithId =this.props.location.pathname;
        var rusername = urlWithId.split('/').pop();
        var index ;
        for(var i =0;i<this.state.sentrequest.length;i++){
            if(this.state.sentrequest[i].isbn===isbn){
                index =i;
            }
        }
        var susername = this.state.sentrequest[index].username;
        console.log("rusername",rusername);
        console.log("susername",susername);
        Api.del("/api/books/"+rusername+"/"+susername+"/"+isbn),null,(err,response)=>{
              if (err) { 
                alert("Error: " + err); 
                return;
            }
        
            console.log('This username details from server: ' + JSON.stringify(response.message));
        }
    }
    componentWillMount(){
        var urlWithId =this.props.location.pathname;
        var username = urlWithId.split('/').pop();
         Api.get('/api/books/r/s/' + username, null, (err, response) => {
            if (err) { 
                alert("Error: " + err); 
                return;
            }
        
            console.log('This username details from server: ' + JSON.stringify(response.message));
        
            this.setState({
                    sentrequest: response.message
                });
        
            
        });
        
    }
    
    render() {
        var handledelete =this.handledelete.bind(this)
        var ty = this.state.sentrequest.map(function(i,index){
            return(
                <div key={index} className="rr">
                {i.title}<br />
                <img src={i.thumbnail} alt="Mountain View"  /><br/>
                from:{i.requesterusername}<br />
                isbn:{i.isbn}<br />
                Person who owns the book:{i.username}
                 <button id={i.isbn} onClick={handledelete} >Delete request </button>
                
                
                
                </div>
                )
        })
        
        return(<div>
        <Link to={`/mybooks/${username}`}>My Books</Link>&emsp;&emsp;
                
                <Link to ="/totalbooks">All member's  books</Link>&emsp;&emsp;
                <Link to= {`/srequests/${username}`}>Sent requests</Link>&emsp;&emsp;
                <Link to ={`/rrequests/${username}`}>Recieved requests</Link>&emsp;&emsp;
                <Link to={`/settings/${username}`}>My settings</Link>
                <h2> Requests sent </h2>
                {ty}
                </div>);
    }
}

export default Sentrequests
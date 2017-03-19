import React, { Component } from 'react';
import {Link} from 'react-router';
var books = require('google-books-search-2');
import Api from '../../utils/ApiManager.js';

class Allbooks extends Component {
    constructor(){
        super()
        this.state={
            booksearch:"",
            bookresults:[],
            username:"",
            mybooks:[],
            totalbooks:[]
        }
    }
    
    handlebookinput(e){
        console.log("amazing")
        console.log("inside handle book inpout")
        console.log("state is",this.state.booksearch)
        var BookInputText = e.target.value;
        
        this.setState({booksearch:BookInputText});
        
    }
    addfunction(e){
        console.log("book added")
        console.log("isbn is ",e.target.id)
        var isbn  = e.target.id;
        console.log("this",this)
        console.log("this.state.username",this.state.username)
        var username = this.state.username;
        var thumbnail;
        var title;
        var description;
        console.log("bookresults.length",this.state.bookresults.length)
        for(var i =0;i<this.state.bookresults.length;i++){
            
            if(this.state.bookresults[i].isbn.identifier===isbn){
                console.log("condition met")
                console.log("this.state.bookresults[i].thumbnail",this.state.bookresults[i].thumbnail);
                thumbnail=this.state.bookresults[i].thumbnail;
                title=this.state.bookresults[i].title;
                description=this.state.bookresults[i].description;
            }
            else{
                
            }
        }
        
        
        var obj = {"isbn":isbn,"thumbnail":thumbnail,"title":title,"description":description};
        
          Api.post('/api/books/' + username+'/'+isbn,{"isbn":isbn,"thumbnail":thumbnail,"title":title,"description":description}, (err, response) => {
            if (err) { 
                alert("Error: " + err); 
                return;
            }
        
            console.log('This username details from server: ' + JSON.stringify(response.message));
        
            this.setState({
                    mybooks: response.message
                });
        
            
        });
    }
    handleusername(e){
        this.setState({username:e.target.value})
        console.log("username is ",this.state.username)
    }
    removeresultfunc(){
        this.setState({
            bookresults:[],
            booksearch:""
        })
    }
    getdata(e){
        var username = this.state.username;
         Api.get('/api/books/' + username, null, (err, response) => {
            if (err) { 
                alert("Error: " + err); 
                return;
            }
        
            console.log('This username details from server: ' + JSON.stringify(response.message));
        
            this.setState({
                    mybooks: response.message
                });
        
            
        });
        
    }
    handlesubmit(){
        console.log("submit button clicked")
        var bookkeyword = this.state.booksearch
        
                    books.search(bookkeyword)
            .then((results)=> {
                console.log("$$$$$$")
                
                console.log("results are",results)
                console.log("this.state.bookresults",this.state.bookresults)
                
                //console.log("state is here inside callback",this.state.bookresults)
            	//this.setState({bookresults:results})
            	
            })
            
            .catch(function(error) {
                console.log("#####")
            	console.log("there is error fetching from server",error);
            });
            
    }
    
    render() {
        console.log("this.state.bookresults",this.state.bookresults)
        var addfunction = this.addfunction.bind(this);
        var username = this.state.username;
        
        //const zoneStyle = styles.zone; // needs to be inside the render func!
        //<Link to="/allmemberbooks">All member books</Link>
        const viewbooks=this.state.bookresults.map(function(i,index){
            
            return(
                 <div key={index} className="row resultstyle">
            <div className="col-md-1">
            </div>
            <div className="col-md-3 ">
            <img src={i.thumbnail} alt="Mountain View"  />
            </div>
            <div className="col-md-7">
            <h2>{i.title}</h2><br />
            <p>{i.description}</p><br /><br />
            <p>ISBN:{i.isbn.identifier}</p>
            </div>
            <div className="col-md-1">
            <button onClick={addfunction} id={i.isbn.identifier}>Add</button>
            </div>
            
            </div>
                
                )
           
            
        });
        
        return(<div>
                <h2> All books are here </h2>
               
                <input type="text" value={this.state.booksearch} onChange={this.handlebookinput.bind(this)} />&emsp;&emsp;
                <button onClick={this.handlesubmit.bind(this)}>Search</button>&emsp;&emsp;
                <button onClick={this.removeresultfunc.bind(this)}>Remove results</button>
                &emsp;&emsp;<Link to={`/mybooks/${username}`}>My Books</Link>&emsp;&emsp;
                
                <Link to ="/totalbooks">All member's  books</Link>&emsp;&emsp;
                <Link to= {`/srequests/${username}`}>Sent requests</Link>&emsp;&emsp;
                <Link to ={`/rrequests/${username}`}>Recieved requests</Link>&emsp;&emsp;
                <Link to={`/settings/${username}`}>My settings</Link>
                <div className="container">
                {viewbooks}
                </div>
                </div>);
    }
}

export default Allbooks
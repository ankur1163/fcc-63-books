var Books = require("../models/Books.js");

//import each from 'async/each';

module.exports = {
    
    //
    
    
    
    


    findById: function(id, callback) {
        console.log("id in bookscontroller",id)
        var ty ={"username":id};
        Books.find(ty, function(err, comment){
            if (err) {
                callback(err, null);
                return;
            }else{
                console.log("got response from mongodb",comment)
                callback(err, comment);
                
            }
            
        });
        
    },
    delsrequest: function(obj, callback) {
        console.log("object in deslrequest",obj)
        var rusername=obj.rusername;
        var susername=obj.susername;
        console.log("rusername",rusername,"susername",susername)
        var ty = {"username.requestssent":rusername}
        var isbn = obj.isbn;
        
        Books.find({"username":rusername},function(err,resp){
            
            if(err){
                console.log("there is err",err)
            }
            else{
                console.log("resp is ",resp)
                console.log("resp[0].requestssent is",resp[0].requestssent.length);
                var newrrs =[];
                console.log("start")
                for(var i =0;i<resp[0].requestssent.length;i++){
                    console.log("inside for loop",i)
                    console.log("resp[0].requestssent[i]",resp[0].requestssent[i])
                    console.log(resp[0].requestssent[i].isbn,isbn)
                    if(resp[0].requestssent[i].isbn==isbn){
                        newrrs = resp[0].requestssent.splice(i,1)
                        console.log("resp",resp)
                    }
                    
                }
                console.log("?end")
                console.log("resp before",resp)
                
            
                console.log("newrrs",newrrs)
                Books.findOneAndUpdate({"username":rusername},{"requestssent":resp[0].requestssent},function(err,resp){
                    if(err){
                        console.log("x",err)
                    }
                    else{
                        console.log("y")
                        
                        //callback(null,resp)
                    }
                })
                
            }
            
        }).then(Books.find({"username":susername},function(err,res){
            
            if(err){
                console.log("there is err",err)
            }
            else{
                //requestsrecieved
                console.log("res is ",res)
                console.log("res[0].requestsrecieved is",res[0].requestsrecieved.length);
                var newrrs =[];
                var gtarr;
                console.log("start")
                for(var i =0;i<res[0].requestsrecieved.length;i++){
                    console.log("inside for loop",i)
                    console.log("resp[0].requestsrecieved[i]",res[0].requestsrecieved[i])
                    console.log(res[0].requestsrecieved[i].isbn,isbn)
                    if(res[0].requestsrecieved[i].isbn==isbn){
                        newrrs = res[0].requestsrecieved.splice(i,1)
                        console.log("res",res)
                        console.log("res[0].requestsrecieved",res[0].requestsrecieved)
                        gtarr=res[0].requestsrecieved;
                    }
                    
                }
              console.log("susername",susername)
              console.log("gtarr",gtarr)
                Books.findOneAndUpdate({"username":susername},{"requestsrecieved":gtarr},function(err,response){
                    if(err){
                        console.log("x",err)
                    }
                    else{
                        console.log("y")
                        console.log("res[0].requestsrecieved",response)
                        callback(null,response)
                    }
                })
                
            }
            
        })
        )
        
        /*
         Books.where({ "username":rusername}).find("requestssent").find({"isbn":isbn}).remove({}, function(err, resp){
                    if (err) {
                        callback(err, null);
                        return;
                    }
                    else{
                        console.log("got something",resp)
                        callback(err, resp);
                    }
                    

        });
      */
        
    },
     find: function(id, callback) {
        console.log("id in bookscontroller",id)
        var ty ={"username":id};
        Books.find(null, function(err, comment){
            if (err) {
                callback(err, null);
                return;
            }else{
                console.log("we got all books",comment)
                callback(err, comment);
                
            }
            
        });
        
    },
    create:function(params, callback){

        Books.create(params, function(err, comment) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, comment);
        });      
    },
      findrequest:function(username, callback){
       var query = { 'username': username }
        Books.findOne(query, function(err, comment) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, comment.requestsrecieved);
        });      
    },
    findsent:function(username, callback){
       var query = { 'username': username }
        Books.findOne(query, function(err, comment) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, comment.requestssent);
        });      
    },
    
    

    modify: function(params,object, callback) {
console.log("entered in modify")
console.log("yes")
console.log("bookscontroller object",object)
console.log("no")
        var username = params.username;
        var id = params.id;
        id = parseInt(id)
        var query = {username:username};
        var options = { upsert: true, new: true, setDefaultsOnInsert: true };
        Books.findOneAndUpdate(query, { $inc: { count: 10 },$push: { mybooks:object } }, options, function(err,resp){
            if(err){
                console.log("error from mongodb",err)
                callback(err,null)
            }
            else{
                console.log("done going back from modify")
                
                callback(null,resp)
            }
        })
        
       
        },
        modifyrequests: function(params,object, callback) {
            console.log("modify requests")
            console.log("yes")
            console.log("bookscontroller object",object)
            console.log("no")
        var username = object.username;
        var isbn = object.isbn;
        
        var query = {username:username};
        console.log("query",query)
        var options = { upsert: true, new: true, setDefaultsOnInsert: true };
        Books.findOneAndUpdate(query, {$push: { requestsrecieved:object } }, options, function(err,resp){
            if(err){
                console.log("error from mongodb",err)
                callback(err,null)
            }
            else{
                var query2 ={username:params.username};
        console.log("query2",query2);
        console.log(">>>>>>>>>>>>>>")
        
        Books.findOneAndUpdate(query2, {$push: { requestssent:object } }, options, function(err,resp){
            if(err){
                console.log("err in findoneandupdate")
                callback(err,null)
            }
            else{
                console.log("success findoneand update")
                callback(null,resp)
            }
        })
        console.log(">>>>>>>>>>>> end")
                
                //callback(null,resp)
            }
        });
        
        /*
        var query2 ={username:params.username};
        console.log("query2",query2);
        
        Books.findOneAndUpdate(query, {$push: { requestssent:object } }, options, function(err,resp){
            if(err){
                
                callback(err,null)
            }
            else{
                
                callback(null,resp)
            }
        })
        */
       
        }
        

};



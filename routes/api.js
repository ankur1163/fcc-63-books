var express = require('express');
var router = express.Router();
var PollsCtlr = require('../controllers/PollsController');

var controllers = require("../controllers");

//start 
///api/books/r/s/' + username
router.get("/:resource/:id/:s/:username", function(req, res, next){
    var resource = req.params.resource;

    
    var username = req.params.username;
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
    console.log("requestrecieved inside api.js")
    controller.findsent(username, function(err, result){
        
        if (err) {
           // 3 This DID fire :D
           
           return res.json({ confirmation: 'fail',
                message: 'Not found anything'
            });
        }
        
        // This ran as well, but later
        
        
        // So this was never sent, as the request had already been completed
        res.json({ confirmation: 'success',
            message: result
        }); 
    });
    
});


//end

//starts




router.get("/:resource/:id/:username", function(req, res, next){
    var resource = req.params.resource;

    
    var username = req.params.username;
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
    console.log("requestrecieved inside api.js")
    controller.findrequest(username, function(err, result){
        
        if (err) {
           // 3 This DID fire :D
           
           return res.json({ confirmation: 'fail',
                message: 'Not found anything'
            });
        }
        
        // This ran as well, but later
        
        
        // So this was never sent, as the request had already been completed
        res.json({ confirmation: 'success',
            message: result
        }); 
    });
    
});

//ends


router.get("/:resource/:id", function(req, res, next){
    var resource = req.params.resource;

    var id = req.params.id;
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
    controller.findById(id, function(err, result){
        
        if (err) {
           // 3 This DID fire :D
           
           return res.json({ confirmation: 'fail',
                message: 'Not found anything'
            });
        }
        
        // This ran as well, but later
        
        
        // So this was never sent, as the request had already been completed
        res.json({ confirmation: 'success',
            message: result
        }); 
    });
    
});


router.get("/:resource", function(req, res, next){
    
    var resourceFrom = req.params.resource;
    var controller = controllers[resourceFrom];
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
    controller.find(null, function(err, results){
        if (err){
                res.json({ confirmation: 'fail',
                    message: err
                });
                return;
            }
            res.json({ confirmation: 'success',
                    message: results
        });
    });

  
});
//goingfunc route 
router.post("/:resource/:username/:type", function(req, res, next){
    console.log("post request type")
    var type = req.params.type;
   var username = req.params.username;
   var resource = req.params.resource;
   
   console.log("request username",username,"resource",resource,"type",type)
   console.log(">>>>>>>>>>>>>")
   
   
    var controller = controllers[resource];
    
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'Invalid resource request on POST to: ' + resource
        });
        return;
    }
    console.log(req.body);
    
    if(req.params.type==="request"){
        console.log("i want this book code")
        var obj = req.body;
   obj.requesterusername=username;
        controller.modifyrequests(req.params, obj,function(err, result) {
        console.log("obj in modfyrequests",obj);
         if (err){
             console.log("modify request error",err);
            res.json({ confirmation: 'fail',
                message: err
            });
            return;
        }
        console.log("modify request result",result);
        res.json({ confirmation: 'success',
                message: result
            });
        
    });
        
    }
    else{
        console.log("add code")
        var obj = req.body;
         controller.modify(req.params, obj,function(err, result) {
        console.log("obj in modfy",obj);
         if (err){
            
            res.json({ confirmation: 'fail',
                message: err
            });
            return;
        }
        
        res.json({ confirmation: 'success',
                message: result
            });
        
    });
        
    }
    

});

//goungfunc route end

router.post("/:resource", function(req, res, next){
    var resource = req.params.resource;
   
    var controller = controllers[resource];
    
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'Invalid resource request on POST to: ' + resource
        });
        return;
    }
    console.log(req.body);
    controller.create(req.body, function(err, result) {
        
         if (err){
             console.log(err);
            res.json({ confirmation: 'fail',
                message: err
            });
            return;
        }
        console.log(result);
        res.json({ confirmation: 'success',
                message: result
            });
        
    });

});

router.post("*", function(req, res, next){
    var url = req.url;
    console.log("here's the url",url)

});

router.put("/:resource/:id", function(req, res, next){
    
     
    var resource = req.params.resource;
    var editpoll = req.editpoll;
    
    var id = req.params.id;
    var controller = controllers[resource]; // select a controller specified in the URL
    console.log('inside API js - controller route' + controllers[resource]);
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'Invalid resource request on POST to: ' + resource
        });
        return;
    }
    
    controller.update(id, req.body, function(err, result) { // call update function of specified ctlr
       console.log("this is editpoll value...",req.editpoll)
         if (err){
            res.json({ confirmation: 'fail',
                message: 'This is the fail from api.js: ' + err
            });
            return;
        }
        
        res.json({ confirmation: 'success',
                message: 'This is the ****SUCCESS**** from api.js' + JSON.stringify(result)
            });
        
    },editpoll);

});

router.delete("/:resource/:id", function(req, res, next){
    var resource = req.params.resource;

    var id = req.params.id;
    console.log("in api.js file",resource,id)
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
    controller.delete(id, function(err, result){
           if (err){
                res.json({ confirmation: 'fail',
                    message: 'Not found'
                });
                return;
            }
            
            res.json({ confirmation: 'success.The poll got deleted',
                    message: result
                });
            
    });
    
});

//"/api/books/"+rusername+"/"+susername+"/"+isbn
router.delete("/:resource/:rusername/:susername/:isbn", function(req, res, next){
    
    var resource = req.params.resource;

    var rusername = req.params.rusername;
    var susername = req.params.susername;
    var isbn = req.params.isbn;
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    var obj = {"rusername":rusername,"susername":susername,"isbn":isbn}
    // call the correct controller specified by the http request
    controller.delsrequest(obj, function(err, result){
           if (err){
                res.json({ confirmation: 'fail',
                    message: 'Not found'
                });
                return;
            }
            
            res.json({ confirmation: 'success.The poll got deleted',
                    message: result
                });
            
    });
    
});

module.exports = router;
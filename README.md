# azauth
azauth client for node.js, single line authentication

# usage

  on the server side for express, just add
  
  ```
  const azauth=require('azauth');
  app.use(azauth.auth);
  ```

  That is all. 
  No registration, no keys , no routs... just those lines.
  
  for the login button the href is :
   ```
   http://auth.azjs.io/googleAuth/authTo/{callback url}
   ```
   
   The calback url shuold be encoded (you can use  encodeURIComponent() in the chrome console for this)
   
   This is it.
   After login you will be redirectd to the callback url, there in the req you will have azAuth with the profile data
   For example 
   ```
   app.get('/afterLoginCallback',  function(req,res){
       console.log(req.azAuth.data) //this holdes the user profile  
      res.send(`Hi <b> ${req.azAuth.data.emails[0].value} </b> <br>this all the profile info <br> ${JSON.stringify(req.azAuth.data)}` )

})

   ```
   
   If you use session, the session object will also holde the user profile under ```req.session.azAuth```
   
   Enjoy 
   
   
   
   


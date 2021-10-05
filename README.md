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
   
   Done !
   After login you will be redirectd to the callback url, there in the req you will have azAuth with the profile data
   For example 
   ```
   app.get('/afterLoginCallback',  function(req,res){
       console.log(req.azAuth.data) //this holdes the user profile  
      res.send(`Hi <b> ${req.azAuth.data.emails[0].value} </b> <br>this all the profile info <br> ${JSON.stringify(req.azAuth.data)}` )

})

   ```
   
   If you use session, the session object will also holde the user profile under ```req.session.azAuth```
   
   # Completer server example that will work anywhere out of the box 
   ```
    const express = require('express')
    const app = express()

    const port = 80
    const azauth=require('azauth');

    app.use(express.static('public'))
    app.use(azauth.auth);
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    app.listen(port, () => {
      console.log(`Example app listening at port :${port}`)
    })

    app.get('/userLogin', async function(req,res){
           console.log(req.azAuth.data) 
          res.send(`Hi <b> ${req.azAuth.data.emails[0].value} </b> <br>this all the profile info <br> ${JSON.stringify(req.azAuth.data)}` )

    })

   ```
   
   login buttons for google and facebook (put any domain and rout instead of  127.0.0.1/userLogin)
   ```
   <!-- callback url is encodeURIComponent('http://127.0.0.1/userLogin'); 
   <a href="http://auth.azjs.io/googleAuth/authTo/http%3A%2F%2F127.0.0.1%2FuserLogin">GOOLLE LOGNIN</a>
    <a href="http://auth.azjs.io/facebookAuth/authTo/http%3A%2F%2F127.0.0.1%2FuserLogin">facebook LOGNIN</a>
    
    ```
    
   Enjoy 
   
   
   
   


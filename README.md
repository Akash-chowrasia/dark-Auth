# dark-Auth

This is a completely independent module can be used in any **module** to provide complete secured authentication system.
* This module is written in **node.js**
* You can use any server to add it's router
* It's completely independent with every other routers.
* It uses **mongoDb** to store the data
* It can be used after connecting your project with **MongoDb**
* This module stores user Activity **logs** as well into Database.
## how to use this module
* fork this module to your github or clone it
* put **auth** module in your project at modules
* setup dependencies i your **package.json**
* import its **index.js** in your main file and feed app to it as
    * `authModule.init(app)`
* That's it, the authentication is being setup to your project
## After adding this module to your project how to make your important webPages or system protected.
* import authmiddlewares in your every router page of code from services of this module.
* This module provides several middlewares which you can use with your routers as per your convenience
* The middlewares are **isLoggedIn**, **isUserExists** & **isUserVerified**
### Example for using middlewares to protect your credencials.
Suppose I have a **Userprofile** router which sends user users details to the client. you can use **isLoggedIn** middleware to protect it from unauthorised people.
`
router.get('/user-profile', authmiddleware.isLoggedIn, httpHandler(async (req,res,next) =>{
    // write your desired code.
    // now this router is being protected by `isLoggedIn` middleware from unauthorised users.
}));
`
## How to use It's API's from client side one's it has been setup to your back-end server.
It provide's several API's for all operations we can use then at client side, with rout wrapper **/auth**. Look at for some functionalities with API formate explained below.
* **Registration**: For registration use the API with body data (**name**, **email**,**password**)
  * Reqrest Method should be **POST**
  * This will generate access report after registration along with email Verification code, using wich you need to verify your email.
  * **API Formate**: `your-domain/auth/register`
* **verify user**: For verification use the API with body data(**verification_code**, **email**).user can login or do any othe stuff's only after verification of email.
  * Reqrest Method should be **POST**
  * **API Formate**: `your-domain/auth/verify-user`
* **Login**: For login use API with body data(**email**, **password**).
  * Request method must be **GET**
  * **API Formate**: `your-domain/auth/login`
* **Change Password**: For change password use API with body data(**old_password**, **new_password**). This functionality is lashed with **isLoggedIn** middleware, so to change password user should must be loggedIn.  
  * Request method must be **PUT**
  * **API Formate**: `your-domain/auth/change-password`
* **WHO-AM-I**: This if a dummy API for testing the session existence, use this API with body no body data. This functionality is lashed with **isLoggedIn** middleware, so to check profile user should must be loggedIn..  
  * Request method must be **GET**
  * **API Formate**:`your-domain/auth/who-am-i`
* **Forgot Password**: If User forgot his/her password, they need to reset it. this functionality consist two step API call. user need's to request for reset token with first API call and then user needs to reset password along with token via second API call.
  * **Reset Password Request**: For reset password request use API with body data(**email**). this API call will provide unique token to reset the password.
    * Request method must be **GET**
    * **API Formate**:`your-domain/auth/reset-password-request`
  * **Reset Password**: For reset password use API with body data(**token**,**new_password**). this API will reset your password.
    * Request method must be **PUT**
    * **API Formate**:`your-domain/auth/reset-password`
* **Logout**: This API call delete's the session and make user logged out from the account, use this API with body no body data. This functionality is lashed with **isLoggedIn** middleware, so user should must be loggedIn before logout.  
  * Request method must be **DELETE**
  * **API Formate**:`your-domain/auth/logout`


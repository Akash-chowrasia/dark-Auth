# dark-Auth

This is a completely independent module can be used in any **module** to provide complete secured authentication system.

<ul>
    <li>This module is written in **node.js**</li>
    <li>You can use any server to add it's router</li>
    <li> It's completely independent with every other routers.</li>
    <li>It uses **mongoDb** to store the data</li>
    <li>It can be used after connecting your project with **MongoDb**</li>
    <li>This module stores user Activity **logs** as well into Database.</li>
</ul>

## how to use this module
<ul>
    <li>fork this module to your github or clone it</li>
    <li>put **auth** module in your project at modules</li>
    <li>setup dependencies i your **package.json**</li>
    <li>import its **index.js** in your main file and feed app to it as
    <pre>authModule.init(app)</pre></li>
    <li>That's it, the authentication is being setup to your project</li>
</ul>

## After adding this module to your project how to make your important webPages or system protected.
<ul>
    <li>import authmiddlewares in your every router page of code from services of this module.</li>
    <li>This module provides several middlewares which you can use with your routers as per your convenience</li>
    <li>The middlewares are **isLoggedIn**, **isUserExists** & **isUserVerified**</li>
</ul>

### Example for using middlewares to protect your credencials.
Suppose I have a `**Userprofile**` router which sends user users details to the client. you can use `**isLoggedIn**` middleware to protect it from unauthorised people.

<pre>
router.get('/user-profile', authmiddleware.isLoggedIn, httpHandler(async (req,res,next) =>{
    // write your desired code.
    // now this router is being protected by `isLoggedIn` middleware from unauthorised users.
}));
</pre>

## How to use It's API's from client side one's it has been setup to your back-end server.

It provide's several API's for all operations we can use then at client side, with rout wrapper **/auth**. Look at for some functionalities with API formate explained below.
<ol type="1">
    <li>**Registration**: For registration use the API with body data (**name**, **email**,**password**)
        <ul>
            <li>Reqrest Method should be **POST**</li>
            <li>This will generate access report after registration along with email Verification code, using wich you need to verify your email.</li>
            <li>**API Formate**:<pre>`your-domain`/auth/register</pre></li>
        </ul>
    </li>
    <li>**verify user**: For verification use the API with body data(**verification_code**, **email**).user can login or do any othe stuff's only after verification of email.
        <ul>
            <li>Reqrest Method should be **POST**</li>
            <li>**API Formate**: <pre>`your-domain`/auth/verify-user</pre></li>
        </ul>
    </li>
    <li>**Login**: For login use API with body data(**email**, **password**).
        <ul>
            <li>Request method must be **GET**</li>
            <li>**API Formate**:<pre>`your-domain`/auth/login</pre></li>
        </ul>
    </li>
    <li>**Change Password**: For change password use API with body data(**old_password**, **new_password**). This functionality is lashed with **isLoggedIn** middleware, so to change password user should must be loggedIn. 
        <ul>
            <li>Request method must be **PUT**</li>
            <li>**API Formate**:<pre>`your-domain`/auth/change-password</pre></li>
        </ul>
    </li>
    <li>**WHO-AM-I**: This if a dummy API for testing the session existence, use this API with body no body data. This functionality is lashed with **isLoggedIn** middleware, so to check profile user should must be loggedIn..
        <ul>
            <li>Request method must be **GET**</li>
            <li>**API Formate**:<pre>`your-domain`/auth/who-am-i</pre></li>
        </ul>
    </li>
    <li>**Forgot Password**: If User forgot his/her password, they need to reset it. this functionality consistes two step API call. user need's to request for reset token with first API call and then user needs to reset password along with token via second API call.
        <ul>
            <li>**Reset Password Request**: For reset password request use API with body data(**email**). this API call will provide unique token to reset the password.
                <ul>
                    <li>Request method must be **GET**</li>
                    <li>**API Formate**:<pre>`your-domain`/auth/reset-password-request</pre></li>
                </ul>
            </li>
            <li>**Reset Password**: For reset password use API with body data(**token**,**new_password**). this API will reset your password.
                <ul>
                    <li>Request method must be **PUT**</li>
                    <li>**API Formate**:<pre>`your-domain`/auth/reset-password</pre></li>
                </ul>
            </li>
        </ul>
    </li>
    <li>**Logout**: This API call delete's the session and make user logged out from the account, use this API with body no body data. This functionality is lashed with **isLoggedIn** middleware, so user should must be loggedIn before logout.
        <ul>
            <li>Request method must be **DELETE**</li>
            <li>**API Formate**:<pre>`your-domain`/auth/logout</pre></li>
        </ul>
    </li>
</ol>
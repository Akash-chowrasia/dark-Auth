# dark-Auth

This is a completely independent module can be used in any <bold>module</bold> to provide complete secured authentication system.

<ul>
    <li>This module is written in node.js</li>
    <li>You can use any server to add it's router</li>
    <li> It's completely independent with every other routers.</li>
    <li>It uses mongoDb to store the data</li>
    <li>It can be used after connecting your project with <bold>MongoDb</bold></li>
    <li>This module stores user Activity logs as well into Database.</li>
</ul>>

## how to use this module
<ul>
    <li>fork this module to your github or clone it</li>
    <li>put <bold>auth</bold> module in your project at modules</li>
    <li>setup dependencies i your <bold>package.json</bold></li>
    <li>import its <bold>index.js</bold> in your main file and feed app to it as
    <pre>authModule.init(app)</pre></li>
    <li>That's it, the authentication is being setup to your project</li>
</ul>

## After adding this module to your project how to make your important webPages or system protected.
<ul>
    <li>import authmiddlewares in your every router page of code from services of this module.</li>
    <li>This module provides several middlewares which you can use with your routers as per your convenience</li>
    <li>The middlewares are <bold>isLoggedIn</bold>, <bold>isUserExists</bold> & <bold>isUserVerified</bold></li>
</ul>

### Example for using middlewares to protect your credencials.
Suppose I have a <bold>`Userprofile`</bold> router which sends user users details to the client. you can use <bold>`isLoggedIn`</bold> middleware to protect it from unauthorised people.

<pre>
router.get('/user-profile', authmiddleware.isLoggedIn, httpHandler(async (req,res,next) =>{
    // write your desired code.
    // now this router is being protected by isLoggedIn middleware from unauthorised users.
}));
</pre>

## How to use It's API's from client side one's it has been setup to your back-end server.

It provide's several API's for all operations we can use then at client side, with rout wrapper <bold>/auth</bold>. Look at for some functionalities with API formate explained below.
<ul>
    <li><bold>Registration</bold>: For registration use the API with body data <bold>name</bold>, <bold>email</bold>,<bold>password</bold></li>
    <li>Reqrest Method should be <bold>POST</bold></li>
    <li><bold>API Formate</bold><pre><your-domain>/auth/register</pre></li>
</ul>
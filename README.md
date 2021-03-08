# dark-Auth

This is a completely independent module can be used in any module to provide complete secured authentication system.

<ul>
    <li>This module is written in node.js</li>
    <li>You can use any server to add it's router</li>
    <li> It's completely independent with every other routers.</li>
    <li>It uses mongoDb to store the data</li>
    <li>It can be used after connecting your project with MongoDb</li>
</ul>>

## how to use this module
<ul>
    <li>fork this module to your github or clone it</li>
    <li>putt the module in your project at modules</li>
    <li>setup dependencies i your `package.json`</li>
    <li>import its `index.js` in your main file and feed app to it as
    <pre>authModule.init(app)</pre></li>
    <li>That's it, the authentication is being setuped to your project</li>
</ul>

## After adding this module to your project how to make your important webPages or system protected.
<ul>
    <li>import authmiddlewares in your every router page of code from services of this module.</li>
    <li>This module provides several middlewares which you can use with your routers as per your convenience</li>
    <li>The middlewares are isLoggedIn, isUserExists & isUserVerified</li>
</ul>

### Example for using middlewares to protect your credencials.
Suppose I have a `Userprofile` router which sends user users details to the client. you can use `isLoggedIn` middleware to protect it from unauthorised people.

<pre>
router.get('/user-profile', authmiddleware.isLoggedIn, httpHandler(async (req,res,next) =>{
    // write your desired code.
    // now this router is being protected by isLoggedIn middleware from unauthorised users.
}));
</pre>


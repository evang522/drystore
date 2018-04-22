# The Drystore

## Demo URL:  https://drystore-demo.herokuapp.com

## About
### The Drystore is a CRUD web application built with serverside rendering created to aid a family or organization in preparing for national emergency or crisis by keeping track of stored dried food and analyzing how long it would be able to sustain a specified amount of people. 


## Tech Stack
### The Drystore is a MongoDB, Node.js, Express.js, and Pug (formerly Jade) app. jQuery is used at various points to generate animations and fade in. No CSS templates or libraries are used in this app. Session based authentication with Passport.js is employed. 


## API
### This app does not use REST API Architecture. The resources and features in this app can be summed up as follows:

* Users
  * Create
  * Edit (Edit permissions and roles for making changes to the drystore)
  * Delete (Only by administrators)
  * Get

* Items
  * The primary resource in this app. Items contain information such as 'servings', 'quantity', 'Category', and 'Name'. The `item` resource helps us capture information about what kind of things are stored and various bits of information about them. In the drystore menu there are clear menu options for adding items.

* Notes
  * Users are able to make notes or observations; shopping lists or whatever else they may need to persist.
  * Create
  * Edit
  * Delete

* User Roles
  * Users with a standard role are permitted to make changes to items, but users with a guest role cannot make any changes. Administrators may alter user roles, as well as creating and deleting users.


## How to Deploy
### Deploying the drystore for your needs will be very simple. (Clone the repo, install NPM packages, and make sure you have MongoDB running) The only suggestion I would make is that in order to secure data, the registration route must be secured. Otherwise any user could log in and make changes to items as the standard user is default. One can easily do this by checking for `req.isAuthenticated()` on the `/users/register` route. When this route is secured, users can only be added by existing users, effectively sealing off the workspace. For an example of this, please check out the users route in the `/garrettdeploy` branch of this repo to view an implementation of a deployed app that is actually being used. 



## Lessons Learned:
### If I were to re-create this app again (and I still might!), I would seek to use a REST API and an appropriate front-end technology, as it allows for scalability and multi-platform use.

### Earlier I tried to implement a log of changes that simply consisted of text files storing changes made to the database every time an item was created or deleting and made requests to a `/log` route on the server to retrieve them. I was surprised to find that though the logging worked locally, it did not work in heroku, because heroku appeared to be redeploying the app from github or reverting any changes made to files in the repository, so though the logs were being filled while the dyno was spun up, the logs were populating. But after the dyno went to sleep, the changes were gone on the next spin-up. In short, don't use flat file DB storage in heroku unless you've thought about the implications. 
basic af Node Server Using Express  to serve a list of common breakbeat samples through HTTP requests using REST.

breakbeats.json is the DB file, currently manually editing this file is the official way to update this

when adding a new breakbeat, ensure you add the associated sample file in the 'sounds' folder

if you want to help improve it then please! im no data engineer so this is just what I needed to get a front-end up and working - im no grinch, willl happily accept loose prs if they help the project


todo :

[] - add more protection and security, cross site stuff, auth0, tokens and sessions and all the other BS that comes with having a website on the internet nowawadays
[] - create more and better methods, test and validate it all works eg. Create, and Update methods, use better patterns when fetching data
[] - migrate to something more functional than a single json file? I dont even know if this current method will work, but if this app builds and github isnt mad at me for hosting it
[] - create several other API services 

  im talking:
    [] /artists - for the bands
    [] /drummer - for the drummer (duh)
    [] /description - for the more elabrate description
    [] /extending breakbeats to allow for user comments and moderated editing mods/user privelages < this one first
    [] /create a /used-in to return songs that use this sample.


history - intial commit stubs out a shabby and just barely working mvp so I can consume the json without running the server locally, mostly helps ID bugs early 

# Notes

Big vulnerability in changeUserProfile because of having points be part of user object.
-> solution to change func or have own stable var for points

Most important thing to do is create an app architecture.

Should make use of cache/sessionStorage for storing returned backend data to be used for other components in the frontend.
Some ui might need manual refresh buttons, but it could improve efficieny and cycle reduction as data will have to be less fetched from backend and some functionalities might be ale to be switched over to front end.

Should have a subscribe method or caching system for showing question feed while having minimal backend calls.

## Todo

Backend:

- revamp algorithm and show information about it on app
- revamp entire structure with consistancy and seperation of functionalities/utils in modules with complex types and utility functions
- generic errors for ui
- unit testing setup w cycle consumption data

Frontend:

- more component extractions
- more code consistancy
- multi wallet support (ic2c?)
- consider going back to svelteJs or integrate dynamic loading feature in svelteKit for questions and users
- order/streamline backend api's and append calls together were possible

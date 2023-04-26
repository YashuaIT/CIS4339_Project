# Data Platform Frontend

This project uses [VueJS 3](https://vuejs.org/) with [Vite](https://vitejs.dev/) and [TailwindCSS](https://tailwindcss.com/).
For form validation [Vuelidate](https://vuelidate-next.netlify.app/) is used.

## Project setup

    npm install

### Before startup
You need to either have a local backend running and or use a cloud deployed backend.

Setup a .env file with following variables, e.g.:

    VITE_ROOT_API=http://localhost:3000

VITE_ROOT_API is the URL for the backend API, either on localhost or in the cloud.
### Compiles and hot-reloads for development

    npm run dev


### APP Documentation
### User Accounts

    user1 = username: admin 
            password: admin
    
    user2 = username: testuser
            password: testuser

When logging in, user1 will have editor privileges and is able to access all routes while
user2 will only see the dashboard, find client, and find event routes.

### APP Layout

When the app is ran, if there is no logged in user, you will only see the login route and dashboard.
Once logged in, the Login route changes to logout. The logout route when pressed asks for a confirmation.
If the user confirms the logout, it resets the state of the APP by changing isloggedin state from true to false.
If a user logs in, if they don't have editor privileges they can only see the dashboard, find client, and 
find event routes.
If a user with editor role logs in, they can see and access every route in the APP.
Below, the image section in the navbar, a greeting should show up if the user is logged by outputing the
user's name to notify user that they are logged in. 


### Service Data Layer

For sprint 2, the service data layer was created using one component named service.vue. Other components
with service in their name are components with backend connection prepared for use in sprint 3.
All user can see all the available services but they cant add or edit them. The list of services
are shown in the Services route in the navbar.
When an editor user creates an event, the list of services available for that event is dynamically
pulled from the list of services if they're status is set to active. The editor can perform a 
soft-delete by pressing the activate/deactivate button to change the status of the service or
edit the service.
The soft-delete method does not delete the data entirely but it removes it from getting used by the event form component.
Inactive services still shows on the list of services but they can't be used as a service for creating an event.
The data layer will render with no entry first, so you need to create at least one entry first.
Only editor user can perform this functionalities.

### Piechart

The piechart data is currently set in the dashboard below the event data table and barchart.
It has a table that contains the different zip codes of the different clients and how many
clients are in each zip code.
The piechart will always be available whether the user logged in or not.


### Other routes

Some of the routes may not be fully functional since they need backend connetion.
Currently only the services route, login, and dashboard is working since they do not
need backend connection. The backend connection will be implemented during
sprint 3.


### Sprint 3 Documentation
-- Sprint 3 Documentation

### Users
To login, please use the following accounts to test privileges and app.

    -- Admin role with all privileges
    user1 = username: ysaguin
            password: pass123
    user2 = username: kluong
            password: 123456
    
    -- Viewer role with only view privileges
    user1 = username: testuser
            password: 123456

### Piechart

Implemented backend connection with piechart and renders the data in the frontend by pulling data
from the API request.

### Services Data Layer

Added API request implementation with the services data layer. Uses different components to create new service
and update a service. Soft-delete option for services also uses API requests. 

### Events Data Layer

Services options in the create event and update event form now pulls the data from the database rather than 
a hardcoded option. Services are listed in checkboxes and listed if they have a status of "active".
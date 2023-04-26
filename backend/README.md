# Backend

This implementation is for NodeJS based on [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) and uses [mongoose](https://mongoosejs.com/) as the ODM.

## Project setup

    npm install

### Before startup
You need a MongoDB database ready.

Make sure you have a collection named 'org' in your database that contains at least one organization with the orgid listed in your environment variable (see below).

Setup a .env file with the following variables: MONGO_URL, PORT and ORG
*The following variables below already has the right value. Just copy and paste it on the .env file for the backend
-- Sprint 3 Documentation

    MONGO_URL= 'mongodb+srv://admin:pass123@cis4339.a1htrks.mongodb.net/cis4339_test?retryWrites=true&w=majority'
    PORT= 3000
    ORG= '1'

### Compiles and hot-reloads for development

    npm start

### Postman Documentation
-- Sprint 3 Documentation

Updated and implemented Post Documentation can be found at <https://documenter.getpostman.com/view/23539873/2s93Y5Qzsa>

### API Endpoints
-- Sprint 3 Documentation

Created new API endpoints for services data layer, user login, and clients by zipcode. Created schema models for each
collection inside the models.js file.

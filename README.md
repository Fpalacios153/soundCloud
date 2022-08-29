# Welcome to CloudSounds:A SoundCloud Clone

## Description 
 CloudSounds is a clone of SoundCloud. It allows users to listen to music uploaded by other users and upload their own music to share. **[Click here to view CloudSounds Live Site](https://soundcloud-clo.herokuapp.com/)** 

## This project is built with:
* JavaScript
* Sequelize
* Express
* BackEnd 
* React
* Redux
* Node
* CSS
* HTML

## To Run Locally 
* Clone the repository
* Open two terminals, one for the backend folder and one for the frontend folder. Run npm install in both of them and followed by npm start. 
* Create a .env file in the backend folder with this inside: 
PORT=8000
DB_FILE=db/dev.db
JWT_SECRET=«secret_password_here»
JWT_EXPIRES_IN=604800
* Then run the following commands to migrate and seed the project:
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all


# Features Directions: 

Home Page Demo User: 

<img width="1440" alt="Screen Shot 2022-08-29 at 1 55 51 AM" src="https://user-images.githubusercontent.com/101391912/187164279-342c0a92-5e88-4bcf-9b73-10abb9baeb05.png">


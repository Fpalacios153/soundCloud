# Welcome to CloudSounds: A SoundCloud Clone

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


## Website Walkthrough 

### Splash Page

* From the splash page a user can either sign up as a demo user, sign up, or login by clicking on the buttons in the right corner of the navigation bar. 
* The user can also preview some of the songs that are uploaded to the website by clicking on the song images that appear in the center of the page. 
* The footer contains information links for CloudSounds as well as the developers profile links. 

<img width="1440" alt="Screen Shot 2022-08-29 at 1 55 51 AM" src="https://user-images.githubusercontent.com/101391912/187164279-342c0a92-5e88-4bcf-9b73-10abb9baeb05.png">
<img width="1436" alt="Screenshot 2023-02-21 at 1 15 28 AM" src="https://user-images.githubusercontent.com/101391912/220301268-497be424-037c-4d81-a3d3-8264807e08a1.png">

### Login Page

* If you are a returning user, you can enter your credentials and log in to acess the full website
* Alternatively, if you do not have an account, you can log in as a Demo user by pressing the 'Demo User' button.

<img width="1428" alt="Screenshot 2023-02-21 at 1 21 56 AM" src="https://user-images.githubusercontent.com/101391912/220302876-a83cf880-9ede-426a-bef7-452fce4a1735.png">

### Sign Up Page
* To become a user, you can simply fill out the sign up form with valid inputs and click the "Sign Up" button.
*  Alternatively, if you do not wish to create an account, you can log in as a Demo user by pressing the 'Demo User' button.

<img width="1429" alt="Screenshot 2023-02-21 at 1 27 23 AM" src="https://user-images.githubusercontent.com/101391912/220304262-d0cf45d6-ffca-4aa5-bcab-78bcb4872e56.png">


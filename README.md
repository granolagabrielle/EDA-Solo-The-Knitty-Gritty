# The Knitty Gritty

## Description

Duration: 2 Week Sprint

The Knitty Gritty is a web application I developed and designed to address common challenges faced by knitters. The application allows users to manage their yarn stash, pattern library, and ongoing knitting projects.

To see the fully functional site, please visit: TBD

## Screen Shot

<img width="1434" alt="Screen Shot 2024-07-07 at 5 33 22 PM" src="https://github.com/granolagabrielle/EDA-Solo-The-Knitty-Gritty/assets/135292783/df0a41fd-7fba-444f-bb4a-421c0f097c5c">

<img width="1437" alt="Screen Shot 2024-07-07 at 5 33 52 PM" src="https://github.com/granolagabrielle/EDA-Solo-The-Knitty-Gritty/assets/135292783/e37aeb7b-da0d-4dc6-ac70-a1650c3d052d">

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- PostgreSQL for database

## Installation

How do you get your application up and running? This is a step by step list for how another developer could get this project up and running. The good target audience in terms of knowledge, would be a fellow Primer from another cohort being able to spin up this project. Note that you do not need a paragraph here to intro Installation. It should be step-by-step.

If your application has secret keys (for example --  Twilio), make sure you tell them how to set that up, both in getting the key and then what to call it in the `.env` file.

1. Create a database named `The-Knitty-Gritty`,
2. The queries in the `tables.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage

1. User will log into the app or create an account. Upon signing in, they will see a home page featuring MUI cards with their favorite yarns and patterns, along with the most important details about each of them. 
3. The user will be able to manage their yarn stash on the yarn stash page. They have the ability to favorite/unfavorite yarns, edit details such as quantity and notes, as well as delete yarns if they no longer have them in stash. Additionally, they can use the "Add Yarn" form to add a new yarn to stash, including important details such as quantity, yarn weight and color, photos and more.
4. On the pattern library page, the user will be able to view and manage all of the patterns they own. Similar to the yarn stash, they can favorite/unfavorite patterns, edit details and delete patterns. Additionally, they can use the "Add Pattern" form to add a new pattern to stash, including details such as yarn weight needed, designer name, type of pattern and more.
5. User will be able to use the project tracker to manage all of their upcoming, current and completed projects, in addition to getting a snapshot view of the status of each project. When a project is clicked on, it shows additional details about the project, such as pattern and yarn, notes (with ability to add notes) and the ability to update project progress by inputting the current weight of the project.
6. Lastly, the user can use the project form to add a new project to the tracker. It allows them to select a pattern from the library and a yarn from their yarn stash, along with multiple photos.

## Built With

- Javascript
- React
- Redux
- PostgreSQL
- 


## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. (Thank your people)

## Support
If you have suggestions or issues, please email me at [youremail@whatever.com](www.google.com)

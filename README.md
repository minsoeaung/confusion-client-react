# confusion
A single-page react application built with the help of [Full-Stack Web Development with React Specialization](https://www.coursera.org/specializations/full-stack-react) Course. 
It shows restaurant's available dishes and make users able to create account and then can add favorite dishes and comment them. 
The application is built on the React-Redux Architecture 
and using RESTful web services architecture ([Server Repository](https://github.com/minsoeaung/confusion-server)).

![homePage](https://i.ibb.co/8MDdyMJ/confusion-home-page.png)
*In Home Page*

![favorites](https://i.ibb.co/09YyjyM/confusion-favorite.png)
*In User's Favorite Dishes*

![comments](https://i.ibb.co/Fxp5tPV/confusion-comment.png)
*In Dish Detail*

## Built with
- [React](https://reactjs.org/)
- [React Redux](https://react-redux.js.org/)
- [React Router Dom](https://reactrouter.com/)
- [Reactstrap](https://reactstrap.github.io/?path=/story/home-installation--page)
- and more

## Setup & Usage
1. clone this repository:
   - `git clone https://github.com/minsoeaung/confusion-client-react`
2. in the project directory:
   - run `npm install` and wait installing its dependencies
3. start the server by following its guide in README.md
   - [server repository](https://github.com/minsoeaung/confusion-server)
4. configure the server hosting url in `confusion-client-react/src/shared/baseUrl.js` file
5. run `npm start` to start the application
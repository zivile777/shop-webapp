# Simple web app for phone repair shop management

### How to start

#### Clone the repo: git clone https://github.com/zivile777/shop-webapp.git
#### Install dependencies: yarn or npm install
#### To start the webpack bundling: yarn start or npm start
#### After bundling finishes, you should be ready to see this web app running on localhost:1337

### Backend

#### This app gets its data from a database hosted on MLAB by Heroku. You can find the repo here: https://github.com/zivile777/customers-api . Currently, you can add new users by using Postman. Simply use such endpoint https://enigmatic-headland-61720.herokuapp.com/api/users/ and the method PUT. You need to fill such type of information: name, technician, order_date, appt_type, phone, email, order_state (Done/In Progress/Cancelled). If you want to see all data, just use GET method on https://enigmatic-headland-61720.herokuapp.com/api/users/ .

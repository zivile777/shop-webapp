import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import httpProxy from 'http-proxy';
import open from 'open';
import cors from 'cors';

import bundle from './bundler';

const app = express();
const proxy = httpProxy.createProxyServer();

const port = process.env.PORT || 1337;

// setup the webpack proxy

app.use(express.static(path.join(__dirname, '../public')));

app.use(cors()); //allows cross-origin fetching

bundle();

app.all('/bundle/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:3000',
    });
  });

// setup the API to host from localhost instead of mongodb

// let items = [
//   { "id": 1, "name": "Jason Gray", "technician": "Taylor Gibson", "order_date": "14 Jul 2017", "appt_type": "QUOTE", "phone": "(504) 324-2121", "email": "jgray@mail.com", "order_state": "Done" },
//   { "id": 2, "name": "Betty Boop", "technician": "Farina Bond", "order_date": "10 Jul 2017", "appt_type": "INSURANCE", "phone": "(504) 324-2121", "email": "jgray@mail.com", "order_state": "Done" },
//   { "id": 3, "name": "Laima Vaikule", "technician": "Taylor Gibson", "order_date": "10 Jul 2017", "appt_type": "QUOTE", "phone": "(504) 324-2121", "email": "jgray@mail.com", "order_state": "Done" },
//   { "id": 4, "name": "Tom Jackson", "technician": "Clark Gibson", "order_date": "10 Jul 2017", "appt_type": "QUOTE", "phone": "(504) 324-2121", "email": "jgray@mail.com", "order_state": "Done" },
//   { "id": 5, "name": "George Meel", "technician": "Taylor Gibson", "order_date": "19 Jul 2017", "appt_type": "QUOTE", "phone": "(504) 324-2121", "email": "jgray@mail.com", "order_state": "In Progress" },
//   { "id": 6, "name": "Peter Dant", "technician": "Clark Gibson", "order_date": "12 Jul 2017", "appt_type": "QUOTE", "phone": "(504) 324-2121", "email": "jgray@mail.com", "order_state": "Done" },
//   { "id": 7, "name": "Gill Burns", "technician": "Farina Bond", "order_date": "10 Jul 2017", "appt_type": "INSURANCE", "phone": "(504) 324-2121", "email": "jgray@mail.com", "order_state": "Done" },
//   { "id": 8, "name": "Grayson McKeel", "technician": "Taylor Gibson", "order_date": "17 Jul 2017", "appt_type": "QUOTE", "phone": "(504) 324-2121", "email": "jgray@mail.com", "order_state": "Done" },
//   { "id": 9, "name": "Laura Dosson", "technician": "Taylor Gibson", "order_date": "10 Jul 2017", "appt_type": "QUOTE", "phone": "(504) 324-2121", "email": "jgray@mail.com", "order_state": "Cancelled" }
// ];

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
//
// app.get("/items", (req, res) => {
// 	return res.json(items);
// });

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling

proxy.on('error', () => {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, () => {
  console.log('App listens at port ' + port);
  open('http://localhost:1337/');
});

import express from 'express';
import inventoryRouter from './routes/inventoryRouter';
import ordersRouter from './routes/ordersRouter';
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/inventory', inventoryRouter);
app.use('/orders', ordersRouter);

app.listen(port, () => {
  console.log(`Running on ${port}`)
})

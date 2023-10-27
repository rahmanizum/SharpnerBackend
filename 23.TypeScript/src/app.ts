import express from 'express';
import todosRoutes from './routes/todo';
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(todosRoutes);




app.listen(3000);
console.log('Server is running on port 3000');

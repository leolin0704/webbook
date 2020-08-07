import express, { Request, Response } from 'express';
import http from 'http';
import { index } from './controller/homeController';

const app = express();

const routes = express.Router();

routes.get('/pdf', index);

routes.all('*', (req: Request, res: Response) => {
    res.status(404).send();
});

app.use(routes);

app.use((err: Error, req: Request, res: Response) => {
    console.error('异常:', err);
    res.status(500).send(err);
 });

const port = 9527;

http.createServer(app).listen(port, () => {
    console.log('Server start at', port);
})

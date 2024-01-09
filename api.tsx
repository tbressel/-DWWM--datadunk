import express, { Request, Response } from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'datadunk'
});

db.connect((err: mysql.MysqlError | null) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.get('/teams', (req: Request, res: Response) => {
    db.query('SELECT * FROM team', (err: mysql.MysqlError | null, results?: any) => {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

import express from 'express'
import bodyParser from 'body-parser';
import employeeRouter from './routers/employeeRouter'
import workdayRouter from './routers/workdayRouter'
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = Number(process.env.API_PORT)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ limit: '100mb' }));
app.use(bodyParser.json())

const router = express()
router.use(employeeRouter);
router.use(workdayRouter)

app.use('/api/v1', router);

app.listen(port, () => console.log(`Rinku app listening on port ${port}!`))

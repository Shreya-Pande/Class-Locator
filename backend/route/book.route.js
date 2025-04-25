// import express from 'express';
// import {getBook} from '../controller/book.controller.js';

// const router=express.Router()

// router.get("/", getBook);

// export default router;



import express from 'express';
import { getBook } from '../controller/book.controller.js';

const router = express.Router();

// Default book route using getBook from controller
router.get('/', getBook);

// New route to check if the Book API is working
router.get('/api/Book', (req, res) => {
    res.json({ message: 'Book route working' });
});

export default router;

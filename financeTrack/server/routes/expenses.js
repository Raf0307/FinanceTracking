const express = require('express'); 
const router = express.Router(); 
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/auth.js');

router.get('/',authMiddleware,expenseController.listExpenses)// shows where the request will go in our controller while also checking if the authentication is valid before proceding
router.post('/',authMiddleware,expenseController.createNewExpense)
router.get('/summary',authMiddleware,expenseController.summary)
router.get('/:id',authMiddleware,expenseController.getSingleExpense)
router.put('/:id',authMiddleware,expenseController.updateExpense)
router.delete('/:id',authMiddleware,expenseController.deleteExpense)

module.exports = router;//exposes the routes 
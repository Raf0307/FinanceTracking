const express = require('express'); 
const router = express.Router(); 
const goalsController = require('../controllers/goalsController');
const authMiddleware = require('../middleware/auth.js');

router.get('/',authMiddleware,goalsController.listGoals)// shows where the request will go in our controller while also checking if the authentication is valid before proceding
router.post('/',authMiddleware,goalsController.createNewGoal)
router.get('/:id',authMiddleware,goalsController.getSingleGoal)
router.put('/:id',authMiddleware,goalsController.updateGoalDetails)
router.post('/:id/contribute',authMiddleware,goalsController.contributeToGoal)
router.post('/:id/complete',authMiddleware,goalsController.completeGoal)
router.delete('/:id',authMiddleware,goalsController.deleteGoal)

module.exports = router;//exposes the routes 
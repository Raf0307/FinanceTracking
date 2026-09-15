const Goal = require('../models/Goal');

module.exports = {
    listGoals: async (req, res) => {
        try {
            const goals = await Goal.findAll({ where: { user_id: req.user.id } })
            res.status(200).json({
                goals: goals//double check that this is the correct response
            })
        }
        catch (error) {
            res.status(500).json({
                message: 'Unable to return goals list' + error
            })
        }
    },
    createNewGoal: async (req, res) => {
        try {
            const { name, target_amount, target_date, current_amount, notes } = req.body;
            const userId = req.user.id;
            const goal = await Goal.create({
                user_id: userId,
                name,
                target_amount,
                target_date,
                current_amount,
                notes

            })
            res.status(201).json({
                message: "Goal succesfully added"
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server error' + error
            })
        }
    },
    getSingleGoal: async (req, res) => {
        try {
            const goal = await Goal.findOne({ where: { user_id: req.user.id, id: req.params.id } })
            if (!goal) {
                 return res.status(404).json({
                    message: 'Record not found'
                })
            } else {
                res.status(200).json({
                    goal: goal
                })
            }
        }
        catch (error) {
            res.status(404).json({
                message: 'Record not found' + error
            })
        }
    },
    updateGoalDetails: async (req, res) => {
        try {
            const goal = await Goal.findOne({ where: { user_id: req.user.id, id: req.params.id } })
            const { name, target_amount, target_date, current_amount, notes } = req.body
            if (!goal) {
                return res.status(404).json({
                    message: 'Record not found'
                })
            } else {
                goal.name = name;
                goal.target_amount = target_amount;
                goal.target_date = target_date;
                goal.current_amount = current_amount;
                goal.notes = notes;
                goal.save();
                res.status(200).json({
                    message: 'Goal updated'
                })
            }
        }
        catch (error) {
            res.status(500).json({
                message: 'Internal Server error' + error
            })
        }
    },
    contributeToGoal: async (req, res) => {
        try {
            const goal = await Goal.findOne({ where: { user_id: req.user.id, id: req.params.id } })
            const {amount} = req.body;
            if (!goal) {
                return res.status(404).json({
                    message: 'Record not found'
                })
            } else {
                goal.current_amount = parseFloat(goal.current_amount) + parseFloat(amount);
                await goal.save();
                res.status(200).json({
                    message: 'Goal updated',
                    goal: goal
                })
            }

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server error' + error
            })
        }
    },
    completeGoal: async (req, res) => {
        try {
            const goal = await Goal.findOne({ where: { user_id: req.user.id, id: req.params.id } })
            if (!goal) {
                return res.status(404).json({
                    message: 'Record not found'
                })
            } else {
                goal.is_complete = true;
                goal.save();
                res.status(200).json({
                    message: 'Goal updated'
                })
            }

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server error' + error
            })
        }
    },
    deleteGoal: async (req, res) => {
        try {
            const goal = await Goal.findOne({ where: { user_id: req.user.id, id: req.params.id } })
            if (!goal) {
                return res.status(404).json({
                    message: 'Record not found or aleady deleted'
                })
            } else {
                goal.destroy();
                res.status(200).json({
                    message: 'Goal deleted'
                })
            }

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server error' + error
            })
        }
    },
}
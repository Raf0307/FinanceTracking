const { response } = require('express');
const Expense = require('../models/Expense');

module.exports = {
    listExpenses: async (req, res) => {// lists all the expenses found for the user
        try {
            const expenses = await Expense.findAll({ where: { user_id: req.user.id } })
            res.status(200).json({
                expenses: expenses
            })
        }
        catch (error) {
            res.status(500).json({
                message: 'Unable to return expenses list' + error
            })
        }

    },
    createNewExpense: async (req, res) => {// creates a new expense for the user
        try {
            const { amount, category, expense_date, description } = req.body;
            const userId = req.user.id;
            const expense = await Expense.create({
                user_id: userId,
                amount,
                category,
                expense_date,
                description

            })
            res.status(201).json({
                message: "Expense succesfully added"
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server error' + error
            })
        }
    },
    getSingleExpense: async (req, res) => {// Grabs a single expense  based on the id provided in the body
        try {
            const expense = await Expense.findOne({ where: { id: req.params.id, user_id: req.user.id } })
            if (!expense) {
                return res.status(404).json({
                    message: 'Expense Not found'
                })
            }
            res.status(200).json({
                expense: expense
            })
        } catch (error) {
            res.status(500).json({
                message: 'Server Error' + error
            })
        }
    },
    updateExpense: async (req, res) => {// updates an expense based on the id sent
        try {
            const expense = await Expense.findOne({ where: { id: req.params.id, user_id: req.user.id } })
            const { amount, category, expense_date, description } = req.body;
            if (!expense) {
                return res.status(404).json({
                    message: 'Record not found'
                })
            }
            else {
                expense.amount = amount;
                expense.category = category;
                expense.expense_date = expense_date;
                expense.description = description;
                expense.save();
                res.status(200).json({
                    message: 'Expense updated'
                })
            }

        } catch (error) {
            res.status(500).json({
                message: 'Unable to update expense' + error
            })
        }
    },
    deleteExpense: async (req, res) => {//deletes the requested expense based on the id sent
        try {
            const expense = await Expense.findOne({ where: { id: req.params.id, user_id: req.user.id } })
            if (!expense) {
                res.status(404).json({
                    message: 'Expense not found'
                })
            }
            else {
                expense.destroy()
                res.status(200).json({
                    message: 'Expense succesfully deleted'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: 'Unable to delete expense' + error
            })
        }
    },
    summary: async (req, res) => {
        try {

        } catch (error) {

        }
    }
}

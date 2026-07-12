const { response } = require('express');
const Expense = require('../models/Expense');

module.exports = {
    listExpenses:  async(req, res)=>{// lists all the expenses found for the user
        try{
            const expenses = await Expense.findAll({ where: {user_id: req.user.id}})
            res.status(200).json({
                expenses: expenses
            })
        }
        catch(error){
            res.status(401).json({
                message: 'Unable to return expenses list' + error
            })
        }
        
    },
    createNewExpense:  async(req, res)=>{// creates a new expense for the user
        try {
            const {amount, category, expense_date, description};
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
            res.status(401).json({
                message: 'Unable to return expenses list' + error
            })
        }
    },
    getSingleExpense:  async(req, res)=>{// Grabs a single expense  based on the id provided in the body
        try {
            const expense = await Expense.findOne({ where: {id: req.params.id}})
            res.status(200).json({
                expense: expense
            })
        } catch (error) {
            res.status(401).json({
                message: 'Unable to return expenses list' + error
            })
        }
    },
    updateExpense:  async(req, res)=>{// updates an expense based on the id sent
        try {
            const expense = await Expense.findOne({ where: {id: req.params.id}})
        } catch (error) {
            res.status(401).json({
                message: 'Unable to return expenses list' + error
            })
        }
    },
    deleteExpense:  async(req, res)=>{//deletes the requested expense based on the id sent

    },
    summary: async(req, res) => {

    }
}

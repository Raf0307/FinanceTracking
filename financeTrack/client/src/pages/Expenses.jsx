import { useState, useEffect } from "react";
import api from '../api';

function Expenses() {
    //need to add the variables using state here 
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await api.get('/expenses')
            //use the setXXX function here to set the data 
        } catch (error) {
            console.log('Error retrieving data:' + error)
        }
    }
    fetchData()
    }, [])
    return (
        <div>
            <h1>Expenses</h1>
        </div>
    )
};

export default Expenses
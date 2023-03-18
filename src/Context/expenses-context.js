import React from "react";

const ExpensesContext = React.createContext({
    expensesData: [],
    newExpenseHandler: (newExpense)=>{},
    deleteExpenseHandler: (id)=>{}
});
export default ExpensesContext;
import { Button } from "bootstrap";
import { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import ExpensesContext from "../Context/expenses-context";
import "../css/custom.css";
import ExpenseImage from "../img/m1.png";
import ExpenseModel from "../Models/ExpenseModel";
import FormLayout from "./FormLayout";
import Header from "./Header";
import Table from "./Table";
function MainLayout() {
  // const expenses = [];
  const [expenses, setExpenses] = useState([]);
  let onNewExpenseHandler = (newExpense) => {
    // expenses.push(newExpense)
    // newExpense.id = Math.random();
    // setExpenses((prev) => {
    //   return [newExpense, ...prev];
    // });
    // console.log(expenses.length);
    saveExpenseOnFirebase(newExpense);
  };
  // Delete expense handler
  let onDeleteExpenseHandler = (id) => {
    deleteExpenseFromFirebase(id);
    let filteredExpenses = expenses.filter((element) => {
      return element.id != id;
    });
    setExpenses(filteredExpenses);
  };
  //SAVING
  let saveExpenseOnFirebase = (newExpense) => {
    fetch("https://react1-expenses-default-rtdb.firebaseio.com/expenses.json", {
      method: "POST",
      body: JSON.stringify(newExpense),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        newExpense.id = result.name;
        setExpenses((prevExpenses) => {
          return [newExpense, ...prevExpenses];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fetching
  let fetchExpensesFromFirebase = () => {
    fetch("https://react1-expenses-default-rtdb.firebaseio.com/expenses.json", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        let firebaseExpenses = [];
        for (const key in result) {
          let expense = new ExpenseModel(
            result[key].title,
            result[key].date,
            result[key].value,
            result[key].description
          );
          expense.id = key;
          firebaseExpenses.push(expense);
        }
        console.log(firebaseExpenses);
        setExpenses(firebaseExpenses);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DELETING FROM FIREBASE
  let deleteExpenseFromFirebase = function (id) {
    fetch(
      `https://react1-expenses-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(fetchExpensesFromFirebase, []);

  return (
    <ExpensesContext.Provider
      value={{
        expensesData: expenses,
        newExpenseHandler: onNewExpenseHandler,
        deleteExpenseHandler: onDeleteExpenseHandler,
      }}
    >
      <Fragment>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-6">
              <img src={ExpenseImage} className="img-fluid" alt="" />
            </div>
            <div className="col-sm-6 mt-5">
              <Header />
              <FormLayout />
            </div>
          </div>
          <Table />
        </div>
      </Fragment>
    </ExpensesContext.Provider>
  );
}
export default MainLayout;

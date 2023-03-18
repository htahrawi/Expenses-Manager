import { useContext } from "react";
import { useRef } from "react";
import ExpensesContext from "../Context/expenses-context";
import ExpenseModel from "../Models/ExpenseModel";
import FormInput from "./FormInput";

function FormLayout(props) {
    let titleRef = useRef();
    let dateRef = useRef();
    let valueRef = useRef();
    let descRef = useRef();
    let expenseContext = useContext(ExpensesContext);

    let onSubmitHandler = (event) => {
        event.preventDefault();
        let newExpense = new ExpenseModel(
            // Math.random(),
            titleRef.current.value,
            dateRef.current.value,
            valueRef.current.value,
            descRef.current.value
        );
        // console.log(descRef.current.value);
        // props.onNewExpense(newExpense);
        expenseContext.newExpenseHandler(newExpense);
        clear();
    };
    let clear = () => {
        titleRef.current.value = "";
        dateRef.current.value = "";
        valueRef.current.value = "";
        descRef.current.value = "";
    };

    return (
        <form className="row" onSubmit={onSubmitHandler}>
            <FormInput title="name" type="text" className="addTitle" ref={titleRef} />
            <FormInput title="Date" type="date" className="addDate" ref={dateRef} />
            <FormInput
                title="Value"
                type="number"
                className="addValue"
                ref={valueRef}
            />
            <FormInput
                title="description"
                type="text"
                className="addDescrption"
                ref={descRef}
            />

            <div className="mb-3 col-md-12 text-right">
                <button type="submit" className="btn btn-primary addBtn">
                    Add
                </button>
            </div>
        </form>
    );
}

export default FormLayout;

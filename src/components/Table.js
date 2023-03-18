import { useContext } from "react";
import ExpensesContext from "../Context/expenses-context";
import TableRow from "./TableRow";

function Table(props) {
    // let onDeleteHandler = (id) => { 
    //     props.deleteHandler(id);
    // };
    let data = useContext(ExpensesContext);
    return (
        <div className="row mt-5 mb-5">
            <div className="custom-card ">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Value</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="addRow"></tr>
                        {/* {props.expenses.map((element) => (
                            <TableRow
                                key={element.id}
                                id={element.id}
                                title={element.title}
                                date={element.date}
                                price={element.value}
                                description={element.description}
                                deleteHandler={onDeleteHandler}
                            />
                        ))} */}
                        {data.expensesData.map((element) => (
                            <TableRow
                                key={element.id}
                                id={element.id}
                                title={element.title}
                                date={element.date}
                                price={element.value}
                                description={element.description}
                                // deleteHandler={onDeleteHandler}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Table;

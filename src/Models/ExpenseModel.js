class ExpenseModel {
    id;
    title;
    date;
    value;
    description;

    constructor( title, date, value, description) {
        this.title = title;
        this.date = date;
        this.value = value;
        this.description = description;
    }
}

export default ExpenseModel;

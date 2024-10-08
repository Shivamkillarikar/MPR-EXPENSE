const ExpensesList = ({ expenses }) => {
    return (
        <div>
            <h2>Expenses</h2>
            <ul>
                {expenses.map((expense, index) => (
                    <li key={index}>
                        {expense.description}: ${expense.amount} (Email: {expense.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpensesList;

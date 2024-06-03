import { SlClose  } from "react-icons/sl";

const AddExpenses = ({ onClose }) => {
    return (
        <div className="addexpenses-container">
            <div className="header-container">
                <h3>Add Payment</h3>
                <SlClose  className="left-icon" onClick={onClose}/>
            </div>
            <div className="expenses-amount">
                <strong>Amount</strong>
                <div className="amount-input-container">
                    <p>INR</p>
                    <input type="text" placeholder="enter your amount here" />
                </div>
            </div>
            <div className="expenses-category">
                <strong>Select Category</strong>
                <div className="expenses-category-container">
            <p>Food</p>
                <select>
                    <option>Food</option>
                    <option>Grocery</option>
                    <option>Movie</option>
                    <option>Online Transaction</option>
                </select>
            </div>
            </div>
            <div className="expenses-notes">
                <strong>Write Notes</strong>
                <div className="notes-input-container">
                    <input type="text" placeholder="write notes ....." />
                </div>
            </div>
            <button className="payment-button">Add Payment</button>
        </div>
    )
}
export default AddExpenses;
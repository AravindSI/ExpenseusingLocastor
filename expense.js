function saveToCloudStorage(event){
    event.preventDefault();
    const ExpenseAmount=event.target.ChooseExpenseAmount.value;
    const Description=event.target.chooseDescription.value;
    const Category=event.target.chooseACategory.value;
    //localStorage.setItem("ExpenseAmount",ExpenseAmount);
    //localStorage.setItem("Description",Description);
    //localStorage.setItem("Category",Category);
    const obj={
        ExpenseAmount,
        Description,
        Category
    }
    localStorage.setItem(obj.Description,JSON.stringify(obj));
    showNewExpenseOnScreen(obj);
}
function showNewExpenseOnScreen(expense){
    document.getElementById("choose description").value='';
    document.getElementById("ChooseExpenseAmount").value='';
    document.getElementById("choose a category").value='';
    const parentNode=document.getElementById("listOfExpense");
    const childHTML=`<li id="${expense.Description}">${expense.ExpenseAmount}-${expense.Description}-${expense.Category} 
                            <button onClick=deleteExpense('${expense.Description}')>DeleteExpense</button>
                            <button onClick=editExpense('${expense.Description}','${expense.ExpenseAmount}','${expense.Category}')>EditExpense</button>
                      </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;
}
function deleteExpense(description){
    localStorage.removeItem(description);
    removeFromScreen(description);
}
function removeFromScreen(description){
    const parentNode=document.getElementById("listOfExpense");
    const childToBeDel=document.getElementById(description);
       parentNode.removeChild(childToBeDel);
}
function editExpense(description,ExpenseAmount,category){
    document.getElementById("choose description").value=description;
    document.getElementById("ChooseExpenseAmount").value=ExpenseAmount;
    document.getElementById("choose a category").value=category;
    deleteExpense(description);

}


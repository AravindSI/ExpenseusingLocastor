async function saveToCloudStorage(event){
    event.preventDefault();
    const ExpenseAmount=event.target.ChooseExpenseAmount.value;
    const Description=event.target.chooseDescription.value;
    const Category=event.target.chooseACategory.value;
    const obj={
        ExpenseAmount,
        Description,
        Category
    }
    try{
        let response=await axios.post("https://crudcrud.com/api/56f75d38d4cd477fa7dd981fcf003f86/appointmentdata",obj)
        showNewExpenseOnScreen(response.data)
        console.log(response);
    }
    catch(error){
        console.log(error);
    }
   


    /*.then((response)=>{
        showNewExpenseOnScreen(response.data)
        console.log(response);
    })
    .catch((err)=>{
        console.log(err)
    });*/
    //localStorage.setItem(obj.Description,JSON.stringify(obj));
    //showNewExpenseOnScreen(obj);
}
window.addEventListener("DOMContentLoaded",()=>{
async function a() {
   
    try {
        let response = await axios.get("https://crudcrud.com/api/56f75d38d4cd477fa7dd981fcf003f86/appointmentdata");
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            showNewExpenseOnScreen(response.data[i]);
        }
    }
    catch (err) {
        console.log(err);
    }
}
a();
})



/*.then((response)=>{
    console.log(response)
    for(var i=0;i<response.data.length;i++){
        showNewExpenseOnScreen(response.data[i])
    }
})
   .catch((err)=>{
    console.log(err)
})*/

function showNewExpenseOnScreen(expense){
    document.getElementById("choose description").value='';
    document.getElementById("ChooseExpenseAmount").value='';
    document.getElementById("choose a category").value='';
    const parentNode=document.getElementById("listOfExpense");
    const childHTML=`<li id="${expense._id}">${expense.ExpenseAmount}-${expense.Description}-${expense.Category} 
                            <button onClick=deleteExpense('${expense._id}')>DeleteExpense</button>
                            <button onClick=editExpense('${expense.Description}','${expense.ExpenseAmount}','${expense.Category}','${expense._id}')>EditExpense</button>
                      </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;
}
async function deleteExpense(userId){
    try{
        let response=await axios.delete(`https://crudcrud.com/api/56f75d38d4cd477fa7dd981fcf003f86/appointmentdata/${userId}`)
        removeFromScreen(userId)
        console.log(response)
    }catch(err){
        console.log(err)
    }
    
   /* .then((response)=>{
      removeFromScreen(userId)
      console.log(response)
    })
    .catch((err)=>{
      console.log(err)
    })*/
}
function removeFromScreen(userId){
    const parentNode=document.getElementById("listOfExpense");
    const childToBeDel=document.getElementById(userId);
       parentNode.removeChild(childToBeDel);
}
function editExpense(description,ExpenseAmount,category,userId){
    document.getElementById("choose description").value=description;
    document.getElementById("ChooseExpenseAmount").value=ExpenseAmount;
    document.getElementById("choose a category").value=category;
    deleteExpense(userId);

}


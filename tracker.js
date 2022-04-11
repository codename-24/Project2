document.getElementById('submit').addEventListener('click',addExpense);

function addExpense(){
    const amt = document.getElementById('amount').value;
    const desp = document.getElementById('description').value;
    const cat = document.getElementById('dropdown').value;
    const expenses = {
        amount : amt,
        description : desp,
        category : cat,
        
    }
    axios.post("https://crudcrud.com/api/1042f0604917477dbff182ea2a7f5388/expenseTracker",{expenses})
    .then(response =>{
        console.log(response);
    }).catch(error =>{
        console.log(error);
    })
}

    window.addEventListener("DOMContentLoaded",()=>{
        axios.get("https://crudcrud.com/api/1042f0604917477dbff182ea2a7f5388/expenseTracker")
        .then(response =>{
            for(var i=0; i<response.data.length;i++){
                console.log('inside loop' , response.data[i])
                showOutput(response.data[i]);
            }
        })
        .catch(error =>{
            console.log(error);
        })
    })

function showOutput(expenses){
    console.log('inside showoutput', expenses);
    const parentNode = document.getElementById('display');
    const childHTML = `<li id = ${expenses._id}>${expenses.amount} -- ${expenses.description} -- ${expenses.category}
    <button onclick = editExpense(${expenses.id},${expenses.amount},${expenses.description},${expenses.category})> Edit Expense </button>
    <button onclick = deleteExpense(${expenses.id})> Delete Expense </button>
    </li>`
    parentNode.innerHTML = parentNode.innerHTML+childHTML;
}

function editExpense(i,a,d,c){
    if(i){
        axios.patch(`https://crudcrud.com/api/1042f0604917477dbff182ea2a7f5388/expenseTracker/${i}`)
        .then(response =>{
            document.getElementById('amount').value = a;
            document.getElementById('description').value = d;
            document.getElementById('category').value = c;
            remove(i);
        })
       .catch(error=>{
        console.log(error);
        })
    }
}

function deleteExpense(id){
    axios.delete(`https://crudcrud.com/api/1042f0604917477dbff182ea2a7f5388/${id}`)
    .then(response =>{
        remove(id);
    })
    .catch(error =>{
        console.log(error);
    })
}

function remove(id){
    const parentNode = document.getElementById('display');
    const tobedeleted = document.getElementById(eid);
    if(tobedeleted){
        parentNode.removeChild(tobedeleted);
    }
}

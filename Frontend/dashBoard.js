const categories = [
    {id : 'ent', name : 'Entertainment'},
    {id : 'util', name : 'Utilities'},
    {id : 'prod', name : 'Productivity'}
];
const subForm = document.getElementById("subForm");
const addBtn = document.getElementById("addSubscription");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeModal");
const initCategories = () => {
    const categorySelect = document.getElementById('category');
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = `${cat.name}`;
        categorySelect.appendChild(option);
    })
}

addBtn.addEventListener('click', (e) => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', (e) => {
    modal.style.display = 'none';
});

subForm.addEventListener('submit',async (e) =>{
    e.preventDefault();

    const formData = new FormData(subForm);
    
    // 2. Convert it into a clean object
    const subData = Object.fromEntries(formData.entries());

    console.log(subData);

    const request = await fetch('http://localhost:3000/api/dashboard/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            service_name : subName, price, currency, category, billing_cycle : billingCycle
        })
    });

    const result = await request.json();

    if(result.success){
        window.alert("Action Successful")
    }
    else{
        window.alert(result.message);
    }

});

document.getElementById("logout").addEventListener('click', (e) =>{
    const token = localStorage.getItem('token');
    if(!token){
        window.location.replace('403.html');
    }
    localStorage.clear()
    window.location.href ='loggedout.html';
});

initCategories();
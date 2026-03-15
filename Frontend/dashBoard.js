const categories = [
    {id : 'ent', name : 'Entertainment'},
    {id : 'util', name : 'Utilities'},
    {id : 'prod', name : 'Productivity'}
];
const subForm = document.getElementById("subForm");
const addBtn = document.getElementById("addSubscription");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeModal");
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');

const initCategories = () => {
    const categorySelect = document.getElementById('category');
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = `${cat.name}`;
        categorySelect.appendChild(option);
    })
}

menuToggle.addEventListener('click', ()=> {
    sidebar.classList.add('open');
})

document.addEventListener('click', (e) => {
    const insideSidebar = sidebar.contains(e.target);
    const isButton = menuToggle.contains(e.target);

    if(!insideSidebar && !isButton && sidebar.classList.contains('open')){
        sidebar.classList.remove('open');
    }
})

addBtn.addEventListener('click', (e) => {
    modal.showModal();
    sidebar.classList.remove('open');
});

closeBtn.addEventListener('click', (e) => {
    modal.close();
});

subForm.addEventListener('submit',async (e) =>{
    e.preventDefault();

    const formData = new FormData(subForm);
    
    const subData = Object.fromEntries(formData.entries());

    const request = await fetch('http://localhost:3000/api/dashboard/add', {
        method: 'POST',
        headers: { 'authorization' : `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            service_name : subData.subName,
            price : subData.price,
            currency : subData.currency,
            category : subData.category,
            billing_cycle : subData.billingCycle
        })
    });

    const result = await request.json();

    console.log(result);
    if(result.success){
        window.alert("Action Successful")
        modal.close();
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
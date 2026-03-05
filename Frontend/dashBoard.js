const addBtn = document.getElementById("addSubscription")
const modal = document.getElementById("modal")
const closeBtn = document.getElementById("closeModal")

addBtn.addEventListener('click', (e) => {
    modal.style.display = 'flex';
})

closeBtn.addEventListener('click', (e) => {
    modal.style.display = 'none';
})

document.getElementById("logout").addEventListener('click', (e) =>{
    const token = localStorage.getItem('token');
    if(!token){
        window.location.replace('403.html');
    }
    localStorage.clear()
    window.location.href ='loggedout.html';
})

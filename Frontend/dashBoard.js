document.getElementById("logout").addEventListener('click', (e) =>{
    const token = localStorage.getItem('token');
    if(!token){
        window.location.replace('403.html');
    }
    localStorage.clear()
    window.location.href ='loggedout.html';
})
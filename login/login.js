

document.getElementById("login-btn").addEventListener("click",()=>{
    // 1.get the username
    const nameInput=document.getElementById("name-input")
    const username = nameInput.value 
    // console.log(username);
    // 2.get the password
    const inputPass =document.getElementById("input-pass")
    const password = inputPass.value
    console.log(password);
    // 3.match the username & password
        if (username === "admin" && password === "admin123") {
        // 4.true>>>alert> home page
        alert("entry");
       window.location.assign("home.html");
    } else {
        // 5.false>>alert>return
        alert("no entry");
        return
    }
});
    
    


console.log(document.getElementById('pID'));
document.getElementById('submitBtn').addEventListener('click',()=>{
    document.getElementById('pID').value = new Date().getTime();
})



document.getElementById('submitBtn').addEventListener('click',()=>{
    document.getElementById('fId').value = new Date().getTime();
})
//ASSIGN ELEMENTS TO A VARIABLE 
const fId =document.querySelector('#fId')
const fName = document.querySelector('#fName');
const fQuantity= document.querySelector('#fQuantity');
const fPrice = document.querySelector('#fPrice');
const fDesription = document.querySelector('#fDescription'); 

const urlParams = new URLSearchParams(window.location.search);
const btnId = urlParams.get('id');
const status = urlParams.get('edit');

if (urlParams.has('id')) {
  editData(btnId);
}

async function editData(btnId){
    try {

        const uniqueProduct = await axios.get(`http://192.168.29.221:3001/admin/productData/edit/${btnId}`);
        const { id, pName, pPrice, pQuantity, pDescription} = uniqueProduct.data; 
        fName.value = pName;
        fPrice.value= pPrice
        fQuantity.value= pQuantity;
        fDesription.value=pDescription;

        await axios.get(`http://192.168.29.221:3001/admin/productData/remove/${btnId}`)       

    } catch (err) {
        console.log(err);
    }
}


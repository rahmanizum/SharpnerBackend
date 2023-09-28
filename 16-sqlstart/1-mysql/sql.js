const db  = require('./database');

//by using then and cath
            // db.execute('SELECT * FROM products')
            // .then((e)=>{
            // console.log(e);
            // })
            // .catch(err=>{
            //     console.log(err);
            // })

//by using asynch and await 
            async function getdata(){
                const data = await db.execute('SELECT * FROM products');
                console.log(data);
            }
            getdata();
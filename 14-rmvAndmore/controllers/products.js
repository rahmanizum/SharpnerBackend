
//IMPORT GLOABLE FS
const fs = require('fs').promises;

//IMPORT LOCAL MODEL CLASS TO MANAGE DATA BASE 
const Product = require('../models/product');

//CREATE CONROLLERS RELATED TO PRODUCT AND THEN EXPORTS 
exports.getAddProductpage = (request, response, next) => {
    // Send a response just for admin/add-product incoming requests
    response.sendFile('addProduct.html', { root: 'views/admin' });
}

// CREATE A CONROLLER TO ADD PRODUCT TO LIST AND RESPOND WITH ALL PRODUCT ASYNC
exports.adminAddproduct = async (request, response, next) => {
    try {
        // Get data from the request body
        const { id, productName, pPrice, pQuantity, pDescription,} = request.body;

        // Create a new product
        const product = new Product(id, productName, pPrice, pQuantity, pDescription);

        // Save the product to the database
        product.save();
        response.redirect('/admin/listed-product');
        // // Read the HTML file
        // const htmlData = await fs.readFile('./views/listed-product.html', 'utf-8');

        // // Read the JSON data from the database
        // const data = await fs.readFile('./data/dataBase.json', 'utf-8');

        // if (data !== "") {
        //     const productArr = JSON.parse(data);

        //     // Find the placeholder index in the HTML
        //     const placeholderIndex = htmlData.indexOf('<div id="product-card-placeholder"></div>');

        //     let startingHtmlData = htmlData.slice(0, placeholderIndex);

        //     // Generate HTML for each product in the database
        //     for (const element of productArr) {
        //         const { id, pName, pPrice,imgID } = element;

        //         const newProductCard = await fs.readFile('./views/cardContent.html', 'utf8');

        //         // Replace placeholders with actual data
        //         const replacedCard = newProductCard
        //             .replace(/{{pName}}/g, pName)
        //             .replace(/{{pPrice}}/g, pPrice)
        //             .replace(/{{pID}}/g, id)
        //             .replace(/{{imgID}}/g,`${imgID}.jpg`);

        //         startingHtmlData += replacedCard;
        //     }

        //     let modifiedHtmlData = startingHtmlData + htmlData.slice(placeholderIndex);
        // }
    } catch (err) {
        console.error(err);
        // Handle errors and send an appropriate response
        response.status(500).send('Internal Server Error');
    }
};


//*******************************CONTROLLERS FOR USERS **********************************

// CREATE A CONROLLER TO SEE ALL PRODUCT LISTED
exports.userListProduct = async (request, response, next) => {
    try {
        // Read the HTML file
        const htmlData = await fs.readFile('./views/user/listProduct.html', 'utf-8');

        // Read the JSON data from the database
        const data = await fs.readFile('./data/dataBase.json', 'utf-8');

        if (data !== "") {
            const productArr = JSON.parse(data);

            // Find the placeholder index in the HTML
            const placeholderIndex = htmlData.indexOf('<div id="product-card-placeholder"></div>');

            let startingHtmlData = htmlData.slice(0, placeholderIndex);

            // Generate HTML for each product in the database
            for (const element of productArr) {
                const { id, pName, pPrice,imgID } = element;
                const newProductCard = await fs.readFile('./views/user/productCard.html', 'utf8');

                // Replace placeholders with actual data
                const replacedCard = newProductCard
                    .replace(/{{pName}}/g, pName)
                    .replace(/{{pPrice}}/g, pPrice)
                    .replace(/{{pID}}/g, id)
                    .replace(/{{imgID}}/g,`${imgID}.jpg`);

                startingHtmlData += replacedCard;
            }

            let modifiedHtmlData = startingHtmlData + htmlData.slice(placeholderIndex);
            response.send(modifiedHtmlData);
        }
        else{
            response.send(htmlData);
        }
    } catch (err) {
        console.error(err);
        // Handle errors and send an appropriate response
        response.status(500).send('Internal Server Error');
    }
};

//CREATE A CONTROLLER TO GIVE DESCRIPTION WHILE CLICK DETAILS 
exports.pDescription = async (request, response) => {
    try {
        const pID = request.params.pID;
        const data = await fs.readFile('./views/user/pDescription.html', 'utf-8');
        const productArr = JSON.parse(await fs.readFile('./data/dataBase.json', 'utf-8'));

        const { pName, pQuantity, pPrice, pDescription,imgID} = productArr.find(element => (element.id === pID))
        const modifiedHtmlData = data
            .replace(/{{pName}}/g, pName)
            .replace(/{{pPrice}}/g, pPrice)
            .replace(/{{pQuantity}}/g, pQuantity)
            .replace(/{{pDescription}}/g, pDescription)
            .replace(/{{imgID}}/g,`${imgID}.jpg`)
            .replace(/{{pID}}/g,`${pID}`);
        response.send(modifiedHtmlData);

    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error');
    }

};
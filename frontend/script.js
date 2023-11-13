document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

function loadProducts() {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" style="width:100px; height:100px;">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Price: ${product.price}</p>
                `;

                productDiv.addEventListener('click', () => {
                    loadProductDetails(product.id); // Load and show product details in the modal
                });

                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

function loadProductDetails(productId) {
    fetch(`http://localhost:3000/product/${productId}`)
        .then(response => response.json())
        .then(product => {
            const detailSection = document.getElementById('product-detail');
            detailSection.innerHTML = `
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Seller: ${product.seller}</p>
            `;

            // Setup chat button event
            document.getElementById('talk-to-seller').onclick = () => initiateChat(productId);

            showModal();
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('product-detail').innerHTML = '<p>Product not found.</p>';
        });
}

// Add the initiateChat function
function initiateChat(productId) {
    const openAIKey = document.getElementById('openai-key').value;
    // Implement the logic to initiate chat with the seller using OpenAI API
    // You can use this key to send messages from the user's AI assistant to the seller's AI
    // For now, you might just display an alert or log to the console
    console.log('Initiating chat for product', productId, 'with OpenAI key:', openAIKey);
}


function showModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = "block";
}

function hideModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = "none";
}

// Close Modal when 'x' is clicked
const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', hideModal);

// Close Modal when clicking outside of the modal
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        hideModal();
    }
};
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// CORS Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allows access from any origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());

const products = [
    { 
        id: 1, 
        name: 'Magic Wand', 
        description: 'A wand for all your wizarding needs.', 
        seller: 'Gandalf the Grey',
        image: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t45.5328-4/394320368_7533731259989796_39034671066139984_n.jpg?stp=c0.87.526.526a_dst-jpg_p526x395&_nc_cat=111&ccb=1-7&_nc_sid=247b10&_nc_ohc=A5G6n8od4nEAX9QCEui&_nc_ht=scontent-sjc3-1.xx&oh=00_AfANL1iIoXjKTdQOjqdOcovKZzCGQPx5hpRnJXzv84CkXQ&oe=65570E3D', // Placeholder image URL
        price: '50 Gold Coins'
    },
    { 
        id: 2, 
        name: 'Enchanted Sword', 
        description: 'A sword with mystical powers.', 
        seller: 'Aragorn',
        image: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t45.5328-4/394717933_6803522906362128_2243987958617755473_n.jpg?stp=c0.87.526.526a_dst-jpg_p526x395&_nc_cat=111&ccb=1-7&_nc_sid=247b10&_nc_ohc=Mi0wqr-qE3IAX9qu5F4&_nc_ht=scontent-sjc3-1.xx&oh=00_AfBvE-NlxiHOXwAl4UcZBgsshy-Lxm5M8AHDCTXyj0EAUg&oe=65558433', // Placeholder image URL
        price: '100 Gold Coins'
    },
    // More products...
];

// Endpoint for fetching product listings
app.get('/products', (req, res) => {
    res.json(products);
});

// Endpoint for fetching specific product details
app.get('/product/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// Endpoint for handling chat
app.post('/chat', async (req, res) => {
    const { message, api_key } = req.body;

    if (!message) {
        return res.status(400).send('Message is required');
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: message,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${api_key || process.env.OPENAI_API_KEY}`
            }
        });

        res.json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in AI response');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from random import randint
import os
import requests

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()

# Mock data for marketplace simulation
products = [
    {
        'id': i,
        'name': f'Product {i}',
        'price': f'${randint(1, 150)}',
        'seller_id': f'seller_{i}',
        # Add other product details here
    }
    for i in range(1, 21)
]

# Route to list all products
@app.route('/api/products', methods=['GET'])
def list_products():
    return jsonify(products), 200

# Route to add a new product
@app.route('/api/products', methods=['POST'])
def add_product():
    new_product = request.json
    new_product['id'] = max(product['id'] for product in products) + 1  # Generate new ID
    products.append(new_product)
    return jsonify(new_product), 201

# Route to search for products
@app.route('/api/products/search', methods=['GET'])
def search_products():
    query = request.args.get('q', '')
    filtered_products = [product for product in products if query.lower() in product['name'].lower()]
    return jsonify(filtered_products), 200

# Route to retrieve assistants from OpenAI
@app.route('/api/assistants', methods=['GET'])
def list_assistants():
    api_key = request.headers.get('Authorization')
    if not api_key:
        return jsonify({'error': 'Missing API key'}), 401
    
    try:
        response = requests.get(
            'https://api.openai.com/v1/assistants',
            headers={
                'Authorization': api_key,
                'OpenAI-Beta': 'assistants=v1'
            }
        )
        response.raise_for_status()  # This will raise an error for HTTP error codes
        return jsonify(response.json()), 200
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), e.response.status_code if e.response else 500

# Serve the static files for the frontend
@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    port = os.environ.get('PORT', 5000)
    app.run(debug=True, port=port)

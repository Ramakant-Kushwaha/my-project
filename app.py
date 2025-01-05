from flask import Flask, jsonify, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# Sample route
@app.route('/api/greet', methods=['GET'])
def greet():
    file_path = 'data.json'
    return send_file(file_path, mimetype='application/json')

if __name__ == '__main__':
    app.run(debug=True)

# POST endpoint to receive data
@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json  # Parse JSON data from request
    return jsonify({"received": data, "message": "Data processed successfully!"})

# GET endpoint with URL parameter
@app.route('/api/getData', methods=['GET'])
def get_json_file():
    # Path to the JSON file
    file_path = 'data.json'
    return send_file(file_path, mimetype='application/json')

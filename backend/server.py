from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# Helper function to get DB connection
def get_db_connection():
    conn = sqlite3.connect('gym.db')
    conn.row_factory = sqlite3.Row
    return conn

# Create table if not exists
def create_customer_table():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS customer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

create_customer_table()

@app.route('/people', methods=['GET'])
def get_people():
    conn = get_db_connection()
    cursor = conn.execute('SELECT id, name, phone, address FROM customer')
    people = [
        {
            "id": row["id"],
            "name": row["name"],
            "phone": row["phone"],
            "address": row["address"]
        }
        for row in cursor.fetchall()
    ]
    conn.close()
    return jsonify(people)

# --- New POST route for registering customer ---
@app.route('/register', methods=['POST'])
def register_customer():
    data = request.get_json()
    name = data.get('name')
    phone = data.get('phone')
    address = data.get('address')

    if not name or not phone or not address:
        return jsonify({'error': 'Missing required fields'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO customer (name, phone, address) VALUES (?, ?, ?)',
        (name, phone, address)
    )
    conn.commit()
    customer_id = cursor.lastrowid
    conn.close()

    # Return the saved data (including id)
    return jsonify({
        'id': customer_id,
        'name': name,
        'phone': phone,
        'address': address
    }), 201

if __name__ == '__main__':
    app.run(debug=True)
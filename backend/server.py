from flask import Flask, jsonify

app = Flask(__name__)

# ...existing code...
@app.route('/people', methods=['GET'])
def get_people():
    people = [
        {
            "name": "John Doe",
            "phone": "123-456-7890",
            "address": "123 Main St, Cityville"
        },
        {
            "name": "Jane Smith",
            "phone": "987-654-3210",
            "address": "456 Elm St, Townsville"
        },
        {
            "name": "Alice Johnson",
            "phone": "555-123-4567",
            "address": "789 Oak St, Villagetown"
        },
        {
            "name": "Bob Williams",
            "phone": "222-333-4444",
            "address": "321 Pine St, Hamlet"
        },
        {
            "name": "Emily Brown",
            "phone": "444-555-6666",
            "address": "654 Maple St, Borough"
        }
    ]
    return jsonify(people)


if __name__ == '__main__':
    app.run(debug=True)
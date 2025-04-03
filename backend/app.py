from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import subprocess

app = Flask(__name__)
CORS(app)  # Allow requests from React

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def home():
    return "Flask server is running!"
# Route to handle file upload
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    # Run flake8 for code review
    review_result = run_flake8(file_path)
    
    # Delete the uploaded file after review
    os.remove(file_path)

    return jsonify({"review": review_result})

def run_flake8(file_path):
    """Runs flake8 and returns the code review results."""
    try:
        result = subprocess.run(['flake8', file_path], capture_output=True, text=True, check=False)
        output = result.stdout.strip()
        if not output:
            return "No issues found. ✅"
        return output
    except Exception as e:
        return f"Error during review: {str(e)}"

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import face_recognition
from urllib.request import urlopen
import requests
import cv2
import numpy as np
from utils import get_faces, get_texts

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def get_example():
    """GET in server"""
    response = jsonify(message="Simple server is running")
    
    # Enable Access-Control-Allow-Origin
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/", methods=["POST"])
@cross_origin()
def post_example():
    """POST in server"""
    return jsonify(message="POST request returned")

# POST method to return matches for a photo
@app.route("/matches", methods=["POST"])
@cross_origin()
def get_matches():
    # Get post from JSON request and ASP.NET backend
    data = request.get_json()
    post_id = data["post_id"]
    post = requests.get('http://localhost:5000/api/posts/' + post_id)
    post = post.json()

    list_faces = []
    list_texts = []

    # Get photo
    photos = post["photos"]
    if len(photos) > 0:
        photo_url = photos[0]["url"]
        response = urlopen(photo_url)

        # Load image with OpenCV
        image = np.asarray(bytearray(response.read()), dtype="uint8")
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # Get face encodings
        boxes = face_recognition.face_locations(rgb, model='hog')
        face_encodings = face_recognition.face_encodings(rgb, boxes)

        if len(face_encodings) > 0:
            # Get all posts from ASP.NET backend
            all_posts = requests.get('http://localhost:5000/api/posts')
            p = all_posts.json()

            list_faces = get_faces(face_encodings, p, photo_url)
            list_texts = get_texts(post, p)

    return jsonify({'faces': list_faces, 'texts': list_texts})

if __name__ == "__main__":
  app.run(port=8000)
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import face_recognition
from urllib.request import urlopen
import requests
import cv2
import numpy as np

app = Flask(__name__)

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
    # Get photo url from JSON request
    data = request.get_json()
    photo_url = data["url"]
    response = urlopen(photo_url)

    # Load image with OpenCV
    image = np.asarray(bytearray(response.read()), dtype="uint8")
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Get face encodings
    boxes = face_recognition.face_locations(rgb, model='hog')
    face_encodings = face_recognition.face_encodings(rgb, boxes)
    # print(face_encodings)

    # Get all photos from ASP.NET backend
    all_photos = requests.get('http://localhost:5000/api/photos')
    p = all_photos.json()

    # Check if face exists on photo
    matches = []
    if len(face_encodings) > 0:
        encoding_to_check = face_encodings[0]

        # Query through all photos
        for photo in p:
            cur_url = photo["url"]
            if (cur_url != photo_url): # check not selected photo
                cur_response = urlopen(cur_url)

                # Load new image with OpenCV
                new_image = np.asarray(bytearray(cur_response.read()), dtype="uint8")
                new_image = cv2.imdecode(new_image, cv2.IMREAD_COLOR)
                new_rgb = cv2.cvtColor(new_image, cv2.COLOR_BGR2RGB)

                # Get face encodings
                new_boxes = face_recognition.face_locations(new_image, model='hog')
                cur_face_encodings = face_recognition.face_encodings(new_rgb, new_boxes)

                # Compare faces if face can be identified
                if len(cur_face_encodings) > 0:
                    cur_encoding = cur_face_encodings[0]
                    result = face_recognition.compare_faces([cur_encoding], encoding_to_check)
                    if result[0] == True:
                        matches.append(photo)

    return jsonify({'matches': matches})

if __name__ == "__main__":
  app.run(port=8000)
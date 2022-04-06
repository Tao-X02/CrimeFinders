import face_recognition
from urllib.request import urlopen
import cv2
import numpy as np
import spacy

nlp = spacy.load("en_core_web_lg")

# Function to get identical faces (with face_recognition)
def get_faces(face_encodings, posts, sel_url):
    matches = []
    for p in posts:
        photos = p["photos"]
        if len(photos) > 0:
            # Get photo
            photo_url = photos[0]["url"]
            response = urlopen(photo_url)

            if (photo_url != sel_url):
                # Load image with OpenCV
                image = np.asarray(bytearray(response.read()), dtype="uint8")
                image = cv2.imdecode(image, cv2.IMREAD_COLOR)
                rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

                # Get face encodings
                boxes = face_recognition.face_locations(rgb, model='hog')
                cur_face_encodings = face_recognition.face_encodings(rgb, boxes)

                # Compare faces if face can be identified
                if len(cur_face_encodings) > 0:
                    cur_encoding = cur_face_encodings[0]
                    result = face_recognition.compare_faces([cur_encoding], face_encodings[0])
                    if result[0] == True:
                        matches.append(photos[0])

    return matches

# remove stop words
def preprocess(text):
    custom_remove_words = {
        'ottawa',
        'ontario',
        'kitchener',
        'crime',
        'stoppers',
        'stopper',
        'cambridge',
        'toronto',
        'police',
        'service',
        'waterloo',
        'anyone',
        'information',
        'asked',
        'contact',
        'ext',
        'anonymous',
        'tips',
        'public',
        'assistance'
    }
    STOP_WORDS = spacy.lang.en.stop_words.STOP_WORDS
    nlp.Defaults.stop_words |= custom_remove_words
    doc = nlp(text.lower())

    final = []
    for token in doc:
        if (token.text in nlp.Defaults.stop_words or token.text in STOP_WORDS):
            continue
        final.append(token.text)
    return " ".join(final)

# Function to identify similar texts (with spaCy)
def get_texts(post, posts):
    matches = []

    # Get description
    text1 = post["description"]
    text1 = preprocess(text1)
    doc1 = nlp(text1)

    # Loop through post and get descriptions
    for p in posts:
        if (p["id"] != post["id"]):
            text2 = p["description"]
            text2 = preprocess(text2)
            doc2 = nlp(text2)

            # Get similarity
            res = doc1.similarity(doc2)
            print(res);
            if (res > 0.87):
                matches.append(p)

    return matches
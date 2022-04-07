# Set base image (host OS)
FROM python:3.9

# By default, listen on port 8000
EXPOSE 8000/tcp

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any dependencies
RUN apt-get update && apt-get install -y cmake
RUN pip install -U pip wheel cmake

RUN apt-get install -y libgl1 ffmpeg libsm6 libxext6 libgl1-mesa-glx
RUN apt-get install -y python3-opencv
RUN pip3 install opencv-python-headless==4.5.5.64

RUN pip install -r requirements.txt

# Copy the content of the local src directory to the working directory
COPY app.py .
COPY utils.py .

# Specify the command to run on container start
CMD [ "python", "./app.py", "--host=0.0.0.0" ]

EXPOSE 8000
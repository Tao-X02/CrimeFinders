# CrimeFinders

An online platform to identify suspects, fugitives, and missing persons by submitting and matching anonymous tips.

Developed with:
  - **ASP.NET** (C#)
  - **PostgreSQL**
  - **Entity Framework**
  - **React** (with Typescript)
  - **MobX**
  - **Material UI**
  - **Flask** (Python)
  - **Docker**

# Demo Video


# To test the development vesion
**NOTE**: Deployments on cloud are being worked on. Will update once the app goes live. In addition, some Docker files are incomplete. Therefore follow these instructions:
1) Make sure that [docker](https://www.docker.com/) is installed on your computer. Then run the PostgreSQL database:
```
docker run --name postgresql -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:latest
```

2) To run the .NET backend, install the latest version of [.NET 6](https://dotnet.microsoft.com/en-us/download) and run:
```
cd API
dotnet run
```

3) Make sure that Python is installed. From the base directory, go to the flask server and run:
```
cd flask-server
source env/bin/activate // Sets up the virtual environment
pip3 install -r requirements.txt // This may take a while
```
After installations are complete, run the app.py script:
```
python3 app.py
```

4) To run the React app, from the base directory
```
cd frontend
yarn start
```

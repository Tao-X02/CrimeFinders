# CrimeFinders

An online platform to identify suspects, fugitives, and missing persons by submitting and matching anonymous tips.

**Developed with:**
  - **ASP.NET** (C#)
  - **PostgreSQL**
  - **Entity Framework**
  - **Cloudinary** (Photo upload)
  - **React** (with Typescript)
  - **MobX**
  - **Material UI**
  - **Flask** (Python)
  - **Docker**

**Demo Video:**

The quality is not optimal due to file compressions.

https://user-images.githubusercontent.com/68438230/164348103-0d9a112d-b95c-4bd3-ab9b-b498878fbbc0.mp4

# Run the app

Deployment for one part of the app, the flask server, is still being worked on. But with a docker file, it can be run anywhere without bugs, albert some time for installation. From the main directory:

```
cd flask-server
docker build -t flask-app .
docker run -p 8000:8000 flask-app
```

Then, the app can be tried at this link: https://crime-finder.herokuapp.com

# Test the development vesion
(This may no longer be necessary)

Some Docker files are incomplete. Follow these instructions:
1) Make sure that [docker](https://www.docker.com/) is installed on your computer. Then run the PostgreSQL database:
```
docker run --name postgresql -e POSTGRES_USER=[user] -e POSTGRES_PASSWORD=[password] -p 5432:5432 -d postgres:latest
```

2) The flask server can be run with the docker file. From the main directory:
```
cd flask-server
docker build -t flask-app .
docker run -p 8000:8000 flask-app
```

3) Since the React app can be run on the .NET kestrel server, install the latest version of [.NET 6](https://dotnet.microsoft.com/en-us/download) and run:
```
cd API
dotnet run
```

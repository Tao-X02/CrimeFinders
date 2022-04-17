FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Copy everything else
COPY ./API ./
COPY ./Application ./
COPY ./Domain ./
COPY ./Infrastructure ./
COPY ./Persistence ./

# Restore as distinct layers
COPY API/API.csproj ./
COPY Application/Application.csproj ./
COPY Domain/Domain.csproj ./
COPY Infrastructure/Infrastructure.csproj ./
COPY Persistence/Persistence.csproj ./

RUN dotnet restore API.csproj

# Build and publish a release
RUN dotnet publish API.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "API.dll"]

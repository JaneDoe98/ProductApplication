# Installation

1. Clone the repository:
```
    git clone https://github.com/JaneDoe98/ProductApplication
```
2. Change directory to ProductApplication/ProductAPI
```
    cd ProductApplication/ProductAPI
```

3. Restore dependecies:
```
    dotnet restore ProductAPI.sln
```

4. Change directory to ProductApplication/ProductUI:
```
    cd ../ProductUI
```

5. Install npm packages:
```
    npm install
```

6. Open ProductAPI.sln file with Visual Studio and run the API (press 'F5'), a Swagger webpage should open.

7. Open ProductApplication/ProductUI folder in Visual Studio Code and run the application:
```
    ng serve
```
- the application should be available at http://localhost:4200/

  
The tests can be run from Visual Studio's Test Explorer for the WebAPI, and via the ```ng test``` command for the application.

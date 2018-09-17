# Bills-Paid
Simple application for keeping track of which bills you have paid and what's coming up

## Initial Setup
Navigate to the **angular** folder and run the following command:

`npm install`

## Running the Website
Navigate to the **angular** folder and run the following command:

`ng serve`

To view the application in a browser, navigate to port 4200.  http://localhost:4200 (for example)

## Running the API
In the root folder for the project, run Pyramid's pserve with the associated .ini launch file:

`pserve development.ini`

## Building the Docker container
`docker build -t bills-paid:latest .`

## Running the Docker container
`docker run -d -p 501:501 bills-paid`

_The -d flag will force your container to run in the background.  If omitted, your console will regurgitate the HTTP requests back to you_
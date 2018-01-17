# Bills-Paid
Simple application for keeping track of which bills you have paid and what's coming up

## Building the Docker container
`docker build -t bills-paid:latest .`

## Running the Docker container
`docker run -p 6543:6543 bills-paid`

_Use the -d flag to run the container in the background.  Otherwise, your console will regurgitate the HTTP requests back to you_

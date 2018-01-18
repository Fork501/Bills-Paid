# Bills-Paid
Simple application for keeping track of which bills you have paid and what's coming up

## Building the Docker container
`docker build -t bills-paid:latest .`

## Running the Docker container
`docker run -d -p 501:501 bills-paid`

_The -d flag will force your container to run in the background.  If omitted, your console will regurgitate the HTTP requests back to you_

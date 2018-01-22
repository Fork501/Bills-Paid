FROM ubuntu:17.10

RUN apt-get update -y && \
	apt-get install -y python-pip python-dev && \
    pip install --upgrade pip setuptools

# We copy this file first to leverage docker cache
COPY ./requirements.txt /Bills-Paid/requirements.txt

WORKDIR /Bills-Paid

RUN pip install -r requirements.txt

COPY . /Bills-Paid

RUN pip install -e /Bills-Paid

CMD pserve development.ini
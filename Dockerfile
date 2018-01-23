FROM alpine

RUN apk update && \
	apk add python-dev py-pip && \
	pip install --upgrade pip setuptools

# We copy this file first to leverage docker cache
COPY ./requirements.txt /Bills-Paid/requirements.txt

WORKDIR /Bills-Paid

RUN pip install -r requirements.txt

COPY . /Bills-Paid

RUN pip install -e /Bills-Paid

CMD pserve development.ini
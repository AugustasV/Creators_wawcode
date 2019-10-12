FROM python:3.7-slim
ENV PYTHONUNBUFFERED 1
RUN mkdir /wawcode_docker
WORKDIR /wawcode_docker
COPY requirements.txt /wawcode_docker
RUN pip install -r requirements.txt
COPY . /wawcode_docker
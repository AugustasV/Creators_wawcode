FROM python:3-alpine
ENV PYTHONUNBUFFERED 1
RUN mkdir /wawcode_docker
WORKDIR /wawcode_docker
COPY requirements.txt /wawcode_docker
RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
 python3 -m pip install -r requirements.txt --no-cache-dir && \
 apk --purge del .build-deps
COPY . /wawcode_docker
FROM alpine:latest

RUN apk --update add exiftool && rm -rf /var/cache/apk/*

VOLUME /tmp

WORKDIR /tmp

ENTRYPOINT ["exiftool"]

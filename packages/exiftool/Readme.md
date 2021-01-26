## Build container

```shell
$ docker build -t exiftool .
```

## Run container

```shell
$ docker run -v "$PWD":/tmp exiftool <image>
```

## Optionally create alias

You might want to alias the above command to the `exiftool` command, so you can simply do:

```shell
$ exiftool <image>
```

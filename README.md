# ssl-keygen-lambda

## start
```bash
docker run --rm -v "$(pwd)/task":/var/task lambci/lambda:nodejs8.10 index.handler '{"command": "async"}'
```

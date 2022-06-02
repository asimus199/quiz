docker rmi $(docker images --filter "dangling=true" -q --no-trunc)

docker build -t ukgp-web .;

docker rm -f "ukgp-web";

docker run \
    --name "ukgp-web" \
    -p 3000:3000 \
    -d \
    ukgp-web;

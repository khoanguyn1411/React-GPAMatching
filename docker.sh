REGISTRY=khoanguyen1411
REPO=gpa-matching-frontend
TAG=develop

IMAGE_NAME=${TAG}

run() {
    sudo sudo dockerd
}   
start() {
    sudo COMPOSE_DOCKER_CLI_BUILD=1 docker compose up -d --remove-orphans ${TAG}
}
stop() {
    CONTAINER=$(sudo docker ps -a -q --filter ancestor=${IMAGE_NAME} --format="{{.ID}}")
    if ! test -z "$CONTAINER"
    then
        sudo docker stop ${CONTAINER}
        sudo docker rm ${CONTAINER} 
    fi
}
destroy() {
    sudo docker rmi -f ${IMAGE_NAME}
}
reset() {
    IMAGE=$(sudo docker images -q ${IMAGE_NAME})
    if test ! -z "$IMAGE"
    then
        destroy
        start
    else 
        start
    fi
}
push(){
    IMAGE=$(sudo docker images -q ${IMAGE_NAME})
    if test ! -z "$IMAGE"
    then
        sudo docker push ${IMAGE_NAME}
    else
        start
        sudo docker push ${IMAGE_NAME}
    fi
}
repush(){
    destroy
    start
    push
}

$@
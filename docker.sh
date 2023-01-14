IMAGE_NAME=khoanguyen1411/gpa-matching-frontend:release

run() {
    sudo sudo dockerd
}
start() {
    sudo COMPOSE_DOCKER_CLI_BUILD=1 docker compose up -d
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
    destroy
    start
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

$@
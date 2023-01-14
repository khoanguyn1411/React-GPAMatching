IMAGE_NAME=gpa-matching-frontend-reactjs

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

$@
const createUser = (request, response) => {
    response.send(request.body);
};

module.exports = createUser;

const admin = require('firebase-admin')
const createUser = (request, response) => {
    // verify user provided a phone
    if (!request.body.phone) {
        return response.status(422).send({ error: 'Bad Input' });
    }
    
    // format the phone number to remove dashes and parens
    const phone = String(request.body.phone).replace(/[^\d]/g, "");

    // create a new user account using that phone number
    admin.auth().createUser({ uid: phone })
        .then(user => response.send(user))
        .catch(error => response.status(422).send({ error }));

    // respond to the user request, saying the account was made

};

module.exports = createUser;
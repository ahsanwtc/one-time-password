const admin = require('firebase-admin');

module.exports = (req, res) => {
    if (!req.body.phone || !req.body.code) {
        return res.status(422).send({ error: 'Phone and code must be provided' });
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    const code = parseInt(req.body.code);
    console.log("code", code);
    console.log("phone", phone);

    admin.auth().getUser(phone)
        .then(() => {
            const ref = admin.database().ref(`users/${phone}`);
            ref.once('value', snapshot => {
                console.log("snapshot", snapshot);                
                const user = snapshot.val();
                console.log(user);
                console.log("code", code);
                console.log("user code", user.code);
                if (user.code !== code || !user.codeValid) {
                    return res.status(422).send({ error: 'Code not valid' });
                }
                
                ref.update({ codeValid: false });
                admin.auth().createCustomToken(phone)
                    .then(token => res.send({ token }));
            });
        })
        .catch(error => {
            return res.status(422).send({ error });
        });

}
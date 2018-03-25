const admin = require('firebase-admin');
const twilio = require('./twilio');
const settings = require('./settings.json');

module.exports = (req, res) => {
    if (!req.body.phone) {
        return res.status(422).send({ err: "You must provide a phone number" });
    }

    console.log(`phone before: ${req.body.phone}`);
    const phone = String(req.body.phone).replace(/[^\d]/g, "");
    console.log(`phone after: ${phone}`);    

    admin.auth().getUser(phone)
        .then(response => {
            const code = Math.floor((Math.random() * 8999 + 1000));
            sendSMS({                
                to: phone,
                from: settings.twilio.phone,
                body: `Your code is ${code}`
            }).then(() => {
                console.log("saving code ", code);                
                admin.database().ref('users/' + phone)
                    .update({ code, codeValid: true }, () => {
                        return res.send({ success: true });
                    });
            })
            .catch(error => {
                return res.status(422).send({ error });
            });           
        })
        .catch(error => {
            return res.status(422).send({ error });
        });

}

const sendSMS = options => {
    return new Promise((resolve, reject) => {
      twilio.messages.create(options, error => {
        return error ? reject(error) : resolve();
      });
    });
}
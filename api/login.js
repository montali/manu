module.exports = (req, res) => {
  const admin = require("firebase-admin");
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(
          Buffer.from(process.env.GCLOUD_CREDENTIALS, "base64").toString()
        )
      ),
    });
  }
  let db = admin.firestore();
  db.collection("admin")
    .doc(req.body.username)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        res.status(401).send();
      } else {
        const user = doc.data();
        if (user.password == req.body.password) res.status(200).send();
        else res.status(401).send();
      }
    });
};

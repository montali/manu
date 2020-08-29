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
  console.log(req.query.delivered);
  let db = admin.firestore();
  let dbRef = db.collection("table");

  let query = dbRef
    .get()
    .then((snapshot) => {
      let response = [];
      snapshot.forEach((doc) => {
        response.push(doc.data());
      });
      res.status(200).json(response);
      return;
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

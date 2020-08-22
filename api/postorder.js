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
  req.body.delivered = false;
  req.body.datetime = admin.firestore.Timestamp.fromDate(new Date());

  let addDoc = db
    .collection("order")
    .add(req.body)
    .then((ref) => {
      res.status(200).json();
    });
};

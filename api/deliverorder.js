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
  db.collection("order")
    .doc(req.body.uuid)
    .update({ delivered: true })
    .then((ref) => {
      res.status(200).json();
    });
};

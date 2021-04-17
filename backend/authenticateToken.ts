var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gems-website-30276-default-rtdb.firebaseio.com",
});

async function decodeIDToken(req, res, next) {
  const header = req.headers?.authorization;
  if (
    header !== "Bearer null" &&
    req.headers?.authorization?.startsWith("Bearer ")
  ) {
    const idToken = req.headers.authorization.split("Bearer ")[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req["currentUser"] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }
  next();
}
module.exports = decodeIDToken;

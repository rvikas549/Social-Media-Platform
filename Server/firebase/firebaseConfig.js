
import admin from 'firebase-admin';
import serviceAccount from '../petgram-firebase.js'; 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;

// import admin from 'firebase-admin';
// import { readFile } from 'fs/promises';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // To handle __dirname in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load your service account JSON securely
// const serviceAccountPath = path.join(__dirname, '../petgram-firebase.js');
// const serviceAccount = JSON.parse(await readFile(serviceAccountPath, 'utf-8'));

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }

// export default admin;

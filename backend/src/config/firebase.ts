import * as admin from 'firebase-admin';

let firebaseInitialized = false;

try {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT || '{}';
  
  // Replace escaped newlines with actual newlines
  const serviceAccount = JSON.parse(
    serviceAccountJson.replace(/\\n/g, '\n')
  );

  // Only initialize if we have the required fields
  if (serviceAccount.project_id && serviceAccount.private_key) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    }
    firebaseInitialized = true;
  }
} catch (error) {
  console.warn('Firebase Admin SDK not fully initialized. Google login verification will be limited.');
}

export { admin, firebaseInitialized };

import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { AuthProvider, FirestoreProvider, useFirebaseApp } from "reactfire"

export interface FirebaseComponentsProviderProps {
  children: React.ReactNode
}

export default ({ children }: FirebaseComponentsProviderProps) => {
  const app = useFirebaseApp()

  const auth = getAuth(app)
  auth.useDeviceLanguage()

  const firestore = getFirestore(app)

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>
    </AuthProvider>
  )
}

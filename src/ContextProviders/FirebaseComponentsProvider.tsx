import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import {
  AnalyticsProvider,
  AuthProvider,
  FirestoreProvider,
  useFirebaseApp,
  useInitPerformance,
} from "reactfire"
import { getAnalytics } from "firebase/analytics"

export interface FirebaseComponentsProviderProps {
  children: React.ReactNode
}

export default ({ children }: FirebaseComponentsProviderProps) => {
  const app = useFirebaseApp()

  const auth = getAuth(app)
  auth.useDeviceLanguage()

  const firestore = getFirestore(app)
  const analytics = getAnalytics(app)

  useInitPerformance(async (firebaseApp) => {
    const { getPerformance } = await import("firebase/performance")
    return getPerformance(firebaseApp)
  })

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <AnalyticsProvider sdk={analytics}>{children}</AnalyticsProvider>
      </FirestoreProvider>
    </AuthProvider>
  )
}

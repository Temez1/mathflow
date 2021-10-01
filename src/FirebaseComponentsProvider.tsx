import { getAuth } from "firebase/auth"
import { AuthProvider, useFirebaseApp } from "reactfire"

export interface FirebaseComponentsProviderProps {
  children: React.ReactNode
}

export default ({ children }: FirebaseComponentsProviderProps) => {
  const app = useFirebaseApp()

  const auth = getAuth(app)
  auth.useDeviceLanguage()

  return <AuthProvider sdk={auth}>{children}</AuthProvider>
}

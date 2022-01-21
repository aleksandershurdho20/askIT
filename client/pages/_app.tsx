import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../context/auth'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const authRoutes = ['/register', '/login']
  const authRoute = authRoutes.includes(pathname)
  return (
    <AuthProvider>
      {!authRoute && <Navbar />}

      <Component {...pageProps} />
      <Toaster />
    </AuthProvider>
  )
}

export default MyApp

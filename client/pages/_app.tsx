import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../context/auth'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar';
// import 'tailwindcss/tailwind.css'
import { SWRConfig } from 'swr'
import Axios from 'axios'
import { apiInstance } from '../utils/apiInstance';
function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const authRoutes = ['/register', '/login']
  const authRoute = authRoutes.includes(pathname)
  return (
    <SWRConfig
      value={{
        fetcher: (url) => apiInstance.get(url).then(res => res.data),
        dedupingInterval: 10000
      }}

    >
      <AuthProvider>
        {!authRoute && <Navbar />}
        <div className={authRoute ? '' : 'pt-12'}>
          <Component {...pageProps} />

        </div>
        <Toaster />
      </AuthProvider>

    </SWRConfig>
  )
}

export default MyApp

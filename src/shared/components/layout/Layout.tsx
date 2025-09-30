import { memo, useCallback, useMemo, ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useWishlist } from '@/ApplicationLayer/providers/WishlistProvider'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode
}

export const Layout = memo<LayoutProps>(({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { totalMovies } = useWishlist()

  const getCurrentView = useCallback((): "home" | "detail" | "wishlist" => {
    if (location.pathname === '/') return 'home'
    if (location.pathname === '/favorites') return 'wishlist'
    if (location.pathname.startsWith('/movie/')) return 'detail'
    return 'home'
  }, [location.pathname])

  const handleHomeClick = useCallback(() => {
    navigate('/')
  }, [navigate])

  const handleWishListClick = useCallback(() => {
    navigate('/favorites')
  }, [navigate])

  const currentView = useMemo(() => getCurrentView(), [getCurrentView])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onHomeClick={handleHomeClick}
        onWishListClick={handleWishListClick}
        wishListCount={totalMovies}
        currentView={currentView}
      />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
})
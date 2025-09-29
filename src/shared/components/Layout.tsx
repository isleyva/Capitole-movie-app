import React, { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useWishlist } from '@/app/providers/WishlistProvider'
import { Header } from './Header'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { totalMovies } = useWishlist()

  const getCurrentView = useCallback((): "home" | "detail" | "wishlist" => {
    if (location.pathname === '/') return 'home'
    if (location.pathname === '/wishlist') return 'wishlist'
    if (location.pathname.startsWith('/film/')) return 'detail'
    return 'home'
  }, [location.pathname])

  const handleHomeClick = useCallback(() => {
    navigate('/')
  }, [navigate])

  const handleWishListClick = useCallback(() => {
    navigate('/wishlist')
  }, [navigate])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onHomeClick={handleHomeClick}
        onWishListClick={handleWishListClick}
        wishListCount={totalMovies}
        currentView={getCurrentView()}
      />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
import React from 'react'
import { Header } from './Header'

interface LayoutProps {
  children: React.ReactNode
  onHomeClick: () => void
  onWishListClick: () => void
  wishListCount: number
  currentView: "home" | "detail" | "wishlist"
}

export function Layout({ 
  children, 
  onHomeClick, 
  onWishListClick, 
  wishListCount, 
  currentView 
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onHomeClick={onHomeClick}
        onWishListClick={onWishListClick}
        wishListCount={wishListCount}
        currentView={currentView}
      />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
import { Movie } from '@/shared/types/commonTypes';
import { createContext, useContext, useReducer, useEffect, useCallback, useMemo, ReactNode } from 'react'


// Wishlist state and actions
interface WishlistState {
  movies: Movie[]
  isLoading: boolean
}

type WishlistAction = 
  | { type: 'ADD_MOVIE'; payload: Movie }
  | { type: 'REMOVE_MOVIE'; payload: number }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: Movie[] }
  | { type: 'SET_LOADING'; payload: boolean }

// Reducer
function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_MOVIE':
      // Don't add if already exists
      if (state.movies.some(movie => movie.id === action.payload.id)) {
        return state
      }
      return {
        ...state,
        movies: [...state.movies, action.payload]
      }
    
    case 'REMOVE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter(movie => movie.id !== action.payload)
      }
    
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        movies: []
      }
    
    case 'LOAD_WISHLIST':
      return {
        ...state,
        movies: action.payload,
        isLoading: false
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    
    default:
      return state
  }
}

// Context type
interface WishlistContextType {
  movies: Movie[]
  isLoading: boolean
  addMovie: (movie: Movie) => void
  removeMovie: (movieId: number) => void
  clearWishlist: () => void
  isInWishlist: (movieId: number) => boolean
  totalMovies: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

interface WishlistProviderProps {
  children: ReactNode
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    movies: [],
    isLoading: true
  })

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('movie-wishlist')
      if (savedWishlist) {
        const movies = JSON.parse(savedWishlist)
        dispatch({ type: 'LOAD_WISHLIST', payload: movies })
      } else {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    } catch (error) {
      console.error('Error loading wishlist:', error)
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  // Save to localStorage whenever movies change
  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem('movie-wishlist', JSON.stringify(state.movies))
    }
  }, [state.movies, state.isLoading])

  // Actions memoized
  const addMovie = useCallback((movie: Movie) => {
    dispatch({ type: 'ADD_MOVIE', payload: movie })
  }, [])

  const removeMovie = useCallback((movieId: number) => {
    dispatch({ type: 'REMOVE_MOVIE', payload: movieId })
  }, [])

  const clearWishlist = useCallback(() => {
    dispatch({ type: 'CLEAR_WISHLIST' })
  }, [])

  const isInWishlist = useCallback((movieId: number) => {
    return state.movies.some(movie => movie.id === movieId)
  }, [state.movies])

  const value: WishlistContextType = useMemo(() => ({
    movies: state.movies,
    isLoading: state.isLoading,
    addMovie,
    removeMovie,
    clearWishlist,
    isInWishlist,
    totalMovies: state.movies.length
  }), [state.movies, state.isLoading, addMovie, removeMovie, clearWishlist, isInWishlist])

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

// Custom hook
export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
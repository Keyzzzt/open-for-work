import { render, screen } from '@testing-library/react'
import LandingPage from '@/app/(public)/page'

describe('HomePage', () => {
  it('Should have "Shop Collection" text', () => {
    render(<LandingPage />)

    const myElem = screen.getByText('Shop Collection')

    expect(myElem).toBeInTheDocument()
  })
})

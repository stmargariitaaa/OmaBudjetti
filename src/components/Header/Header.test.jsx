import { render, screen } from '@testing-library/react'
import Header from './Header.jsx'

// Kuvataan testikokonaisuus (test suite) nimellä "Header".
describe('Header', () => {

  // Yksittäinen testitapaus: tarkistetaan että komponentti
  // renderöityy oikein.
  test('Komponentti renderöityy tekstillä', () => {
    render(<Header />)
    const header = screen.getByRole('heading', {name: /oma\s*budjetti/i })
    expect(header).toBeInTheDocument()
  })

})

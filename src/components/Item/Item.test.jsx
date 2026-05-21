import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import Item from './Item.jsx'

describe('Item', () => {
  test('Komponentti renderöityy merkinnän tiedoilla', () => {

    // Määritellään merkinnän tiedot.
    const data = {
      id:          "1",
      type:        "Sähkö",
      amount:      437.50,
      paymentDate: "2026-04-07",
      periodStart: "2026-01-01",
      periodEnd:   "2026-03-31",
      receiver:    "Caruna Oy"
    }

    // Renderöidään komponentti.
    render(<Item data={data} />, {wrapper: BrowserRouter})

    // Määritetään lokaaliasetukset.
    const locale = "fi-FI"

    // Luodaan NumberFormat-olio euromääräisten summien esittämiseen.
    const numberFormat = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR'
    })

    // Tarkistetaan, että tyyppi näkyy käyttöliittymässä.
    const typeElement = screen.getByText(data.type)
    expect(typeElement).toBeInTheDocument()

    // Tarkistetaan, että maksupäivä näkyy käyttöliittymässä.
    const paymentDate = new Date(data.paymentDate).toLocaleDateString(locale)
    const dateElement = screen.getByText(paymentDate)
    expect(dateElement).toBeInTheDocument() 

    // Tarkistetaan, että maksettu summa näkyy käyttöliittymässä.
    const amount = numberFormat.format(data.amount)
    const amountElement = screen.getByText((content, element) => {
      return element.textContent.replace(/\s+/g, ' ') === amount.replace(/\s+/g, ' ')
    })
    expect(amountElement).toBeInTheDocument()

    // Tarkistetaan, että saaja näkyy käyttöliittymässä.
    const receiverElement = screen.getByText(data.receiver)
    expect(receiverElement).toBeInTheDocument()

  })
})

import Item from '../components/Item'
import { MemoryRouter } from 'react-router'

export default {
  title: 'Components/Item',
  component: Item,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  argTypes: {
    data: { control: 'object' },
  }
}

export const Default = { 
  args: {
    data: {
      id:          "1",
      type:        "Sähkö",
      amount:      437.50,
      paymentDate: "2026-04-07",
      periodStart: "2026-01-01",
      periodEnd:   "2026-03-31",
      receiver:    "Caruna Oy"      
    }
  }
}

export const OnlyRequiredData = {
  args: {
    data: {
      id:          "2",
      type:        "Puhelin",
      amount:      26.90,
      paymentDate: "2026-03-18",
      periodStart: "",
      periodEnd:   "",
      receiver:    "Elisa"
    }
  }  
}
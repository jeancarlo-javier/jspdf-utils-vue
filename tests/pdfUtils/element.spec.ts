import { describe, it, beforeEach } from 'vitest'
import jsPDF from 'jspdf'

describe('Global Utilities', () => {
  let doc: jsPDF

  beforeEach(() => {
    doc = new jsPDF({
      filters: ['ASCIIHexEncode'],
      orientation: 'portrait',
      format: 'A4',
      unit: 'px'
    })
  })

  describe('', () => {
    it('', () => {})
  })
})

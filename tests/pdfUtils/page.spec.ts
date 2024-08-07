import { describe, it, expect, beforeEach } from 'vitest'
import { getDocHeight, detectPageBreak } from '@/utils/pdfUtils'
import BlockContext from '@/types/blockContext'
import { jsPDF } from 'jspdf'

describe('Page Break Detection', () => {
  let doc: jsPDF

  beforeEach(() => {
    doc = new jsPDF({
      filters: ['ASCIIHexEncode'],
      orientation: 'portrait',
      format: 'A4',
      unit: 'px'
    })
  })
  it('detectPageBreak returns true if the currentYPosition is greater than the maxPageHeight', () => {
    const blockContext = new BlockContext({ cursorYPosition: getDocHeight(doc) + 10 })
    const pageBreak = detectPageBreak(doc, blockContext, 1)
    expect(pageBreak).toBe(true)
  })

  it('detectPageBreak returns false if the currentYPosition is less than the maxPageHeight', () => {
    const blockContext = new BlockContext({ cursorYPosition: getDocHeight(doc) - 10 })
    const pageBreak = detectPageBreak(doc, blockContext, 1)
    expect(pageBreak).toBe(false)
  })
})

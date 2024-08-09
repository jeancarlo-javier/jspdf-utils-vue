import { describe, it, expect, beforeEach } from 'vitest'
import { getDocHeight, checkIfElementFitsPage } from '@/utils/pdfUtils'
import PageContext from '@/types/pageContext'
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

  describe('detectPageBreak', () => {
    it('returns true if the currentYPosition is greater than the maxPageHeight', () => {
      const blockContext = new BlockContext({ cursorYPosition: getDocHeight(doc) + 10 })
      const pageBreak = checkIfElementFitsPage(doc, blockContext, 1)
      expect(pageBreak).toBe(true)
    })

    it('returns false if the currentYPosition is less than the maxPageHeight', () => {
      const blockContext = new BlockContext({ cursorYPosition: getDocHeight(doc) - 10 })
      const pageBreak = checkIfElementFitsPage(doc, blockContext, 1)
      expect(pageBreak).toBe(false)
    })

    it('returns false if the element fits the page', () => {
      const blockContext = new BlockContext({
        pageContext: new PageContext(),
        cursorYPosition: 10
      })

      const elementHeight = 10
      const shouldBreak = checkIfElementFitsPage(doc, blockContext, elementHeight)

      expect(shouldBreak).toBe(false)
    })

    it('returns true if the element does not fit the page', () => {
      const blockContext = new BlockContext({
        pageContext: new PageContext(),
        cursorYPosition: getDocHeight(doc)
      })

      const elementHeight = 10
      const shouldBreak = checkIfElementFitsPage(doc, blockContext, elementHeight)

      expect(shouldBreak).toBe(true)
    })
  })
})

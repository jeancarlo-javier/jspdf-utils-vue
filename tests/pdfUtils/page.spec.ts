import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getDocHeight, checkIfElementFitsPage, addPage } from '@/utils/pdfUtils'
import PageContext from '@/types/pageContext'
import BlockContext from '@/types/blockContext'
import type { PageContextBase } from '@/types/pdfUtils.types'
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
    it('returns true when the current cursor Y position exceeds the maximum page height', () => {
      const blockContext = new BlockContext({ cursorYPosition: getDocHeight(doc) + 10 })
      const pageBreak = checkIfElementFitsPage(doc, blockContext, 1)
      expect(pageBreak).toBe(true)
    })

    it('returns false when the current cursor Y position is below the maximum page height', () => {
      const blockContext = new BlockContext({ cursorYPosition: getDocHeight(doc) - 10 })
      const pageBreak = checkIfElementFitsPage(doc, blockContext, 1)
      expect(pageBreak).toBe(false)
    })

    it('returns false when the element height allows it to fit within the current page', () => {
      const blockContext = new BlockContext({
        pageContext: new PageContext(),
        cursorYPosition: 10
      })
      const elementHeight = 10
      const shouldBreak = checkIfElementFitsPage(doc, blockContext, elementHeight)
      expect(shouldBreak).toBe(false)
    })

    it('returns true when the element height causes it to exceed the current page height', () => {
      const blockContext = new BlockContext({
        pageContext: new PageContext(),
        cursorYPosition: getDocHeight(doc)
      })
      const elementHeight = 10
      const shouldBreak = checkIfElementFitsPage(doc, blockContext, elementHeight)
      expect(shouldBreak).toBe(true)
    })
  })

  describe('addPage', () => {
    it('adds a new page to the document', () => {
      const pageContext: PageContextBase = { numberOfPages: 0, addPage: vi.fn() }
      const blockContext = new BlockContext({ pageContext })
      addPage(doc, blockContext)
      expect(pageContext.addPage).toHaveBeenCalledOnce()
    })

    it('resets the blockContext cursorYPosition to 0 after adding a new page', () => {
      const pageContext: PageContextBase = { numberOfPages: 0, addPage: vi.fn() }
      const blockContext = new BlockContext({ cursorYPosition: 100, pageContext })
      addPage(doc, blockContext)
      expect(blockContext.cursorYPosition).toBe(0)
    })
  })
})

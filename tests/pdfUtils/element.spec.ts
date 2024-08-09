import { describe, it, beforeEach, expect } from 'vitest'
import { getMaxTextWidth } from '@/utils/pdfUtils'
import BlockContext from '@/types/blockContext'
import PageContext from '@/types/pageContext'
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

  // TODO: Replace getMaxTextWidth with getMaxElementWidth
  describe('getMaxTextWidth', () => {
    it('calculates max text width with default options', () => {
      const blockContext = new BlockContext()
      const maxWidth = getMaxTextWidth(0, doc.internal.pageSize.getWidth(), blockContext)
      expect(maxWidth).toBe(doc.internal.pageSize.getWidth())
    })

    it('calculates max text width with specified maxWidth', () => {
      const blockContext = new BlockContext()
      const maxWidth = getMaxTextWidth(100, doc.internal.pageSize.getWidth(), blockContext)
      expect(maxWidth).toBe(100)
    })

    it('calculates max text width with blockContext horizontal padding', () => {
      const blockContext = new BlockContext({ paddingHorizontal: 10 })
      const maxWidth = getMaxTextWidth(0, doc.internal.pageSize.getWidth(), blockContext)
      expect(maxWidth).toBe(
        doc.internal.pageSize.getWidth() - blockContext.paddingHorizontal * 2
      )
    })

    it('calculates max text width with pageContext horizontal padding', () => {
      const pageContext = new PageContext({ paddingHorizontal: 10 })
      const blockContext = new BlockContext({ pageContext })
      const maxWidth = getMaxTextWidth(0, doc.internal.pageSize.getWidth(), blockContext)
      expect(maxWidth).toBe(doc.internal.pageSize.getWidth() - 10 * 2)
    })
  })
})

<template>
  <div class="pdf-viewer">
    <div ref="pdfViewer" class="pdf-viewer-container"></div>
    <div
      :style="{
        // scale: 0.5
      }"
    >
      <VuePdfEmbed :source="pdfBase64" :width="550" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { jsPDF } from 'jspdf'
import { ref, onMounted } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'
import pdfElements from '../utils/pdfElements'
import { BlockContext } from '../types/pdfUtils.types'

const pdfViewer = ref<HTMLDivElement>()
const pdfBase64 = ref<string>()

onMounted(() => {
  const doc = new jsPDF({
    filters: ['ASCIIHexEncode'],
    // A4
    orientation: 'portrait',
    format: 'A4'
    // unit: 'pt'
  })

  const blockContext1 = new BlockContext({
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    maxWidth: 100
    // y: 30
  })

  pdfElements.addText(doc, blockContext1, 'Jeancarlo Javier', {
    fontSize: 25,
    marginBottom: 2
    // x: 10,
    // textCenter: true
  })

  const blockContext2 = new BlockContext({
    x: 100,
    maxWidth: 100
  })

  pdfElements.addText(doc, blockContext2, 'Jeancarlo Javier', {
    fontSize: 25
  })

  pdfElements.addText(
    doc,
    blockContext2,
    'Lorem ipsum dolor sit amet consectetur adipiscing elit condimentum.',
    {
      fontSize: 15
    }
  )

  const blockContext3 = new BlockContext({
    x: 100,
    y: 100,
    maxWidth: 100,
    cursorYPosition:
      blockContext1.cursorYPosition > blockContext2.cursorYPosition
        ? blockContext1.cursorYPosition
        : blockContext2.cursorYPosition
  })

  pdfElements.addLine(doc, blockContext3, {
    y: 100
    // marginBottom: 2
  })

  const blob = doc.output('blob')

  // Convertir el blob a base64
  const reader = new FileReader()
  reader.readAsDataURL(blob)

  if (reader) {
    reader.onloadend = () => {
      if (reader.result) {
        const base64data = (reader.result as string).split(',')[1] // Remover el encabezado de la URL de datos

        pdfBase64.value = `data:application/pdf;base64,${base64data}`
      }
    }
  }

  // show the generated PDF in the browser

  // doc.save('hello.pdf')
})
</script>

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

  // const docContext = {}

  const blockContext1 = new BlockContext({
    id: 'header',
    // maxWidth: 200,
    paddingVertical: 10
  })

  pdfElements.addLine(doc, blockContext1, {
    marginBottom: 5
  })
  pdfElements.addText(doc, blockContext1, 'Jeancarlo Javier Quintana Centeno', {
    fontSize: 25,
    textCenter: true,
    textAlign: 'center'
  })
  pdfElements.addLine(doc, blockContext1, {
    marginTop: 5
  })

  const blockContext2 = new BlockContext({
    cursorYPosition: blockContext1.cursorYPosition
    // paddingHorizontal: 10
  })
  pdfElements.addText(
    doc,
    blockContext2,
    '44 Morningside Road. Edinburgh, Scotland EM10 4BF | IM: 07956 654323 1example-email@example.com',
    {
      fontSize: 10,
      textCenter: true,
      maxWidth: 200,
      textAlign: 'center'
    }
  )

  pdfElements.addLine(doc, blockContext2, {
    marginTop: 8
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

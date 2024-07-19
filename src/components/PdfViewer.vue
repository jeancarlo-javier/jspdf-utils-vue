<template>
  <div class="pdf-viewer">
    <div ref="pdfViewer" class="pdf-viewer-container"></div>
    <div
      :style="{
        scale: 0.5
      }"
    >
      <VuePdfEmbed :source="pdfBase64" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { jsPDF } from 'jspdf'
import { ref, onMounted } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'
import pdfElements from '../utils/pdfElements'
import type { blockContext } from '../types/pdfUtils.types'

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

  const blockContext: blockContext = {
    numberOfElements: 0,
    cursorYPosition: 0,
    docPadding: 10
    // maxWidth: 90
  }

  // Header
  pdfElements.addText(doc, blockContext, 'Jeancarlo Javier', {
    fontSize: 30,
    marginBottom: 3
  })

  pdfElements.addText(doc, blockContext, 'jeancarlojavier43@gmail.com', {
    fontSize: 15,
    marginBottom: 10
  })

  pdfElements.addText(doc, blockContext, 'Portfolio', {
    fontSize: 25,
    marginBottom: 5
  })

  pdfElements.addText(
    doc,
    blockContext,
    'Lorem ipsum dolor sit amet consectetur adipiscing elit penatibus feugiat cubilia etiam, semper purus lectus lacinia suscipit facilisi commodo praesent sodales torquent nec, vehicula mauris ante class magnis lobortis fusce a risus platea. Netus lacus felis porttitor facilisis curabitur, phasellus nisi fringilla eleifend cum, justo convallis inceptos tristique.',
    {
      fontSize: 16
    }
  )

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

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
import { ref, onMounted, watch } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'
import generateTemplate from '../templates/oxford-template'

const pdfViewer = ref<HTMLDivElement>()
const pdfBase64 = ref<string>()

const username = ref<string>('')

const wasUpdated = ref(false)

watch(username, () => {
  if (!wasUpdated.value) {
    wasUpdated.value = true
    setTimeout(() => {
      wasUpdated.value = false
    }, 1000)
  }
})

onMounted(async () => {
  const doc = new jsPDF({
    filters: ['ASCIIHexEncode'],
    orientation: 'portrait',
    format: 'A4',
    unit: 'px'
  })

  try {
    const { MontserratRegular, MontserratBold, MontserratSemibold } = await import('../../fonts/montserrat-fonts')

    doc.addFileToVFS('Montserrat-Regular.ttf', MontserratRegular)
    doc.addFont('Montserrat-Regular.ttf', 'Montserrat', 'normal', 400)

    doc.addFileToVFS('Montserrat-Bold.ttf', MontserratBold)
    doc.addFont('Montserrat-Bold.ttf', 'Montserrat', 'normal', 700)

    doc.addFileToVFS('Montserrat-Semibold.ttf', MontserratSemibold)
    doc.addFont('Montserrat-Semibold.ttf', 'Montserrat', 'normal', 600)

    generateTemplate(doc)

    const blob = doc.output('blob')

    const reader = new FileReader()
    reader.readAsDataURL(blob)

    reader.onloadend = () => {
      const base64data = reader.result?.split(',')[1] || ''
      pdfBase64.value = `data:application/pdf;base64,${base64data}`
    }

    // doc.save('cv-angela-latorre.pdf')
  } catch (error) {
    console.error('Error generating PDF:', error)
  }
})
</script>

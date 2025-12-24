import { jsPDF } from 'jspdf'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read and parse the TypeScript data file
const dataFilePath = path.join(__dirname, '..', 'src', 'app', 'data', 'resume.ts')
const dataContent = fs.readFileSync(dataFilePath, 'utf-8')

// Extract resumeData object from the TS file
const match = dataContent.match(/export const resumeData[^=]*=\s*({[\s\S]*?})\s*(?:;|\n\n|$)/)
if (!match) {
  console.error('Could not parse resume data from resume.ts')
  process.exit(1)
}

// Use eval to parse the object (safe here since we control the source file)
const resumeData = eval(`(${match[1]})`)

// Add contact info (not in the original data file)
const contact = {
  email: 'adrianperdomo@example.com',
  phone: '(555) 123-4567',
  location: 'South Florida, USA',
}

// Colors
const colors = {
  headerBg: [235, 241, 241], // #EBF1F1 - new light background
  logoDark: [42, 50, 53], // #2A3235 - logo color
  sidebarBg: [236, 230, 225], // #ECE6E1
  text: [28, 29, 32],
  textLight: [111, 112, 116],
  white: [255, 255, 255],
}

// Draw the R logo from SVG - exact paths from the SVG
function drawLogo(doc, x, y, size) {
  // Original viewBox is 435x436, scale to fit
  const scale = size / 436

  doc.setFillColor(...colors.logoDark)

  // Path 1 - R shape with curve (top part of letter R)
  // M99.5008 248 L119.001 216 H316.501 C330.001 211.5 344.501 202 344.501 181
  // C344.501 160 330.001 145.5 308.001 145.5 H237.501 V196.5 L204.001 148.5 V112.5
  // H316.501 C339.501 112.5 378.501 135 378.501 181 C378.501 227 336.501 248 316.501 248 H99.5008 Z
  doc.moveTo(x + 99.5 * scale, y + 248 * scale)
  doc.lineTo(x + 119 * scale, y + 216 * scale)
  doc.lineTo(x + 316.5 * scale, y + 216 * scale)
  // Approximate the curve C330.001 211.5 344.501 202 344.501 181
  doc.lineTo(x + 330 * scale, y + 211.5 * scale)
  doc.lineTo(x + 344.5 * scale, y + 202 * scale)
  doc.lineTo(x + 344.5 * scale, y + 181 * scale)
  // Approximate the curve C344.501 160 330.001 145.5 308.001 145.5
  doc.lineTo(x + 344.5 * scale, y + 160 * scale)
  doc.lineTo(x + 330 * scale, y + 145.5 * scale)
  doc.lineTo(x + 308 * scale, y + 145.5 * scale)
  doc.lineTo(x + 237.5 * scale, y + 145.5 * scale)
  doc.lineTo(x + 237.5 * scale, y + 196.5 * scale)
  doc.lineTo(x + 204 * scale, y + 148.5 * scale)
  doc.lineTo(x + 204 * scale, y + 112.5 * scale)
  doc.lineTo(x + 316.5 * scale, y + 112.5 * scale)
  // Approximate C339.501 112.5 378.501 135 378.501 181
  doc.lineTo(x + 339.5 * scale, y + 112.5 * scale)
  doc.lineTo(x + 378.5 * scale, y + 135 * scale)
  doc.lineTo(x + 378.5 * scale, y + 181 * scale)
  // Approximate C378.501 227 336.501 248 316.501 248
  doc.lineTo(x + 378.5 * scale, y + 227 * scale)
  doc.lineTo(x + 336.5 * scale, y + 248 * scale)
  doc.lineTo(x + 316.5 * scale, y + 248 * scale)
  doc.lineTo(x + 99.5 * scale, y + 248 * scale)
  doc.fill()

  // Path 2 - R leg (diagonal kick)
  // M269.001 259.5 H229.001 L271.501 323 H312.001 L269.001 259.5 Z
  doc.moveTo(x + 269 * scale, y + 259.5 * scale)
  doc.lineTo(x + 229 * scale, y + 259.5 * scale)
  doc.lineTo(x + 271.5 * scale, y + 323 * scale)
  doc.lineTo(x + 312 * scale, y + 323 * scale)
  doc.lineTo(x + 269 * scale, y + 259.5 * scale)
  doc.fill()

  // Path 3 - The circular ring with complex path
  // This is the outer ring with cutouts - simplified version
  doc.moveTo(x + 248.5 * scale, y + 404 * scale)
  doc.lineTo(x + 248.5 * scale, y + 433 * scale)
  // Approximate the curve to the right side
  doc.lineTo(x + 310.43 * scale, y + 425 * scale)
  doc.lineTo(x + 430.36 * scale, y + 361 * scale)
  doc.lineTo(x + 434.43 * scale, y + 223.5 * scale)
  doc.lineTo(x + 438.5 * scale, y + 86 * scale)
  doc.lineTo(x + 326.44 * scale, y + 0 * scale)
  doc.lineTo(x + 220 * scale, y + 0 * scale)
  doc.lineTo(x + 109.44 * scale, y + 0 * scale)
  doc.lineTo(x + 0 * scale, y + 81 * scale)
  doc.lineTo(x + 0 * scale, y + 223.5 * scale)
  doc.lineTo(x + 0 * scale, y + 336.5 * scale)
  doc.lineTo(x + 104.44 * scale, y + 444 * scale)
  doc.lineTo(x + 237.5 * scale, y + 435 * scale)
  doc.lineTo(x + 237.5 * scale, y + 292.5 * scale)
  doc.lineTo(x + 215 * scale, y + 259.5 * scale)
  doc.lineTo(x + 203 * scale, y + 259.5 * scale)
  doc.lineTo(x + 203 * scale, y + 313.5 * scale)
  doc.lineTo(x + 203.93 * scale, y + 406 * scale)
  doc.lineTo(x + 167.93 * scale, y + 404 * scale)
  doc.lineTo(x + 146.5 * scale, y + 393.84 * scale)
  doc.lineTo(x + 113 * scale, y + 374.5 * scale)
  doc.lineTo(x + 86.2 * scale, y + 359 * scale)
  doc.lineTo(x + 60.5 * scale, y + 322.72 * scale)
  doc.lineTo(x + 51 * scale, y + 306.5 * scale)
  doc.lineTo(x + 149 * scale, y + 147 * scale)
  doc.lineTo(x + 190 * scale, y + 205.5 * scale)
  doc.lineTo(x + 230.5 * scale, y + 205.5 * scale)
  doc.lineTo(x + 167 * scale, y + 112.5 * scale)
  doc.lineTo(x + 130.5 * scale, y + 112.5 * scale)
  doc.lineTo(x + 107.55 * scale, y + 149.5 * scale)
  doc.lineTo(x + 36.38 * scale, y + 266.82 * scale)
  doc.lineTo(x + 35.93 * scale, y + 267.5 * scale)
  doc.lineTo(x + 32.27 * scale, y + 260.5 * scale)
  doc.lineTo(x + 28.93 * scale, y + 232.5 * scale)
  doc.lineTo(x + 26.61 * scale, y + 213 * scale)
  doc.lineTo(x + 27.93 * scale, y + 176.5 * scale)
  doc.lineTo(x + 43.5 * scale, y + 145.5 * scale)
  doc.lineTo(x + 49.2 * scale, y + 134.15 * scale)
  doc.lineTo(x + 91.44 * scale, y + 26.78 * scale)
  doc.lineTo(x + 220 * scale, y + 28.5 * scale)
  doc.lineTo(x + 332.43 * scale, y + 30 * scale)
  doc.lineTo(x + 406 * scale, y + 126.47 * scale)
  doc.lineTo(x + 406 * scale, y + 223.5 * scale)
  doc.lineTo(x + 406 * scale, y + 315 * scale)
  doc.lineTo(x + 322.94 * scale, y + 396 * scale)
  doc.lineTo(x + 248.5 * scale, y + 404 * scale)
  doc.fill()
}

// Draw contact icon (circle with icon inside)
// Icons match provided SVGs exactly - 26x26 viewBox scaled to 5mm
function drawContactIcon(doc, x, y, type) {
  const iconSize = 5 // 5mm diameter
  const radius = iconSize / 2
  const scale = iconSize / 26 // Scale from 26px viewBox to 5mm

  // Draw circle background (dark color)
  doc.setFillColor(...colors.logoDark)
  doc.circle(x + radius, y - radius + 1, radius, 'F')

  // Icon center position (center of the circle at 13,13 in SVG)
  const cx = x + radius
  const cy = y - radius + 1

  doc.setFillColor(...colors.white)
  doc.setDrawColor(...colors.white)

  if (type === 'email') {
    // Email SVG path: envelope shape
    // Original SVG coordinates (centered around 13,13):
    // Body: rect from (6.75, 8.5) to (19.25, 17.5) = 12.5 x 9
    // Flap: triangular from top corners to center
    const w = 12.5 * scale
    const h = 9 * scale
    const envTop = cy - h/2 + 0.5 * scale
    const envLeft = cx - w/2

    // Draw envelope body (filled rectangle)
    doc.setFillColor(...colors.white)
    doc.rect(envLeft, envTop, w, h, 'F')

    // Draw the V-shaped flap using dark lines on the white envelope
    doc.setDrawColor(...colors.logoDark)
    doc.setLineWidth(0.3)
    doc.line(envLeft, envTop, cx, cy + 1 * scale)
    doc.line(envLeft + w, envTop, cx, cy + 1 * scale)

  } else if (type === 'phone') {
    // Smartphone - rectangle with speaker line and home button dot
    doc.setFillColor(...colors.white)
    doc.setDrawColor(...colors.white)

    const phoneWidth = 1.6
    const phoneHeight = 2.6
    const phoneLeft = cx - phoneWidth / 2
    const phoneTop = cy - phoneHeight / 2

    // Phone body (rounded rectangle)
    doc.roundedRect(phoneLeft, phoneTop, phoneWidth, phoneHeight, 0.3, 0.3, 'F')

    // Speaker line at top (dark color)
    doc.setDrawColor(...colors.logoDark)
    doc.setLineWidth(0.25)
    const lineY = phoneTop + 0.45
    doc.line(cx - 0.35, lineY, cx + 0.35, lineY)

    // Home button dot at bottom (dark color)
    doc.setFillColor(...colors.logoDark)
    doc.circle(cx, phoneTop + phoneHeight - 0.45, 0.2, 'F')

  } else if (type === 'location') {
    // Location pin SVG: teardrop shape with hollow center
    // Path shows a pin with rounded top and pointed bottom
    const pinWidth = 8 * scale
    const pinHeight = 11 * scale
    const pinTop = cy - pinHeight/2 - 0.5 * scale
    const pinRadius = pinWidth / 2

    doc.setFillColor(...colors.white)

    // Draw the pin as a circle plus triangle
    // Top circle part
    doc.circle(cx, pinTop + pinRadius, pinRadius, 'F')

    // Triangle pointing down
    const triTop = pinTop + pinRadius - 0.5 * scale
    const triBottom = pinTop + pinHeight
    doc.moveTo(cx - pinRadius * 0.85, triTop + pinRadius * 0.5)
    doc.lineTo(cx, triBottom)
    doc.lineTo(cx + pinRadius * 0.85, triTop + pinRadius * 0.5)
    doc.fill()

    // Inner circle (hollow part) using dark color
    doc.setFillColor(...colors.logoDark)
    doc.circle(cx, pinTop + pinRadius, pinRadius * 0.4, 'F')
  }
}

function generatePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = 210
  const pageHeight = 297
  const sidebarWidth = 70
  const margin = 10
  const contentX = sidebarWidth + 10
  const contentWidth = pageWidth - contentX - margin

  let y = 0
  const headerHeight = 58

  // Sidebar background (full height, behind header)
  doc.setFillColor(...colors.sidebarBg)
  doc.rect(0, 0, sidebarWidth, pageHeight, 'F')

  // Header background with angled bottom edge (like the SVG)
  // SVG path: M 0 0 -> 999 0 -> 999 212.5 -> 333.5 212.5 -> 160.5 276 -> 0 217.5 -> 0 0
  // Scaled to PDF: width=210, height proportional
  doc.setFillColor(...colors.headerBg)
  const headerPoints = [
    [0, 0],
    [pageWidth, 0],
    [pageWidth, headerHeight],
    [sidebarWidth + 5, headerHeight],
    [sidebarWidth - 30, headerHeight + 17],
    [0, headerHeight + 5],
    [0, 0],
  ]
  doc.moveTo(headerPoints[0][0], headerPoints[0][1])
  for (let i = 1; i < headerPoints.length; i++) {
    doc.lineTo(headerPoints[i][0], headerPoints[i][1])
  }
  doc.fill()

  // Draw logo on left side of header
  drawLogo(doc, 5, 10, 55)

  // Name and title in header (dark text on light background)
  doc.setTextColor(...colors.logoDark)
  doc.setFontSize(28)
  doc.setFont('helvetica', 'normal')
  doc.setCharSpace(1.5)
  doc.text('Adrian Perdomo', contentX, 25)

  doc.setFontSize(12)
  doc.setCharSpace(2)
  doc.text('SOFTWARE ENGINEER', contentX, 33)
  doc.setCharSpace(0) // Reset for rest of document

  // Sidebar content (starts below the angled header)
  let sidebarY = 85

  // Contact Details section
  doc.setTextColor(...colors.text)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Contact Details', margin, sidebarY)
  sidebarY += 10

  const iconTextGap = 8 // Gap between icon and text

  // Email with icon
  drawContactIcon(doc, margin, sidebarY, 'email')
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...colors.textLight)
  doc.text(contact.email, margin + iconTextGap, sidebarY)
  sidebarY += 8

  // Phone with icon
  drawContactIcon(doc, margin, sidebarY, 'phone')
  doc.text(contact.phone, margin + iconTextGap, sidebarY)
  sidebarY += 8

  // Location with icon
  drawContactIcon(doc, margin, sidebarY, 'location')
  const locationLines = doc.splitTextToSize(contact.location, sidebarWidth - margin - iconTextGap - 2)
  doc.text(locationLines, margin + iconTextGap, sidebarY)
  sidebarY += locationLines.length * 5 + 10

  // Education section in sidebar
  doc.setTextColor(...colors.text)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Education', margin, sidebarY)
  sidebarY += 10

  const bulletX = margin + 1.5 // X position for bullet
  const lineX = margin + 1.5 // X position for vertical line
  const textIndent = margin + 6 // Text indentation after bullet/line

  doc.setFontSize(9)
  resumeData.education.forEach((edu) => {
    const startY = sidebarY

    // Draw bullet dot
    doc.setFillColor(...colors.text)
    doc.circle(bulletX, sidebarY - 1, 1.2, 'F')

    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...colors.text)
    const titleLines = doc.splitTextToSize(edu.title, sidebarWidth - textIndent - margin)
    doc.text(titleLines, textIndent, sidebarY)
    sidebarY += titleLines.length * 4 + 1

    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...colors.textLight)
    const instLines = doc.splitTextToSize(edu.institution, sidebarWidth - textIndent - margin)
    doc.text(instLines, textIndent, sidebarY)
    sidebarY += instLines.length * 4

    doc.text(edu.period, textIndent, sidebarY)

    // Draw vertical line from bullet to end of this education item
    doc.setDrawColor(...colors.textLight)
    doc.setLineWidth(0.3)
    doc.line(lineX, startY + 1, lineX, sidebarY + 2)

    sidebarY += 12
  })

  // Skills section in sidebar
  sidebarY += 5
  doc.setTextColor(...colors.text)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Skills', margin, sidebarY)
  sidebarY += 8

  // Draw skills as inline text separated by dots
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...colors.textLight)

  const dotRadius = 0.4
  const dotGap = 1.5 // gap before and after dot
  const maxWidth = sidebarWidth - margin * 2
  const lineHeight = 4

  let skillX = margin
  let skillY = sidebarY

  resumeData.skills.forEach((skill, index) => {
    const textWidth = doc.getTextWidth(skill)
    const isLast = index === resumeData.skills.length - 1
    const dotSpace = isLast ? 0 : dotGap * 2 + dotRadius * 2

    // Check if skill itself is wider than available space - wrap to new line first
    if (skillX !== margin && skillX + textWidth > margin + maxWidth) {
      skillX = margin
      skillY += lineHeight
    }

    // Draw skill text
    doc.text(skill, skillX, skillY)
    skillX += textWidth

    // Draw separator dot (except after last skill)
    if (!isLast) {
      // Check if dot fits, otherwise wrap
      if (skillX + dotSpace > margin + maxWidth) {
        skillX = margin
        skillY += lineHeight
      } else {
        skillX += dotGap
        doc.setFillColor(...colors.textLight)
        doc.circle(skillX + dotRadius, skillY - 1, dotRadius, 'F')
        skillX += dotRadius * 2 + dotGap
      }
    }
  })

  sidebarY = skillY + 10

  // Main content area
  y = 75

  // Summary section
  doc.setTextColor(...colors.text)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Summary', contentX, y)
  doc.setDrawColor(...colors.textLight)
  doc.setLineWidth(0.3)
  doc.line(contentX, y + 2, pageWidth - margin, y + 2)
  y += 10

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...colors.textLight)
  const summaryLines = doc.splitTextToSize(resumeData.about, contentWidth)
  doc.text(summaryLines, contentX, y)
  y += summaryLines.length * 4 + 10

  // Work Experience section
  doc.setTextColor(...colors.text)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Work Experience', contentX, y)
  doc.line(contentX, y + 2, pageWidth - margin, y + 2)
  y += 10

  resumeData.experience.forEach((exp) => {
    if (y > pageHeight - 40) {
      doc.addPage()
      y = 20
      doc.setFillColor(...colors.sidebarBg)
      doc.rect(0, 0, sidebarWidth, pageHeight, 'F')
    }

    // Handle spacer entries differently
    if (exp.isSpacer) {
      doc.setFontSize(9)
      doc.setFont('helvetica', 'italic')
      doc.setTextColor(...colors.textLight)
      doc.text(`${exp.title} • ${exp.period}`, contentX, y)
      y += 8
      return
    }

    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...colors.text)
    const titleText = `${exp.title}, ${exp.company}`
    const titleLines = doc.splitTextToSize(titleText, contentWidth)
    doc.text(titleLines, contentX, y)
    y += titleLines.length * 4 + 1

    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...colors.textLight)
    doc.text(exp.period, contentX, y)
    y += 6

    doc.setFontSize(9)
    const descLines = doc.splitTextToSize(`• ${exp.description}`, contentWidth)
    doc.text(descLines, contentX, y)
    y += descLines.length * 4 + 8
  })

  // References line
  y += 5
  doc.setFontSize(9)
  doc.setFont('helvetica', 'italic')
  doc.setTextColor(...colors.textLight)
  doc.text('References available upon request', contentX, y)

  // Save PDF
  const publicDir = path.join(__dirname, '..', 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  const pdfBuffer = doc.output('arraybuffer')
  fs.writeFileSync(path.join(publicDir, 'resume.pdf'), Buffer.from(pdfBuffer))

  console.log('✅ Resume PDF generated at public/resume.pdf')
}

generatePDF()

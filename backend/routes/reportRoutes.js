import express from "express";
import puppeteer from "puppeteer";

const router = express.Router();

router.post("/pdf", async (req, res) => {
  try {
    const { html } = req.body;

    if (!html) {
      return res.status(400).json({ error: "HTML content required" });
    }

    // Launch headless Chrome
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    // Set HTML content
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "30px", bottom: "40px", left: "20px", right: "20px" }
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdfBuffer.length,
      "Content-Disposition": "attachment; filename=Report.pdf"
    });

    return res.send(pdfBuffer);

  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ error: "PDF generation failed" });
  }
});

export default router;

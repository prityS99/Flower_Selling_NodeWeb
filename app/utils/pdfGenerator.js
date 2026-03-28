const PDFDocument = require('pdfkit');

const generateOrderPDF = (order, res) => {

  const doc = new PDFDocument();

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=order-${order._id}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(20).text("Flower Order Invoice", { align: "center" });

  doc.moveDown();

  doc.text(`Customer: ${order.user.name}`);
  doc.text(`Flower: ${order.flower.name}`);
  doc.text(`Quantity: ${order.quantity}`);
  doc.text(`Delivery Address: ${order.deliveryAddress}`);
  doc.text(`Delivery Date: ${order.deliveryDate}`);
  doc.text(`Price: ₹${order.totalPrice}`);

  doc.end();
};

module.exports = generateOrderPDF;
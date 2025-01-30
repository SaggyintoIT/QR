function downloadQRCode() {
    let qrCanvas = document.querySelector("#qrcode canvas");
    if (qrCanvas) {
      // Create a new canvas to combine text and QR code
      let combinedCanvas = document.createElement("canvas");
      let ctx = combinedCanvas.getContext("2d");
  
      // Set canvas size (adjust as needed)
      combinedCanvas.width = qrCanvas.width + 400;  // Adjust width to fit everything horizontally
      combinedCanvas.height = qrCanvas.height + 500; // Adjust height to fit the text and QR code
  
      // Set background color to white
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);
  
      // Set text style and color for the text
      ctx.fillStyle = "black"; // Set text color to black
      ctx.font = "24px Arial";
  
      // Add Merchant Name text
      ctx.fillText("Merchant Name: " + document.getElementById("merchantDisplay").innerText, qrCanvas.width + 20, 50);
  
      // Draw QR code below the Merchant Name (position it below the text)
      ctx.drawImage(qrCanvas, 160, 100); // Adjust QR code position to start after the merchant name
  
      // Add UPI ID text below the QR code
      ctx.fillText("UPI ID: " + document.getElementById("upiDisplay").innerText, qrCanvas.width + 10, qrCanvas.height + 150);
  
      // Add "Scan and pay with any BHIM UPI app" text
      ctx.font = "18px Arial";
      ctx.fillText("Scan and pay with any BHIM UPI app", qrCanvas.width + 10, qrCanvas.height + 200);
  
      // Load logos for GPay, Paytm, PhonePe, WhatsApp, and place them below the text
      let logos = [
        "https://www.indtechmark.com/images/Googlepay.svg",
        "https://www.indtechmark.com/images/paytm.svg",
        "https://www.indtechmark.com/images/phonepe.svg",
        "https://www.indtechmark.com/images/WhatsApp.svg",
      ];
  
      logos.forEach((logo, index) => {
        let img = new Image();
        img.crossOrigin = 'anonymous'; // Add this line
        img.onload = function() {
          ctx.drawImage(img, qrCanvas.width + 20 + (index * 60), qrCanvas.height + 220, 40, 40); // Adjust logo size and position
        };
        img.src = logo;
      });
  
      // Add footer text at the bottom
      ctx.font = "16px Arial";
      ctx.fillText("Create your own UPI QR code at www.zerogateway.com/upi", qrCanvas.width + 20, combinedCanvas.height - 80);
  
      // Add an upload icon or button below footer
      let uploadIcon = new Image();
      uploadIcon.crossOrigin = 'anonymous'; // Add this line
      uploadIcon.onload = function() {
        ctx.drawImage(uploadIcon, qrCanvas.width + 20, combinedCanvas.height - 150, 40, 40); // Adjust icon size and position
      };
      uploadIcon.src = "https://www.indtechmark.com/images/upload_icon.svg";  // Update the icon URL as per your requirement
  
      // Download the image when everything is drawn
      let downloadLink = document.createElement("a");
      downloadLink.href = combinedCanvas.toDataURL("image/png");
      downloadLink.download = "UPI_QR_Code_Layout.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      alert("Generate the QR Code first!");
    }
  }
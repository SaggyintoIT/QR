document.addEventListener("DOMContentLoaded", function () {
    const qrContainer = document.getElementById("qrcode");
    const payeeNameInput = document.getElementById("PayeeName");
    const paymentAddressInput = document.querySelector("#email");
    const transactionAmountInput = document.querySelector(
      'input[placeholder="₹ Enter Transaction Amount here... "]'
    );
    const descriptionInput = document.getElementById("Message");

    // Create initial QR code
    let qrCode = new QRCode(qrContainer, {
      text: "merchant@upi",
      width: 200,
      height: 200,
    });

    // Update QR code on user input
    function updateQRCode() {
      const payeeName = payeeNameInput.value.trim() || "Merchant";
      const paymentAddress = paymentAddressInput.value.trim() || "merchant@upi";
      const transactionAmount = transactionAmountInput.value.trim();
      const description = descriptionInput.value.trim();

      // Generate UPI URL format
      const upiURL = `upi://pay?pa=${paymentAddress}&pn=${payeeName}${
        transactionAmount ? `&am=${transactionAmount}` : ""
      }${description ? `&tn=${description}` : ""}`;

      // Clear and update QR code
      qrContainer.innerHTML = ""; // Clear the existing QR code
      qrCode = new QRCode(qrContainer, {
        text: upiURL,
        width: 200,
        height: 200,
      });
    }

    // Attach event listeners to inputs
    payeeNameInput.addEventListener("input", updateQRCode);
    paymentAddressInput.addEventListener("input", updateQRCode);
    transactionAmountInput.addEventListener("input", updateQRCode);
    descriptionInput.addEventListener("input", updateQRCode);

    // Add event listener for dynamic merchant name display
    const payeeInput = document.getElementById("PayeeName");
    const merchantNameDisplay = document.getElementById("MerchantNameDisplay");

    payeeInput.addEventListener("input", function () {
      if (payeeInput.value.trim() === "") {
        merchantNameDisplay.textContent = "Merchant Name"; // Default name
      } else {
        merchantNameDisplay.textContent = payeeInput.value; // Updated name
      }
    });

    // Add event listener for dynamic UPI ID display
    const upiInput = document.getElementById("email");
    const upiDisplay = document.querySelector(".px-3.w-100.pt-4 span");

    upiInput.addEventListener("input", function () {
      if (upiInput.value.trim() === "") {
        upiDisplay.textContent = "merchant@upi"; // Default UPI ID
      } else {
        upiDisplay.textContent = upiInput.value; // Updated UPI ID
      }
    });

    // Add event listener for QR code download using callback
    const downloadBtn = document.getElementById("download-qr");
    downloadBtn.addEventListener("click", function (event) {
      event.preventDefault();  // Prevent the default action (e.g., page refresh)

      // Ensure html2canvas is loaded and available
      if (typeof html2canvas !== "undefined") {
        html2canvas(qrContainer, {
          useCORS: true,  // Enable cross-origin resource sharing if required
          onrendered: function (canvas) {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "upi-qr-code.png";  // Filename of the image
            link.click();  // Trigger the download
          }
        });
      } else {
        console.error("html2canvas is not available.");
      }
    });
});

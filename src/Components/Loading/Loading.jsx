import React from "react";

const Loading = () => {
  const inlineStyles = `
    .loadingContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 50px;
      padding: 20px;
    }

    .dots {
      display: flex;
      gap: 8px; /* Space between dots */
    }

    .dot {
      width: 12px;
      height: 12px;
      background-color: #3498db; /* A nice blue color */
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out both;
    }

    .dot:nth-child(1) {
      animation-delay: -0.32s;
    }

    .dot:nth-child(2) {
      animation-delay: -0.16s;
    }

    .loadingText {
      margin-top: 20px;
      font-size: 1.1em;
      color: #555;
    }

    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0);
      } 40% {
        transform: scale(1.0);
      }
    }
  `;

  return (
    <div className="loadingContainer">
      <div className="dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <p className="loadingText">Loading, Please Wait</p>

      <style>{inlineStyles}</style>
    </div>
  );
};

export default Loading;

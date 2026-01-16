console.log("My INJECT!!!!!!!!!!!!!");
// browser.runtime.onMessage.addListener((message) => {
//   if (message.type === "SHOW_UNICODE_ISSUES") {
//     showModal(message.issues);
//   }
// });

// function showModal(issues) {
//   removeExistingModal();

//   const overlay = document.createElement("div");
//   overlay.id = "unicode-modal-overlay";

//   const modal = document.createElement("div");
//   modal.id = "unicode-modal";

//   const data =
//     issues.length === 0
//       ? `<div class="ok">✅ No se encontraron problemas</div>`
//       : issues
//           .map(
//             (i) => `
//                 <div class="issue">
//                   <code>${i.characterInfo.unicode}</code>
//                   <span>${i.characterInfo.description}</span>
//                   <small>${i.characterInfo.category}</small>
//                 </div>
//               `
//           )
//           .join("");

//   modal.innerHTML = `
//     <div class="header">
//       <strong>Unicode sospechoso detectado</strong>
//       <button id="unicode-modal-close">✕</button>
//     </div>

//     <div class="content">
//       ${data}
//     </div>
//   `;

//   overlay.appendChild(modal);
//   document.body.appendChild(overlay);

//   document
//     .getElementById("unicode-modal-close")
//     .addEventListener("click", removeExistingModal);
// }

// function removeExistingModal() {
//   document.getElementById("unicode-modal-overlay")?.remove();
// }
// const style = document.createElement("style");

// style.textContent = `
// #unicode-modal-overlay {
//   position: fixed;
//   inset: 0;
//   background: rgba(0,0,0,.4);
//   z-index: 999999;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// #unicode-modal {
//   background: #fff;
//   border-radius: 8px;
//   width: 420px;
//   max-height: 70vh;
//   overflow: auto;
//   font-family: system-ui, sans-serif;
//   box-shadow: 0 10px 30px rgba(0,0,0,.3);
// }

// #unicode-modal .header {
//   display: flex;
//   justify-content: space-between;
//   padding: 12px;
//   border-bottom: 1px solid #eee;
// }

// #unicode-modal .content {
//   padding: 12px;
// }

// #unicode-modal .issue {
//   padding: 6px 0;
//   border-bottom: 1px solid #eee;
// }

// #unicode-modal code {
//   background: #f3f3f3;
//   padding: 2px 6px;
//   border-radius: 4px;
// }

// #unicode-modal small {
//   display: block;
//   color: #666;
// }

// #unicode-modal-close {
//   border: none;
//   background: none;
//   cursor: pointer;
//   font-size: 16px;
// }
// `;
// document.head.appendChild(style);

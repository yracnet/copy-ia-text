const browserAPI = globalThis.browser ?? globalThis.chrome;

browserAPI.runtime.onMessage.addListener(async (message) => {
  if (message.action === "copy-ia-text") {
    try {
      await navigator.clipboard.writeText(message.text);
      console.log("Texto copiado");
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  }
});

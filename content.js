const addUpdateVscodeBtn = (codeContainer) => {
  // Check if the update button already exists in the container
  if (codeContainer.querySelector("#update-vscode-btn")) {
    return;
  }

  const updateVscodeBtn = document.createElement("button");
  updateVscodeBtn.textContent = "Create File";
  updateVscodeBtn.id = "update-vscode-btn";
  updateVscodeBtn.style.padding = "2px 10px";
  updateVscodeBtn.style.border = "none";
  updateVscodeBtn.style.borderRadius = "20px";
  updateVscodeBtn.style.color = "#fff";
  updateVscodeBtn.style.backgroundColor = "#28a745";
  updateVscodeBtn.style.fontWeight = "300";
  updateVscodeBtn.addEventListener("click", async () => {
    const codeBtn = codeContainer.querySelector(".flex.ml-auto.gap-2");
    if (codeBtn) {
      codeBtn.click();

      const langSpan = codeContainer.querySelector(
        ".flex.items-center.relative.text-gray-200.bg-gray-800.px-4.py-2.text-xs.font-sans.justify-between.rounded-t-md > span"
      );
      const lang = langSpan ? langSpan.textContent.trim() : "";
      let extension = ".txt";
      switch (lang.toLowerCase()) {
        case "javascript":
          extension = ".js";
          break;
        case "html":
          extension = ".html";
          break;
        case "css":
          extension = ".css";
          break;
        case "python":
          extension = ".py";
          break;
        case "java":
          extension = ".java";
          break;
        case "c#":
          extension = ".cs";
          break;
        case "c++":
          extension = ".cpp";
          break;
        case "ruby":
          extension = ".rb";
          break;
        case "go":
          extension = ".go";
          break;
        case "swift":
          extension = ".swift";
          break;
        case "sql":
          extension = ".sql";
          break;
        // Add more cases for other languages as needed
      }

      const fileContent = await navigator.clipboard.readText();
      const filename = `New${extension}`;
      const options = {
        suggestedName: filename,
        types: [
          {
            description: [extension],
            accept: {
              "text/plain": [extension],
            },
          },
        ],
      };

      try {
        const handle = await window.showSaveFilePicker(options);
        const writable = await handle.createWritable();
        await writable.write(fileContent);
        await writable.close();
      } catch (error) {
        console.error("Error saving file:", error);
      }
    } else {
      console.log("Copy code button not found.");
    }
  });

  updateVscodeBtn.style.marginRight = "200px";

  codeContainer.insertAdjacentElement("afterbegin", updateVscodeBtn);
};

// Find and add update button to existing code containers
document
  .querySelectorAll(
    ".flex.items-center.relative.text-gray-200.bg-gray-800.px-4.py-2.text-xs.font-sans.justify-between.rounded-t-md"
  )
  .forEach(addUpdateVscodeBtn);

// Use a MutationObserver to listen for new code containers added to the page
const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.matches(
          ".flex.items-center.relative.text-gray-200.bg-gray-800.px-4.py-2.text-xs.font-sans.justify-between.rounded-t-md"
        )
      ) {
        addUpdateVscodeBtn(node);
      }
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });
// Check for button addition every 3 seconds
setInterval(() => {
  document
    .querySelectorAll(
      ".flex.items-center.relative.text-gray-200.bg-gray-800.px-4.py-2.text-xs.font-sans.justify-between.rounded-t-md"
    )
    .forEach(addUpdateVscodeBtn);
}, 3000);

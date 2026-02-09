document.addEventListener("DOMContentLoaded", () => {
  let currentLang = "en";

  const langToggle = document.getElementById("lang-toggle");
  const printBtn = document.getElementById("print-btn");
  const programmeSelect = document.getElementById("doctoral-programme");
  const fundingBlock = document.getElementById("funding-block");
  const enableSup2 = document.getElementById("enable-supervisor2");
  const enableSup3 = document.getElementById("enable-supervisor3");
  const sup2Fields = document.getElementById("supervisor2-fields");
  const sup3Fields = document.getElementById("supervisor3-fields");

  // Language toggle
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "fi" : "en";
    langToggle.textContent = currentLang === "en" ? "FI" : "EN";
    document.documentElement.lang = currentLang;
    applyLanguage();
  });

  function applyLanguage() {
    // Toggle data-lang-en / data-lang-fi spans
    document.querySelectorAll("[data-lang-en]").forEach((el) => {
      el.hidden = currentLang !== "en";
    });
    document.querySelectorAll("[data-lang-fi]").forEach((el) => {
      el.hidden = currentLang !== "fi";
    });

    // Update placeholders on inputs and textareas
    document.querySelectorAll("[data-placeholder-en]").forEach((el) => {
      el.placeholder =
        currentLang === "en"
          ? el.dataset.placeholderEn
          : el.dataset.placeholderFi;
    });

    // Update select options text
    document.querySelectorAll("select option[data-en]").forEach((opt) => {
      opt.textContent =
        currentLang === "en" ? opt.dataset.en : opt.dataset.fi;
    });
  }

  // Show/hide funding block based on doctoral programme selection
  programmeSelect.addEventListener("change", () => {
    const isMolecularCellular = programmeSelect.value === "molecular-cellular";
    fundingBlock.hidden = !isMolecularCellular;
    if (!isMolecularCellular) {
      document.getElementById("employment-confirm").checked = false;
      document.getElementById("funding-confirm").checked = false;
      document.getElementById("funding-sources").value = "";
    }
  });

  // Toggle supervisor 2 fields
  enableSup2.addEventListener("change", () => {
    const enabled = enableSup2.checked;
    sup2Fields.hidden = !enabled;
    toggleSupervisorRequired(sup2Fields, enabled);
    if (!enabled) clearSupervisorFields(sup2Fields);
  });

  // Toggle supervisor 3 fields
  enableSup3.addEventListener("change", () => {
    const enabled = enableSup3.checked;
    sup3Fields.hidden = !enabled;
    toggleSupervisorRequired(sup3Fields, enabled);
    if (!enabled) clearSupervisorFields(sup3Fields);
  });

  function toggleSupervisorRequired(container, enabled) {
    container.querySelector(".sup-surname").required = enabled;
    container.querySelector(".sup-firstname").required = enabled;
    container.querySelector(".sup-title").required = enabled;
    container.querySelector(".sup-date").required = enabled;
  }

  function clearSupervisorFields(container) {
    container.querySelectorAll("input[type='text']").forEach((el) => {
      el.value = "";
    });
    container.querySelectorAll("input[type='date']").forEach((el) => {
      el.value = "";
    });
    container.querySelectorAll("select").forEach((el) => {
      el.selectedIndex = 0;
    });
  }

  // Validation: enable print button only when all required fields are filled
  function checkFormValidity() {
    const form = document.getElementById("agreement-form");
    const allValid = form.checkValidity();
    printBtn.disabled = !allValid;
  }

  // Listen for input/change on the entire form
  const form = document.getElementById("agreement-form");
  form.addEventListener("input", checkFormValidity);
  form.addEventListener("change", checkFormValidity);

  // Run once on load
  checkFormValidity();

  // Print
  printBtn.addEventListener("click", () => {
    window.print();
  });
});

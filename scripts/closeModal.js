import { sidebar } from "./handleCurrentTab.js";
import { modal, navbar } from "./openModal.js";
export function closeModal() {
  modal.classList.remove("open-modal");
  sidebar.classList.remove("disabled");
  navbar.classList.remove("disabled");
}

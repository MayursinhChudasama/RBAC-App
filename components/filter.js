export function filterComp(element) {
  element.innerHTML = `
  <div style="display: inline-flex; gap: 10px">
  <div class="dropdown-toggle">Select</div>
  <button id="filterBtn" style="width: 50px">Filter</button>
  </div>
  <div class="dropdown-options"></div>`;
}

export function headerComp(element) {
  element.innerHTML = `<input type="checkbox" id="menu-toggle" /> <header class="top-navbar">
      <div class="nav-content">
        <!-- Hamburger icon inside top navbar -->
        <label class="hamburger" for="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <nav class="top-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">User</a>
          <a href="../index.html">Log Out</a>
        </nav>
      </div>
    </header>`;
}

export async function fetchComponent(url, element) {
  const response = await fetch(url);
  const html = await response.text();
  element.innerHTML = html;
}

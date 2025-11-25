const form = document.querySelector('form');
const input = document.querySelector('input[name="url"]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  let url = input.value.trim();
  
  if (!url) return;
  
  // Check if it's a URL or search query
  if (!isUrl(url)) {
    url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
  } else if (!(url.startsWith('https://') || url.startsWith('http://'))) {
    url = 'http://' + url;
  }
  
  // Encode and redirect
  const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(url);
  window.location.href = encodedUrl;
});

function isUrl(val = '') {
  return /^http(s?):\/\//.test(val) || (val.includes('.') && val.substr(0, 1) !== ' ');
}

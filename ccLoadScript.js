function loadScripts(scriptUrls) {
  scriptUrls.forEach(function(scriptUrl, index) {
    // Append timestamp
    var versionedUrl = scriptUrl + '?v=' + new Date().getTime();

    // Append random number
    versionedUrl += '&r=' + Math.random();

    // Append hash the script content
    fetch(versionedUrl)
      .then(response => response.text())
      .then(scriptContent => {
        var scriptHash = hashCode(scriptContent);
        var finalUrl = versionedUrl + '&h=' + scriptHash;

        // Create script element
        var script = document.createElement('script');
        script.type = 'text/javascript';
        
        // CORS issues
        script.crossOrigin = 'anonymous';

        script.src = finalUrl;

        // Append the script
        document.head.appendChild(script);

        // To handle commma separated scripts
        if (index < scriptUrls.length - 1) {
          document.head.appendChild(document.createTextNode(','));
        }
      })
      .catch(error => console.error('Error loading script:', error));
  });
}

// Helper function to calculate a simple hash code
function hashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return hash;
}
]);

function updateTimeAgo() {
    var datePosts = document.querySelectorAll(".datePost");
  
    datePosts.forEach(function (datePost) {
      var span = datePost.querySelector("span[data-timestamp]");
      var dateString = span ? span.dataset.timestamp : null;
      var postDate = dateString ? new Date(dateString) : new Date();
      var now = new Date();
      var timeDiff = now - postDate;
  
      var seconds = Math.floor(timeDiff / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);
      var days = Math.floor(hours / 24);
      var months = Math.floor(days / 30);
      var years = Math.floor(days / 365);
  
      var displayText =
        years > 0
          ? years + (years === 1 ? " year" : " years") + " ago"
          : months > 0
          ? months + (months === 1 ? " month" : " months") + " ago"
          : days > 0
          ? days + (days === 1 ? " day" : " days") + " ago"
          : hours > 0
          ? hours + (hours === 1 ? " hour" : " hours") + " ago"
          : minutes > 0
          ? minutes + (minutes === 1 ? " minute" : " minutes") + " ago"
          : seconds + (seconds === 1 ? " second" : " seconds") + " ago";
  
      datePost.textContent = "Posted: " + displayText;
    });
  }
  
  updateTimeAgo();
  
  setInterval(updateTimeAgo, 60000);
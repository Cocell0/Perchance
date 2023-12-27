function updateTimeAgo() {
    var datePosts = document.querySelectorAll(".datePost");

    datePosts.forEach(function (datePost) {
      var dateString = datePost.dataset.timestamp;
      var postDate = dateString ? new Date(dateString) : new Date();
      var now = new Date();
      var timeDiff = now - postDate;

      var seconds = Math.floor(timeDiff / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);
      var days = Math.floor(hours / 24);

      var displayText =
        days > 0
          ? days + " days ago"
          : hours > 0
          ? hours + " hours ago"
          : minutes > 0
          ? minutes + " minutes ago"
          : seconds + " seconds ago";

      datePost.textContent = displayText;
    });
  }

  updateTimeAgo();

  setInterval(updateTimeAgo, 60000);
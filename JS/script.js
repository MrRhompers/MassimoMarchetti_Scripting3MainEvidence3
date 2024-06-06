document.addEventListener('DOMContentLoaded', function() {
    var clickSound = document.getElementById('clickSound');
    document.addEventListener('click', function() {
        clickSound.currentTime = 0; // Rewind the sound to the beginning
        clickSound.play();
    });
  });
  
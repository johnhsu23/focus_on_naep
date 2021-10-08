// registerEvents();

function registerEvents() {
    document.addEventListener("DOMContentLoaded", function () {
      selectPrimaryNav(window.location.pathname);
    });
  }
  
  function selectPrimaryNav(pathname) {
    pathname = pathname.toLowerCase();
    var l = "/focus_on_naep/".length;
    var restPath = pathname.substring(l);
    var section = restPath.substring(0, restPath.indexOf('/')) || 'home';
    var links = document.getElementById('primary-nav').querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      if (links[i].dataset.section === section) {
        links[i].classList.add('active');
      } else {
        links[i].classList.remove('active');
      }
    }
  }
  
  /*Social Media Icons*/
  function EmailCurrentPage(e) {
    e.preventDefault();
    window.location.href =
      "mailto:?subject=" +
      document.title +
      "&body=" +
      escape(window.location.href);
  }
  
  function PrintCurrentPage(e) {
    e.preventDefault();
    window.print();
  }
  
  function ShareonTwitter(e) {
    e.preventDefault();
    PopupCenter(
      "https://twitter.com/intent/tweet?url=https://nrcpreview3.naepims.org/focus_on_naep/#/",
      "newwindow",
      "800",
      "400"
    );
  }
  
  function ShareonFacebook(e) {
    e.preventDefault();
    PopupCenter(
      "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fnrcpreview3.naepims.org%2Ffocus_on_naep%2F%23%2F&amp;src=sdkpreparse",
      "newwindow",
      "800",
      "400"
    );
  }
  
  function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft =
      window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop =
      window.screenTop != undefined ? window.screenTop : screen.top;
  
    width = window.innerWidth ?
      window.innerWidth :
      document.documentElement.clientWidth ?
      document.documentElement.clientWidth :
      screen.width;
    height = window.innerHeight ?
      window.innerHeight :
      document.documentElement.clientHeight ?
      document.documentElement.clientHeight :
      screen.height;
  
    var left = width / 2 - w / 2 + dualScreenLeft;
    var top = height / 2 - h / 2 + dualScreenTop;
    var newWindow = window.open(
      url,
      title,
      "scrollbars=yes, width=" +
      w +
      ", height=" +
      h +
      ", top=" +
      top +
      ", left=" +
      left
    );
  
    // Puts focus on the newWindow
    if (window.focus) {
      newWindow.focus();
    }
  }
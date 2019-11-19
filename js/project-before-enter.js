var projectCounter = 0;
var backgrounds = ["#126882", "#38619c", "#7750ad", "#89bd40", "#489cd4"];
var accents = ["#0e5266", "#2e5080", "#573b80", "#6b9432", "#3b80ad"];
var backgroundImgs = ["/img/projects/luca/luca_cover.jpg", "/img/projects/type-spec/type_spec_cover.png", "/img/projects/foodogo/foodogo_cover.jpg", "/img/projects/global-degree/global_degree_cover.jpg", "/img/projects/intellicare/intellicare_cover.jpg"];
var dur = 1100;
var steps = 1;
var sliderWidthPct = '65.26';
var animationRunning = false;


// function projectParallax(event) {
//   if (document.getElementById('wrapper').classList.contains('project')) {
//
//     // Get scroll distance as a percent
//     // https://stackoverflow.com/a/8028584
//     var h = event.target,
//     b = event.target,
//     st = 'scrollTop',
//     sh = 'scrollHeight';
//     var scrollPct = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
//
//     //document.getElementById('project-img').style.transform = 'translateY(-' + scrollPct + '%)';
//     document.getElementById('project-img').style.transform = 'translateY(-' + (scrollPct * 2/3) + '%)';
//
//   }
// }

// function unsetParallax() {
//   var projImg = document.getElementById('project-img');
//   if (document.querySelector('.project-body')) {
//     var scrollElement = document.querySelector('.project-body');
//     var bodyHeight = document.body.clientHeight;
//     var scrollDist = scrollElement.scrollTop;
//
//
//     // Smoothly move project image back up if scrolled less than one page height
//     if (scrollDist > bodyHeight) {
//       projImg.style.transition = 'none';
//       projImg.style.transform = '';
//
//       setTimeout(function(){
//         projImg.style.transition = '';
//         projImg.style.transform = '';
//       }, 600);
//     } else {
//       projImg.style.transition = '';
//       projImg.style.transform = '';
//     }
//   } else {
//     projImg.style.transition = '';
//     projImg.style.transform = '';
//   }
// }

// function preloadImage(url) {
//   //console.log('preloadImage');
//   var img=new Image();
//   img.src=url;
// }

function projListAddCurrent(index) {
  document.querySelectorAll(".projects-item")[index].classList.add("is-current");
}

function projListRemoveCurrent(index) {
  document.querySelectorAll(".projects-item")[index].classList.remove("is-current");
}


function pageCheck() {
  // Check which page we are coming from
  if (document.querySelector('.content-inner article')) {
    var contentInnerClasses = document.querySelector('.content-inner article').classList;
    var projectsSlider = document.getElementById('projects-slider');
    //console.log('page check');
    // No need to check for first project item as slider is not translated
    if (contentInnerClasses.contains('luca')) {
      projectsSlider.style.transform = 'translateX(0%)';
      projectCounter = 0;
    } else if (contentInnerClasses.contains('type-spec')) {
      projectsSlider.style.transform = 'translateX(-65.26%)';
      projectCounter = 1;
    } else if (contentInnerClasses.contains('foodogo')) {
      projectsSlider.style.transform = 'translateX(-130.52%)';
      projectCounter = 2;
    } else if (contentInnerClasses.contains('global-degree')) {
      projectsSlider.style.transform = 'translateX(-195.78%)';
      projectCounter = 3;
    } else if (contentInnerClasses.contains('intellicare')) {
      projectsSlider.style.transform = 'translateX(-261.04%)';
      projectCounter = 4;
    }

  }
  //console.log('project counter: ' + projectCounter);
}



function changeBackgroundNext(projectCounter, projectCounterBefore) {
  document.getElementById("clipPolygon").style.fill = backgrounds[projectCounter];
  document.getElementById("logo-frame").style.fill = accents[projectCounter];
  var x = document.getElementsByClassName("inner-nav-btn");
  for (var i = 0; i < x.length; i++) {
    x[i].style.backgroundColor = accents[projectCounter];
  }

  updateSliderImg(1, projectCounter, projectCounterBefore);

}

function changeBackgroundPrev(projectCounter, projectCounterBefore) {
  document.getElementById("clipPolygon").style.fill = backgrounds[projectCounter];
  document.getElementById("logo-frame").style.fill = accents[projectCounter];

  var x = document.getElementsByClassName("inner-nav-btn");
  for (var i = 0; i < x.length; i++) {
    x[i].style.backgroundColor = accents[projectCounter];
  }

  updateSliderImg(-1, projectCounter, projectCounterBefore);

}



function updateSliderImg(direction, projectCounter, projectCounterBefore) {

  var sliderImg = document.getElementById('project-img');
  var sliderShutter = document.getElementById('projects-slider-shutter');
  var circle = document.querySelector('#projects-slider-img .projects-slider-circle');
  var clientWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  //sliderImg.style.maxHeight = '777px'; //900px

  if (clientWidth > 960) {
    setTimeout(function(){ sliderImg.style.backgroundImage = 'url("' + backgroundImgs[projectCounter] + '")'; circle.style.backgroundColor = accents[projectCounter]; }, 500);
  } else {
    sliderShutter.style.width = '80%';
    setTimeout(function(){ sliderImg.style.backgroundImage = 'url("' + backgroundImgs[projectCounter] + '")'; circle.style.backgroundColor = accents[projectCounter]; }, 500);
    setTimeout(function(){ sliderShutter.style.width = ''; }, 1500);
  }



  if ( (direction > 0) & (projectCounterBefore != projectCounter) ) {
    //console.log('next');
    var translateX = '0%';

    // Reset shutter position
    // Starting position from left moved over 1 column in narrower screen widths
    if (clientWidth > 960) {
      sliderShutter.style.transform = 'translateX(-68%)';
    } else {
      sliderShutter.style.transform = 'translateX(-85%)';
    }
    // Ending position on right unchanged by screen width
    translateX = '127%';
    sliderShutter.style.backgroundColor = accents[projectCounter];
    sliderShutter.style.display = 'block';
    // use anime.js
    anime({
      targets: sliderShutter,
      translateX: translateX,
      duration: 800,
      delay: 100,
      easing: 'linear',
      begin: function() {

      },
      run: function() {

      },
      complete: function() {
        sliderShutter.style.display = '';
      }
    });

  } else if ( (direction < 0) & (projectCounterBefore != projectCounter) ) {
    //console.log('prev');
    // Reset shutter position
    sliderShutter.style.transform = 'translateX(127%)';
    sliderShutter.style.backgroundColor = accents[projectCounter];
    sliderShutter.style.display = 'block';

    if (clientWidth > 960) {
      translateX = '-68%';
    } else {
      translateX = '-85%';
    }

    // use anime.js
    anime({
      targets: sliderShutter,
      translateX: translateX,
      duration: 800,
      delay: 100,
      easing: 'linear',
      begin: function() {

      },
      run: function() {

      },
      complete: function() {
        sliderShutter.style.display = '';
      }
    });

  }


}



function projectBeforeEnter(el, projectCounter, numProjects, curProjClass, prevProjClass, nextProjClass) {

  //console.log('beforeEnter: ' + $nuxt.$route.name);

  // Switch between fallback and regular CSS styling
  document.getElementById('wrapper').classList.remove('no-js');

  // if (document.getElementById('wrapper')) {
  //   unsetParallax();
  // }

  // Fade out the project body of the previous project
  if (document.querySelector('.content-inner .project-details:not(' + curProjClass + ') .project-body')) {
    var prevProjectBody = document.querySelector('.content-inner .project-details:not(' + curProjClass + ') .project-body');
    prevProjectBody.style.opacity = '0';
  }



  // Add class to know if transitioning from another project page rather than index
  if (document.querySelector('.content-inner ' + prevProjClass)) {
    document.getElementById('wrapper').classList.add('next');

    var projectCounterBefore = projectCounter - 1;

    if (projectCounter >= 0 && projectCounter <= numProjects) {
      document.getElementById('project-img').style.backgroundImage = 'url("' + backgroundImgs[projectCounter - 1] + '")';
    }

    setTimeout(function(){

      anime({
          targets: '#projects-slider',
          duration: dur,
          translateX: (sliderWidthPct*(projectCounter)*-1) + '%',
          easing: 'easeOutQuad',
          begin: function() {
            changeBackgroundNext(projectCounter, projectCounterBefore);
            projListRemoveCurrent(projectCounterBefore);
            projListAddCurrent(projectCounter);
            animationRunning = true;
          },
          run: function() {
            animationRunning = true;
          },
          complete: function() {
            animationRunning = false;
          }
      });

    }, 700);


  } else if (document.querySelector('.content-inner ' + nextProjClass)) {
    document.getElementById('wrapper').classList.add('prev');

    var projectCounterBefore = projectCounter + 1;

    if (projectCounter >= 0 && projectCounter <= numProjects) {
      document.getElementById('project-img').style.backgroundImage = 'url("' + backgroundImgs[projectCounter + 1] + '")';
    }

    setTimeout(function(){

      anime({
          targets: '#projects-slider',
          duration: dur,
          translateX: parseInt((sliderWidthPct*projectCounterBefore*-1)-(sliderWidthPct*steps*-1)) + '%',
          easing: 'easeOutQuad',
          begin: function() {
            changeBackgroundPrev(projectCounter, projectCounterBefore);
            projListRemoveCurrent(projectCounterBefore);
            projListAddCurrent(projectCounter);
            animationRunning = true;
          },
          run: function() {
            animationRunning = true;
          },
          complete: function() {
            animationRunning = false;
          }
      });

    }, 700);

  }

  // el.querySelector('.project-info').style.opacity = '1';

  // Timeout ensures code is run immediately rather than at the end
  setTimeout(function(){

    projInfoFadeIn(el);

  }, 1);

  //preloadProjBg(projectCounter, numProjects);



  // Disable header, back, and previous buttons when animation is running
  setTimeout(function(){
    document.querySelector('.header-title a').style.pointerEvents = 'none';

    var innerNavBtns = document.querySelectorAll('.content-inner .inner-nav-btn');
    for (var i = 0; i < innerNavBtns.length; i++) {
      innerNavBtns[i].style.pointerEvents = 'none';
    }
  }, 1);

  setTimeout(function(){
    document.querySelector('.header-title a').style.pointerEvents = '';

    var innerNavBtns = document.querySelectorAll('.content-inner .inner-nav-btn');
    for (var i = 0; i < innerNavBtns.length; i++) {
      innerNavBtns[i].style.pointerEvents = '';
    }
  }, 2000);

  // if (document.getElementById('wrapper')) {
  //   setTimeout(function(){
  //     [].map.call( document.querySelectorAll(".project-body") , function(elem) {
  //       elem.addEventListener("scroll", projectParallax, false);
  //     });
  //   }, 1);
  // }


}

// function preloadProjBg(projectCounter, numProjects) {
//   //projectCounter starts from 0, numProjects starts from 1
//   if ((projectCounter + 1) < numProjects) {
//     preloadImage(backgroundImgs[projectCounter + 1]);
//   }
//   if (projectCounter > 0) {
//     preloadImage(backgroundImgs[projectCounter - 1]);
//   }
// }

function projInfoFadeIn(el) {

  // Check if transitioning directly from another project
  if (document.querySelectorAll('.content-inner .project-details').length > 1) {
    // Transitioning from another project. Wait for transition to end.
    setTimeout(function(){
      el.querySelector('.project-info').style.transition = 'opacity 3000ms ease,transform .8s 1s ease';
      el.querySelector('.project-info').style.transitionDelay = '100ms !important';
      setTimeout(function(){ el.querySelector('.project-info').style.opacity = '1'; }, 1);
    }, 1100);

  } else {
    el.querySelector('.project-info').style.transition = 'opacity 3000ms ease,transform .8s 1s ease';
    el.querySelector('.project-info').style.transitionDelay = '100ms !important';
    setTimeout(function(){ el.querySelector('.project-info').style.opacity = '1'; }, 1);
  }

}

function swapCloseBtn() {

  // Enable close button to go to previous page. Was disabled on first load as don't know which page to go back to.
  document.querySelector('#header .menu-btn:not(.back-home)').style.visibility = 'visible';
  document.querySelector('#header .menu-btn.back-home').style.visibility = 'hidden';

}

function closeLuminous() {

  // Close luminous lightbox when leaving page
  if (document.querySelector('.lum-open')) {
    document.querySelector('.lum-close-button').click();
  }

  // Remove luminous lightbox after close animation is finished
  setTimeout(function(){
    var x = document.querySelectorAll('.lum-lightbox');
    for (var i = 0; i < x.length; i++) {
      x[i].remove();
    }
  }, 1000);

}

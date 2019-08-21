  //constant State Object
      const state ={
        debounced: {
          startX: null,
          
          deltaX: null,  
        }
      }

     /* function hideImages(x) {
        if (x.matches){
          document.querySelector(".row").style.display ="block";
        }else{
          document.querySelector(".row").style.display="none";
        }
      }  
      var x = window.matchMedia("(max-width: 481px)")
      hideImages(x)
      x.addEventListener(hideImages)
      */
   function hideSwipeHelp(){
    document.getElementById('sWipe').style.display = "none";
   }
   function openModal() {
      document.getElementById('myModal').style.display = "block";
    }

   function closeModal() {
      document.getElementById('myModal').style.display = "none";
      document.getElementById('sWipe').style.display = "block";
   }

    function debounced(delay, fn) {
        let timerId;
        return function (...args) {
          if (timerId) {
            clearTimeout(timerId);
          }
          timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
          }, delay);
        }
      }


  

   

  // Create Object called carousel
    carousel = (function() {
//We grab all the HTML elements we need with querySelector
      const box = document.querySelector('.carouselbox');
      var next = box.querySelector('.next');
      var prev = box.querySelector('.prev');
      var items = box.querySelectorAll('.content li');
/*We set the counter to 0 – this is the variable that keeps track of which item of the carousel is currently shown */    
      var counter = 0;
/*We read the amount of items in the carousel and store them in a variable – this allows us to loop the carousel */
      var amount = items.length;
/*We set the current item as the first one in the carousel. The current variable will contain a reference to the element currently visible. All we do when the carousel state changes is remove the CSS class from it and shift it to the other one */
      var current = items[0];
/* We add the class of “active” to the container element to change its styling and trigger the CSS functionality explained earlier. */
      box.classList.add('active');

      
      box.addEventListener('touchstart', function touchStart(e) {
        startX = e.targetTouches[0].pageX;
         //e.preventDefault();  
      }
      );

      box.addEventListener('touchmove' , debounced(250, function  touchMove(e)  {
        deltaX = e.targetTouches[0].pageX - startX;
         // console.log(deltaX);

          e.stopImmediatePropagation()

         if (deltaX< 0) {
                navigate(1);
                

              }
         if (deltaX> 0) {
                navigate(-1);
                
              }
         }));
/*The navigate method takes a parameter called direction which defines if we should go backwards (negative values) or forwards in the carousel. */
      function navigate(direction) {
//It starts by removing the “current” class from the current carousel item, thus hiding it.
        current.classList.remove('current');
//We then modify the counter and make sure it doesn’t go beyond the amount of items available or below 0. In each case we move to the other extreme, thus making the carousel an endless rotating one.
        counter = counter + direction;
        // allows carousel to loop forwards >>
        if (direction === -1 &&
          counter < 0) {
          counter = amount - 1;
        }
        // allows carousel to loop in reverse <<
        if (direction === 1 &&
          !items[counter]) {
          counter = 0;
        }
//We define the new current item and add the class to show it.
        current = items[counter];
        current.classList.add('current');
      }
      next.addEventListener('click', function() {
        navigate(1);

      });
      prev.addEventListener('click', function() {
        navigate(-1);
		    
      });
      navigate(0);
    })
();

    modal = (function () {
      /*const mcCurrent = document.querySelector('#mcCurrent');
      const colmImgs = document.querySelectorAll('.row .column');

      colmImgs.forEach(img =>
          img.addEventListener('click', e => (mcCurrent.src = e.target.src)));*/
     
      const box2 = document.querySelector('.modal');
      const items2 = box2.querySelectorAll('.modal-content li');
      var next2 = box2.querySelector('.next');
      var prev2 = box2.querySelector('.prev');
      var counter2 = 0;
      var amount2 = items2.length;
      var current2 = items2[0];
      box2.classList.add('active2');

      
     
      box2.addEventListener('touchstart', function touchStart(e) {
        startX = e.targetTouches[0].pageX;
        // e.preventDefault();  
      }
      );
      

      function currentSlide(direction2){
        (amount2) = direction2;
      }

     
 
      function navigate2(direction2) {
       
        current2.classList.remove('current');
        counter2 = counter2 + direction2;
        if (direction2 === -1 &&
          counter2 < 0) {
          counter2 = amount2 - 1;
        }
        if (direction2 === 1 &&
          !items2[counter2]) {
          counter2 = 0;
        }
        
        current2 = items2[counter2];
        current2.classList.add('current');

      }

      box2.addEventListener('touchmove' , debounced(250, function  touchMove(e)  {
        deltaX = e.targetTouches[0].pageX - startX;
         // console.log(deltaX);

          e.stopImmediatePropagation()

         if (deltaX< 0) {
                navigate2(1);
              }
         if (deltaX> 0) {
                navigate2(-1);
                
              }
         }));
      //starts carousel at first image
      navigate2(0);
    })

    
 ();  

 
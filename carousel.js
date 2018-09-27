carousel = (function() {
      var box = document.querySelector('.carouselbox');
      var next = box.querySelector('.next');
      var prev = box.querySelector('.prev');
      var items = box.querySelectorAll('.content li');
      var counter = 0;
      var throttleCount = 0;
      var amount = items.length;
      var current = items[0];
      box.classList.add('active');
      
     //constant State Object
      const state ={
        debounced: {
          startX: null,
          
          deltaX: null,
          
        }

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
     
    box.addEventListener('touchstart', function touchStart(e) {
        startX = e.targetTouches[0].pageX;

        // e.preventDefault();
        
      }
      );

        box.addEventListener('touchmove' , debounced(250, function  touchLeft(e)  {
          deltaX = e.targetTouches[0].pageX - startX;
         // console.log(deltaX);

          e.stopImmediatePropagation();

          

         if (deltaX< 0) {
                navigate(1);
              }
      if (deltaX> 0) {
                navigate(-1);
                
              }
         }));
    
      function navigate(direction) {
        current.classList.remove('current');
        counter = counter + direction;
        if (direction === -1 &&
          counter < 0) {
          counter = amount - 1;
        }
        if (direction === 1 &&
          !items[counter]) {
          counter = 0;
        }
        current = items[counter];
        current.classList.add('current');
      }
      next.addEventListener('click', function(ev) {
        navigate(1);
    
      });
      prev.addEventListener('click', function(ev) {
        navigate(-1);
    
      });
      navigate(0);
    })

    ();
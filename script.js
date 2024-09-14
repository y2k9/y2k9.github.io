// JS File
console.log("JS is working");



document.addEventListener('scroll', function() {
    const datas = document.querySelectorAll('.UGCdata');
    const visuals = document.querySelectorAll('.UGCvisual');
    
    let index = -1;
  
    visuals.forEach((visual, i) => {
      const rect = visual.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        index = i;
      }
    });
  
    datas.forEach(data => data.classList.remove('active'));
    if (index !== -1) {
      datas[index].classList.add('active');
    }
  });

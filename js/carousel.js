$("#shirt-carousel .carousel .slide a").click(function(e){ 
    var index = $(this).index(); 
    slider.carousel(index); 
    e.preventDefault(); 
}); 
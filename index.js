var didScroll;
var lastScrollTop = 0;
var delta = 20;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}


var cnt = 0;
var load = false;
var prd_elem_height = 0;
var prd_list;
function prd_print(list, first){
	/*$.ajax({
        type: 'POST',
        url: './test.php',
        dataType: 'html',
        success: function(data) {
        	$('#review_list').html(data);
       	}
    });*/
    if(first == true){
    	prd_list = list
    	$('#prd_list').html('');
    }
    if(prd_list.length == 0){
    	$('#prd_list').html('<p style="display:inline-block; text-align:center;width:100%;">검색결과가 없습니다.</p>')
    	return;
    }
	for(var i=0; i<6; i++){
		var row = prd_list[cnt++];
		var prod_name = "["+row[5]+"]"+row[1];
		var price = numberWithCommas(row[2])+'원';
		var image = row[4];
		var review_cnt = row[6];
		var important_cnt = Number(row[7])+Number(row[8]);
		var onclick = "location.href ='./detail_product.php?id=" + row[0].toString()+"';";
		document.getElementById("prd_list").innerHTML +='<a id="'+row[0]+'" class="prd_a" href="'+'./detail_product.php?id='+row[0].toString()+'"><li class="prd_li"><div class="prd_wrap">	<img class="prd_image" src="'+image+'"><p class="prd_name"><span class="helper"></span><span>'+prod_name.substring(0,45)+'</span></p><p class="prd_price">'+price+'</p><p class="prd_review_cnt">리뷰수:'+review_cnt+'</p><p class="prd_review_summary">중요리뷰수:'+important_cnt+'</p></div></li></a>';
			prd_elem();
	}
}

function prd_elem(){
	var wrap_width = Math.floor(window.outerWidth/2)-2;
	var filter = "win16|win32|win64|mac|macintel";
	if ( navigator.platform ) { 
		if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) { 
			//mobile 
			$('.prd_li').width(wrap_width); 
		} else { 
			//pc 
			$('.prd_li').width(wrap_width-(window.innerWidth-$(window).width())); 
		} 
	}
	

	var image_width = (window.outerWidth/2)*0.8;
	var image_height = (window.outerWidth/2)*0.8;
	var image_margin = ((window.outerWidth/2)-image_width)/2;
	var img = $('.prd_image');
	var prd_name_elem = $('.prd_name');
   	prd_name_elem.css('margin-left', image_margin);
   	prd_name_elem.css('margin-right', image_margin);

   	$('.prd_review_summary').css('margin-bottom', image_margin);
	img.load( function() {
   		img.width(image_width);
   		img.height(image_height);
   		img.css('margin-top', image_margin);
   		if(!load){
   			//prd_elem_height = $('.prd_a').height()-4;
   			//load=true;
   		}
   		//$('.prd_a').height(prd_elem_height);
   	});
   	img.width(image_width);
   	img.height(image_height);
   	img.css('margin-top', image_margin);
}

function search_elems(){
	var div_margin = Number($('.search_div').css('margin-left').replace('px',''));
	var input_width = $('.search_div').width()-80;

	$('.search_icon').css('right', div_margin+15);
	$('#prd_submit').css('right', div_margin+15);
	$('#prd_input').css('left', div_margin+20);
	$('#prd_input').width(input_width);
}

function search_prd(){
	var prd_name = $('#prd_input').val();
	console.log(prd_name)
	url = './test.php?name='+prd_name;
	$.ajax({
        type: 'POST',
        url: url,
        dataType: 'html',
        async: true,
        success: function(data) {
        	$('#prd_list').html(data);
       	}
    });
}

/*제품상세설명페이지*/


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function fnMove(seq){
    var offset = $(seq).offset();
    console.log(offset.top-123);
    $('html, body').animate({scrollTop : offset.top-123}, 400);
}

$(window).resize(function() {
	prd_elem();
	search_elems();
});
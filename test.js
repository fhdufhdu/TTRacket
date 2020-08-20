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
		row = prd_list[cnt++];
		var prod_name = row[1];
		var price = numberWithCommas(row[2])+'원';
		var image = row[4];
		var review_cnt = row[6];
		var important_cnt = Number(row[7])+Number(row[8]);
		var onclick = "location.href ='./detail_product.php?id=" + row[0].toString()+"';";
		document.getElementById("prd_list").innerHTML +='<a id="'+row[0]+'" class="prd_a" href="'+'./detail_product.php?id='+row[0].toString()+'"><li class="prd_li"><div class="prd_wrap">	<img class="prd_image" src="'+image+'"><p class="prd_name"><span class="helper"></span><span>'+prod_name.substring(0,45)+'</span></p><p class="prd_price">'+price+'</p><p class="prd_review_cnt">리뷰수:'+review_cnt+'</p><p class="prd_review_summary">중요리뷰수:'+important_cnt+'</p></div></li></a>';
			var wrap_width = Math.floor(window.outerWidth/2)-2;
			$('.prd_li').width(wrap_width);

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
   					prd_elem_height = $('.prd_a').height()-4;
   					load=true;
   				}
   				$('.prd_a').height(prd_elem_height);
   		});
	}
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
function btn_set_elem(){
	var btn_div_width = window.outerWidth*0.8;
	var btn_div_padding = (window.outerWidth-btn_div_width)/2;
	$('.btn_div').width(btn_div_width);
	$('.btn_div').css('padding-left', btn_div_padding);
	$('.btn_div').css('padding-right', btn_div_padding);

	$('.positive_btn').width((btn_div_width/2)-4);
	$('.negative_btn').width((btn_div_width/2)-4);
}

function btn_click(positive){
	if(positive){
		var p_btn = $('.positive_btn');
		p_btn.css('background-color', '#473c36');
		p_btn.css('color', '#ffffff');
		p_btn.css('font-weight' ,'normal');
		var n_btn = $('.negative_btn');
		n_btn.css('background-color', '#ffffff');
		n_btn.css('color', '#473c36');
		n_btn.css('font-weight' ,'bold');
		review_print(0,0,false,true);
	}
	else{
		var n_btn = $('.negative_btn');
		n_btn.css('background-color', '#473c36');
		n_btn.css('color', '#ffffff');
		n_btn.css('font-weight' ,'normal');
		var p_btn = $('.positive_btn');
		p_btn.css('background-color', '#ffffff');
		p_btn.css('color', '#473c36');
		p_btn.css('font-weight' ,'bold');
		review_print(0,0,false,false);
	}
	fnMove('.review_title_div');
}

function info_elem(){
	var outerWidth = window.outerWidth;
	$('.prd_wrap').height(outerWidth);
	$('.prd_info').height(outerWidth*0.25);
	$('.prd_info_wrap').css('margin-left', outerWidth*0.04);
	$('.prd_name').css('font-size', outerWidth*0.25*0.13);
	$('.prd_name').width(outerWidth-outerWidth*0.08)
	$('.prd_price').css('font-size', outerWidth*0.25*0.2*0.8);
	$('.prd_price').width(outerWidth-outerWidth*0.08)
	var img = $('.prd_img');
	img.load( function() {
   		img.width(outerWidth);
   		img.height(outerWidth);
   	});
}

function review_elem(){
	var outerWidth = window.outerWidth;
	$('.review_wrap').height(outerWidth*0.2);
	$('.review_wrap').css('margin-top', outerWidth*0.02);
	$('.review_title').css('font-size', outerWidth*0.25*0.25);
	$('.review_cnt').css('font-size', outerWidth*0.25*0.25*0.7);
	$('.review_title_div>div').css('margin-left', outerWidth*0.02);
	var hr = $('hr');
	hr.width(outerWidth-outerWidth*0.08);
	hr.css('margin-left', outerWidth*0.04);
	hr.css('margin-right', outerWidth*0.04);
	var r_text = $('.review_text');
	r_text.css('font-size', outerWidth*0.25*0.16);
	r_text.width(outerWidth-outerWidth*0.12);
	r_text.css('margin-left', outerWidth*0.06);
	r_text.css('margin-right', outerWidth*0.06);
	r_text.css('margin-top', outerWidth*0.25*0.09);
	r_text.css('margin-bottom', outerWidth*0.25*0.09);
}

var review_list;
var product_info;
function review_print(list, product, first, positive){
	$('.php').html('');

	if(first){
		review_list = list;
		product_info = product;
	}

	$('#review_div').html('')

	var cnt=0;
	for(var i=0; i<review_list.length; i++){
		if(positive){
			if(review_list[i][2]=="1"){
				document.getElementById("review_div").innerHTML += '<p class="review_text">'+review_list[i][3]+'</p><hr>'
				cnt++;
			}
		}
		else{
			if(review_list[i][2]=="0"){
				document.getElementById("review_div").innerHTML += '<p class="review_text">'+review_list[i][3]+'</p><hr>'
				cnt++;
			}
		}
	}
	$('.review_cnt').html(cnt+'건');
	$('.prd_img').attr('src', product_info[0][4]);
	$('.prd_name').html(product_info[0][1]);
	$('.prd_price').html(numberWithCommas(product_info[0][2])+"원");
	review_elem();
	info_elem();
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function fnMove(seq){
    var offset = $(seq).offset();
    console.log(offset.top-123);
    $('html, body').animate({scrollTop : offset.top-123}, 400);
}

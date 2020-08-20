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
	var img_a = $('.img_a');
	img.load( function() {
   		img.width(outerWidth);
   		img.height(outerWidth);
   		img_a.width(outerWidth);
   		img_a.height(outerWidth);
   	});
   	img.width(outerWidth);
   	img.height(outerWidth);
   	img_a.width(outerWidth);
   	img_a.height(outerWidth);
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
	$('.img_a').attr('href', product_info[0][3]);
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
    $('html, body').animate({scrollTop : offset.top-123}, 400);
}

$(window).resize(function() {
	btn_set_elem();
	info_elem();
	review_elem();
});
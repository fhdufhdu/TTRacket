<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	        <!-- 모바일 디바이스를 위한 설정 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    		<!-- 폰트 사용-->
	<link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css">
			<!--css 설정-->
	<link href="index_style.css" rel="stylesheet">
			<!--jQuery 설정-->
	<!--<link rel="stylesheet" href="https://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.css" />-->
    <script src="https://code.jquery.com/jquery-1.7.1.min.js"></script>
    <!--<script src="https://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.js"></script>-->
    <script src="./index.js"></script>
	<title>TTRACKET</title>
</head>
<body>
	<div class="div_parents" data-role="page">
		<div class="main_header">
			<div class="main_header_title">
				<p class="title_text_top">TTRacket</p>
				<p class="title_text_bottom">review summarizer</p>
			</div>
		</div>
		<header class="nav-down">
			<div class="search_div">
				<img src="images/search_icon.png" class="search_icon">
				<input type="text" id="prd_input" value="">
				<input type="submit" id="prd_submit" onclick="search_prd()">
				<script type="text/javascript">
    				search_elems();
    			</script>
			</div>
		</header>
		<div class="main_body">
			<div class="prd_list" id="prd_list">
				<?php 
					$mysqli = new mysqli('localhost', 'root','root', 'prd_info');
					$sql = "SELECT * FROM product;";
					$result = mysqli_query($mysqli, $sql);
					$list = array();
					while($row = mysqli_fetch_row($result)){	array_push($list, $row);
					}mysqli_close($mysqli);
				?>
    			<script type="text/javascript">
    				prd_print(<?php echo json_encode($list)?>, true);
    			</script>
			</div>
			<div id="more_view">
				<a onclick='prd_print(0, false)'>
					<p> 더보기 </p>
				</a>
			</div>
		</div>
	</div>
</body>
</html>

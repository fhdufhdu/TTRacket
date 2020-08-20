<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
	    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400&display=swap" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css">
		<link href="second_style.css" rel="stylesheet">
		<script src="https://code.jquery.com/jquery-1.7.1.min.js"></script>
		<script src="./detail.js"></script>
		<title>TTRACKET</title>
				<!--jQuery 설정-->
		<!--<link rel="stylesheet" href="https://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.css" />-->
	    <!--<script src="https://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.js"></script>-->
	</head>
	<body>
		<div class="main_header">
			<div class="main_header_title">
				<p class="title_text_top">TTRacket</p>
				<p class="title_text_bottom">review summarizer</p>
			</div>
			<div class="btn_div">
				<div class="positive_btn" onclick="btn_click(true)">					<div class="helper"></div>
					<p class="r_btn_text">긍정리뷰</p>
				</div>
				<div class="negative_btn" onclick="btn_click(false)">
					<div class="helper"></div>
					<p class="r_btn_text">부정리뷰</p>
				</div>
				<script type="text/javascript">
					btn_set_elem();
				</script>
			</div>
		</div>
		<div class="prd_wrap">
			<div class="prd_img_div">
				<a class="img_a" href="">
					<img class="prd_img" src="">
				</a>
			</div>
			<div class="prd_info">
				<div class="helper"></div>
				<div class="prd_info_wrap">
					<p class="prd_name">제품명</p>
					<p class="prd_price">가격</p>
				</div>
			</div>
			<script type="text/javascript">
				info_elem();
			</script>
		</div>
		<div class="review_wrap">
			<div class="review_title_div">
				<div class="helper"></div>
				<div>
					<p class="review_title">리뷰</p>
					<p class="review_cnt">00건</p>
				</div>
			</div>
			<hr>
			<div class="review_div" id="review_div">
			</div>
			<script type="text/javascript">
				review_elem();
			</script>
			<div class="php">
				<?php 
					$mysqli = new mysqli('localhost', 'root','root', 'prd_info');
					$id = $_GET['id'];
					$sql = "SELECT * FROM review WHERE prd_id = $id;";
					$result = mysqli_query($mysqli, $sql);
					$list = array();
					while($row = mysqli_fetch_row($result)){		array_push($list, $row);
					}
					$sql = "SELECT * FROM product WHERE id = $id;";
					$result = mysqli_query($mysqli, $sql);
					$prd = array();
					while($row = mysqli_fetch_row($result)){		array_push($prd, $row);
					}
					mysqli_close($mysqli);
				?>
				<script type="text/javascript">
					review_print(<?php echo json_encode($list)?>, <?php echo json_encode($prd)?>, true, true);
				</script>
			</div>
		</div>
	</body>
</html>
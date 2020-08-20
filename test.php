<?php 
	$mysqli = new mysqli('localhost', 'root','root', 'prd_info');
	$name = $_GET['name'];
	$sql = "SELECT * FROM product WHERE prd_name LIKE '%$name%';";
	$result = mysqli_query($mysqli, $sql);
	$list = array();
	while($row = mysqli_fetch_row($result)){	array_push($list, $row);
	}
	mysqli_close($mysqli);
?>

<script src="./test.js">
</script>
<script type="text/javascript">
	prd_print(<?php echo json_encode($list)?>, true);
</script>
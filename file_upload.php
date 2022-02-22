<?php
if (isset($_FILES['myLogo'])) {
    $name = $_FILES['myLogo']['name'];
    $tmp = explode(".", $name);
    $ext = end($tmp);
    $newfile = uniqid() . '.' . $ext;
    // Example:
    move_uploaded_file($_FILES['myLogo']['tmp_name'], "uploads/" . $newfile);
    $url = $_POST["url"];
    $top = $_POST["top"];
    $left = $_POST["left"];
    $w = $_POST["w"];
    $h = $_POST["h"];
    $stPosX = $_POST["stPosX"];
    $stPosY = $_POST["stPosY"];
    $xlen = $_POST["xlen"];
    $ylen = $_POST["ylen"];
    require_once('connectDatabase.php');
    $sql = "INSERT INTO logos(`name`, `url`, `top`, `left`, `width`, `height`, `stPosX`, `stPosY`, `xlen`, `ylen`) VALUES ('".$newfile."','".$url."','".$top."','".$left."','".$w."','".$h."','".$stPosX."','".$stPosY."','".$xlen."','".$ylen."')";
    if ($conn->query($sql) === TRUE) {
        echo $newfile;
    } else {
        echo "Error updating record: " . $conn->error;
    }
    $conn->close();
    exit;
}
?>
<?php
    require_once('connectDatabase.php');
    $num = $_POST["num"];
    $f = 0;
    $count = count($num);
    if($count > 0){
        $value = (int)$num[0];
        for($i = 0; $i < $count; $i ++){
            $value .= ",".(int)$num[$i];
        }
        $sql = "DELETE FROM flag WHERE `flag` IN (".$value.")";
        $result = $conn->query($sql);
        if($result !== FALSE) {
            $f = 1;
        }
    }
    $conn->close();
?>
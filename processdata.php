<?php
    require_once('connectDatabase.php');
    $num = $_GET["num"];
    $f = 0;
    $count = count($num);
    if($count > 0){
        $values = "(".(int)$num[0].")";
        for($i = 1; $i < $count; $i ++){
            $values .= ", (".(int)$num[$i].")";
        }
        $sql = "INSERT flag(`flag`) VALUES ".$values;
        $result = $conn->query($sql);
        if($result !== FALSE) {
            $f = 1;
        }
    }
    $conn->close();
?>
<?php
    require_once('connectDatabase.php');
    $sql = "SELECT * FROM flag";
    $result = $conn->query($sql);
    $resultStr = "";
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
          $resultStr .= $row["id"].",".$row["flag"]."|";
        }
        if(isset($_GET["i"]) && isset($_GET["j"]))  echo $resultStr.$_GET["i"].",".$_GET["j"];
        else echo $resultStr;
      } else {
        echo "0 results";
      }
      $conn->close();
?>
<?php
    require_once('connectDatabase.php');
    $sql = "SELECT * FROM logos";
    $result = $conn->query($sql);
    $resultStr = "";
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
          $resultStr .= $row["id"].",".$row["name"].",".$row["url"].",".$row["top"].",".$row["left"].",".$row["width"].",".$row["height"].",".$row["xlen"].",".$row["ylen"]."|";
          for($i = 0; $i < $row["xlen"]; $i ++){
            for($j = 0; $j < $row["ylen"]; $j ++){
              $num = ($row["stPosX"] + $i) * 200 + ($row["stPosY"] + $j) + 1;
              $sql1 = "UPDATE flag SET flag=1 WHERE id=".$num;
              if ($conn->query($sql1) === TRUE) {
              } else {
                  echo "Error updating record: " . $conn->error;
              }
            }
          }
        }
        echo $resultStr;
      } else {
        echo "0 results";
      }
      $conn->close();
?>
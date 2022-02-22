<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=no">
        <link rel="stylesheet" href="bootstrap.min.css">
        <link rel="stylesheet" href="style.css" />
    </head>
    
    <body>
        <div class = "fixed-top" >
            <nav class="navbar navbar-expand-lg" id="mainNav" data-role="header" data-position="fixed">
                <div class="container">
                    <a class="navbar-brand" href="#"><img src="brand.PNG" /></a>
                    <button class="navbar-toggler text-uppercase font-weight-bold text-white rounded" type="button" onclick="showMenu()">
                        <img src="burger_menu.jpg" style="width: 30px; height: 30px" />
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item mx-lg-1"><a class="px-lg-3 rounded" href="#">Buy my pixels</a></li>
                            <li class="nav-item mx-lg-1"><a class="px-lg-3 rounded" href="about.php">About the project</a></li>
                            <li class="nav-item mx-lg-1"><a class="px-lg-3 rounded" href="#"><img src="wallet.jpg" style="width: 16px; height: 16px;"/></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="title" id="title">
                <p><b>Buy my pixels and promote yourself</b></p>
                <p style="color: red" id="toPC">To buy my pixels, please visit me on your PC</p>
            </div>
        </div>
        <div>
            
            <div id="myModal" class="mymodal">
                <div class="mymodal-content">
                    <img src = "cross.jpg" style="position: absolute; width: 10px; height: 10px; top: 10px; right: 10px" onclick="cancel()">
                    <p class="modalP small"><span id="numseconds">200</span> seconds to deselect the area</p>
                    <br />
                    <p class="modalP"><b>Total select area: </b> <span id="numcells">8</span> squares</p>
                    <p class="modalP"><b>Total price: </b> <span id="price">8</span> USD</p>
                    <p class="modalP"><b>Total price in MATIC: </b> 302.339812 MATIC</p>
                    <br>
                    <p class="modalP"><b>Your wallet</b></p>
                    <p class="modalP">39293JDSKQ03LS2DFQWI23</p>
                    <p class="modalSmallP">Please make sure you have enough MATIC coins in your wallet!</p>
                    <p class="modalP">1 MATIC=2.16 USDT</p>
                    <br>
                    <p class="center">Upload the logo that you want to fill the squares with (png, jpg, gif)</p>
                    <div class="center">
                    <div class="form-input">
                        
                        <label for="file-ip-1"><img src="uploadIcon.png" />Upload your logo</label>
                        <input type="file" id="file-ip-1" accept="image/*" onchange="showPreview(event);">
                        <p>preview:</p>
                        <div class="preview center">
                            <img id="file-ip-1-preview">
                        </div>
                        <p class="error" id="fileerror" style="text-align: center">* Must select logo</p>
                    </div>
                    </div> 
                    <div class="form-center">
                    <p class="center"><b>Enter the URL that you want your logo to link to</b></p>
                    <input class="form-control centerAlign" type="input" placeholder="URL" id="url">
                    <p class="error" id="urlerror">* Must input valid URL</p>  
                    <div>
                        <input type="checkbox" id="check">
                        <span>I agree with the <u>terms&conditions</u></span>
                        <p class="error" id="checkerror">* Don't you agree?</p>
                    </div>
                    <button type="button" class="btn btn-primary centerAlign buyBtn" data-dismiss="modal" onclick="SetImage()">Buy now</button>
                    </div>
                </div>
            </div>
            <div class="alert alert-danger" role="alert" id="alert">
                Your area is overlapped with others. <a href="#" class="alert-link" onclick="refresh()">Refresh</a> and see.
            </div>
            <canvas id="myBoard" width="1001" height="5001"></canvas>
            <div id="images">
                
            </div>
        </div>

        <div class="copyright py-3">
            <div class="container"><small>Copyright &copy; 2021 Buy my pixels. All rights reserved</small></div>
        </div>
        <script type="text/javascript" src="jquery-3.6.0.min.js"></script>
        <script type="text/javascript" src="popper.min.js"></script>
        <script type="text/javascript" src="bootstrap.min.js"></script>
        <script type="text/javascript" src="myBoard2.js"></script>
    </body>
</html>
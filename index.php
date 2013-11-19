<?php
	mysql_connect('localhost','jacksong','freemanisgman');
	mysql_select_db('jacksong_hackalone');
	$result = mysql_query("SELECT * FROM events WHERE date < NOW() ORDER BY date DESC LIMIT 1");
	$recent = mysql_fetch_assoc($result);
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Hackalone: A new kind of hackathon for introverts</title>
		<link href="css/style.css" rel="stylesheet" type="text/css" />
		<script src="js/modernizr.js"></script>
	</head>
	<body>
		<header>
			<?php echo 'Last hackalone: '.$recent[date].' in '.$recent[city]; ?><br>
			Use command `tweet` to share #hackalone
		</header>
		<section>
			<form class="active">
				<input spellcheck="false" autocomplete="off" type="text" placeholder="Type `help` or `?` to begin" />
			</form>
		</section>
		<footer>
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" type="text/javascript"></script>
			<script src="js/date.js" type="text/javascript"></script>
			<script src="js/script.js" type="text/javascript"></script>
			<script type="text/javascript">
  var GoSquared = {};
  GoSquared.acct = "GSN-681391-I";
  (function(w){
    function gs(){
      w._gstc_lt = +new Date;
      var d = document, g = d.createElement("script");
      g.type = "text/javascript";
      g.src = "//d1l6p2sc9645hc.cloudfront.net/tracker.js";
      var s = d.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(g, s);
    }
    w.addEventListener ?
      w.addEventListener("load", gs, false) :
      w.attachEvent("onload", gs);
  })(window);
</script>
		</footer>
	</body>
</html>
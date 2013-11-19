<?php
	mysql_connect('localhost','jacksong','freemanisgman');
	mysql_select_db('jacksong_hackalone');

	if ($_POST['q'] == 'next') {
		$next_result = mysql_query("SELECT * FROM events WHERE NOW() < date ORDER BY date DESC LIMIT 1");
		$next = mysql_fetch_assoc($next_result);
		echo 'Next hackalone: '.$next[date].' in '.$next[city].' at '.$next[venue].' with '.preg_replace('/,([^,]*)$/', ' & \1', $next[hackers]);
	}

	if ($_POST['q'] == 'last') {
		$last_result = mysql_query("SELECT * FROM events WHERE date < NOW() ORDER BY date DESC LIMIT 1");
		$last = mysql_fetch_assoc($last_result);
		echo 'Last hackalone: '.$last[date].' in '.$last[city].' at '.$last[venue].' with '.preg_replace('/,([^,]*)$/', ' & \1', $last[hackers]);
	}

	if ($_POST['q'] == 'old') {
		$next_result = mysql_query("SELECT * FROM events WHERE date < NOW() ORDER BY date DESC");
		while ($row = mysql_fetch_assoc($next_result)) {
		    echo $row[date].' '.$row['city'].' '.$row['venue'].' '.$row['hackers'].'<br>';
		}
	}

	if ($_POST['q'] == 'new') {
		$next_result = mysql_query("SELECT * FROM events WHERE date > NOW() ORDER BY date DESC");
		while ($row = mysql_fetch_assoc($next_result)) {
		    echo $row[date].' '.$row['city'].' '.$row['venue'].' '.$row['hackers'].'<br>';
		}
	}

	if ($_POST['q'] == 'current') {
		$next_result = mysql_query("SELECT * FROM events WHERE date BETWEEN NOW() AND DATE_SUB(NOW(),INTERVAL 340 MINUTE)");
		while ($row = mysql_fetch_assoc($next_result)) {
	    	echo $row[date].' '.$row['city'].' '.$row['venue'].' '.$row['hackers'].'<br>';
		}
		if (!($row = mysql_fetch_assoc($next_result))) {
			echo 'No hackalones currently going on, try using the `ls new events` or `start event` commands';
		}
	}

	if ($_POST['q'] == 'create') {
		$date = $_POST['date'];
		$city = $_POST['city'];
		$venue = $_POST['venue'];
		$hackers = $_POST['hackers'];
		$create = mysql_query("INSERT IGNORE INTO events (date,city,venue,hackers) VALUES ('$date','$city','$venue','$hackers')");
				//post to the @hackalone.org Twitter account.
		$consumerKey    = 'ioHCjGRJeM3fWsOV7F8idw';
		$consumerSecret = 'YD6KuKX4y9Lye3Yvp1VmV3rLolXuluCTczICQTrA';
		$oAuthToken     = '928681248-DRSR1O9HjyS4qPnu00mwFuRUjjXWFBclmPORyvdJ';
		$oAuthSecret    = '2wnj5vmowRVLLdEkn9kqErJKptWNgOeEuOsUvEEzmGU';
		
		require_once('twitteroauth.php');
		
		// create a new instance
		$tweet = new TwitterOAuth($consumerKey, $consumerSecret, $oAuthToken, $oAuthSecret);
		
		//send a tweet
		$tweet->post('statuses/update', array('status' => 'New hackalone scheduled '.$date.' at '.$venue.' in '.$city.' with '.$hackers.'.'));

	}

	if ($_POST['q'] == 'shit') {
		$json = file_get_contents("https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=shit_HN_says&count=200", true);
		echo $json;
	}
?>
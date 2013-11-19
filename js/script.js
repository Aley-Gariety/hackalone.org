var questionsAsked = [],
	lastQuestionCount = 0

if (localStorage.getItem('name')) {
	var name = localStorage.getItem('name')
} else {
	var name = "Use command `my name is`"
}

$(function(){

	if (!Modernizr.placeholder || /Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
		$('form.active input').val('Type `help` or `?` to begin').on('keydown',function(){
			$(this).val('')
			$(this).off('keydown')
		})
	}

	function lastQuestion(e) {
		key = e.which
		if (e.which == 38) {
			lastQuestionCount++
		} else if (e.which == 40) {
			lastQuestionCount--
		}
		if (e.which == 38 || e.which == 40) {
			setTimeout(function(){
				if (questionsAsked[questionsAsked.length - lastQuestionCount] != null) {
					$('form.active input').val(questionsAsked[questionsAsked.length - lastQuestionCount])
				}
				$('form.active input').val($('form.active input').val())
			},0)
		}
	}

	$('form.active input').on('keydown',lastQuestion);

	function toTitleCase(str) {
	    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}

	function setName(question,command) {
		var input = toTitleCase(question.toLowerCase().split(command)[1])
		if (input !== '') {
			name = input
			localStorage.setItem('name',input)
			return 'Hello, ' + input
		} else {
			return "You don't have a name?"
		}
	}

	function echoName(question) {
		return "You're " + name
	}

	function help(question) {
		return "whats this&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;defines hackalone<br>howto&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hackalone creation instructions<br>rules&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hackalone rules & regulations<br>last event&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where and when was the last hackalone<br>next event&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where and when is the next hackalone<br>start event&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schedule a hackalone in our database<br>ls new events&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list the details of all upcoming hackalones<br>ls old events&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list the details of all past events<br>ls founders&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list the founders of hackalone<br>email [first name] email a founder by their first name<br>email all&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;compose an email to all founders"
	}

	function badGrammar(question) {
		return 'Grammar, please!'
	}

	function rules(question) {
		return "1.&nbsp;You&nbsp;do&nbsp;not&nbsp;tell&nbsp;other players&nbsp;about&nbsp;your&nbsp;idea<br>2.&nbsp;You&nbsp;DO&nbsp;NOT&nbsp;tell&nbsp;other players&nbsp;about&nbsp;your&nbsp;idea<br>3.&nbsp;No&nbsp;hackalones&nbsp;have&nbsp;any&nbsp;winners&nbsp;or&nbsp;prizes<br>4.&nbsp;Only one guy to a each hack<br>5.&nbsp;Each person writes one hack at a time<br>6.&nbsp;You&nbsp;may&nbsp;not&nbsp;start&nbsp;executing&nbsp;the&nbsp;idea&nbsp;before&nbsp;the&nbsp;hackalone<br>7.&nbsp;If&nbsp;it&nbsp;exists,&nbsp;it&nbsp;can&nbsp;be&nbsp;hackin'<br>9.&nbsp;Presentations go on as long as they have to<br>8. If this is your first hackalone, you have to finish"
	}

	function whatsThis(question) {
		return "The hackalone is a new kind of hackathon for introverts. All you<br>need are laptops and people to hack on them. Get together,<br>pick ideas (but keep them secret), then begin the hacking (no talking).<br>No teams, no stress, no conflict resolution."
	}

	var commands = [
		{
			name: 'foo',
			callback: function(question) {
				if (question === 'foo') {
					return 'bar';
				} else {
					return 'Command not found: `' + question + '`';
				}
			}
		},
		{
			name: "what's this",
			callback: whatsThis
		},
		{
			name: "whats this",
			callback: whatsThis
		},
		{
			name: 'my name is',
			callback: setName
		},
		{
			name: 'call me',
			callback: setName
		},
		{
			name: 'i am',
			callback: setName
		},
		{
			name: 'who am i',
			callback: echoName
		},
		{
			name: 'who am i?',
			callback: echoName
		},
		{
			name: 'whoami',
			callback: echoName
		},
		{
			name: 'help',
			callback: help
		},
		{
			name: '?',
			callback: help
		},
		{
			name: 'who is me',
			callback: badGrammar
		},
		{
			name: 'whoisme',
			callback: badGrammar
		},
		{
			name: 'who is me?',
			callback: badGrammar
		},
		{
			name: 'ls founders',
			callback: function(question) {
				return 'Jackson Gariety&nbsp;&nbsp;&nbsp;&nbsp;Handle: @Jacksongariety … Place: Portland, OR<br>Colby Aley&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Handle: @ColbyAley … Place: Portland, OR<br>Lucian Novosel&nbsp;&nbsp;&nbsp;&nbsp; Handle: @LucianNovo … Place: Portland, OR'
			}
		},
		{
			name: 'email',
			callback: function(question,command) {
				var input = question.split(command)[1]
				if (input.toLowerCase() === ' jackson') {
					window.location.href = 'mailto:personal@jacksongariety.com?subject=Hackalone Inquiry'
				} else if (input.toLowerCase() === ' colby') {
					window.location.href = 'mailto:colby@aley.me?subject=Hackalone Inquiry'
				} else if (input.toLowerCase() === ' lucian') {
					window.location.href = 'mailto:lucian.novo@gmail.com?subject=Hackalone Inquiry'
				} else if (input.toLowerCase() === ' all' || input === ' founders' || input == 4) {
					window.location.href = 'mailto:lucian.novo@gmail.com,colby@aley.me,personal@jacksongariety.com?subject=Hackalone Inquiry'
				} else if (typeof input === 'string') {
					return 'Use command `ls founders` to get founder names'
				}

				return 'Email client invoked if present on system'
			}
		},
		{
			name: 'shit hn says',
			callback: function(question) {
				var textContainer
				$.ajax({
					type: 'POST',
					async: false,
					url: 'http://hackalone.org/api/',
					data: {
						q: 'shit'
					},
					success: function(data) {
						data = $.parseJSON(data)
						var rand = Math.floor(Math.random()*data.length);
						textContainer = data[rand].text;
					}
				});
				return textContainer;
			}
		},
		{
			name: 'izzle in the hizzle',
			callback: function(question) {
				return 'fo shizz ma rizzle'
			}
		},
		{
			name: 'yo dawg',
			callback: function(question) {
				return "I herd u liek hackin' so I put some hacks in your hackathons so your hacks could get hacked even with friends"
			}
		},
		{
			name: 'rules',
			callback: rules
		},
		{
			name: 'howto',
			callback: function(question) {
				return 'Begin&nbsp;your&nbsp;hackalone&nbsp;by&nbsp;giving&nbsp;everyone&nbsp;20&nbsp;minutes&nbsp;to&nbsp;pick&nbsp;an&nbsp;idea&nbsp;to&nbsp;hack&nbsp;on.<br>After&nbsp;20&nbsp;minutes,&nbsp;tell&nbsp;everyone&nbsp;to&nbsp;put&nbsp;on&nbsp;headphones&nbsp;and&nbsp;announce&nbsp;the&nbsp;development&nbsp;segment<br>After&nbsp;3&nbsp;hours,&nbsp;remove&nbsp;headphones&nbsp;and&nbsp;halt&nbsp;all&nbsp;writing&nbsp;of&nbsp;code,&nbsp;no&nbsp;exceptions<br>Give&nbsp;everyone&nbsp;20&nbsp;minutes&nbsp;to&nbsp;put&nbsp;together&nbsp;a&nbsp;presentation<br>After&nbsp;20&nbsp;minutes,&nbsp;close&nbsp;all&nbsp;laptops,&nbsp;select&nbsp;a&nbsp;player&nbsp;at&nbsp;random&nbsp;and&nbsp;plug&nbsp;him&nbsp;into&nbsp;the&nbsp;projector<br>Presentations&nbsp;go&nbsp;on&nbsp;as&nbsp;long&nbsp;as&nbsp;they&nbsp;have&nbsp;to'
			}
		},
		{
			name: 'clear',
			callback: function(question) {
				location.reload()
				return 'ending...'
			}
		},
		{
			name: 'exit',
			callback: function(question) {
				location.reload()
				return 'ending...'
			}
		},
		{
			name: 'last event',
			callback: function(question) {
				var lastEvent
				$.ajax({
					type: 'POST',
					async: false,
					url: 'http://hackalone.org/api/',
					data: {
						q: 'last'
					},
					success: function(data) {
						lastEvent = data
					}
				});
				return lastEvent
			}
		},
		{
			name: 'next event',
			callback: function(question) {
				var nextEvent
				$.ajax({
					type: 'POST',
					async: false,
					url: 'http://hackalone.org/api/',
					data: {
						q: 'next'
					},
					success: function(data) {
						nextEvent = data
					}
				});
				return nextEvent
			}
		},
		{
			name: 'ls old events',
			callback: function(question) {
				var oldEvents
				$.ajax({
					type: 'POST',
					async: false,
					url: 'http://hackalone.org/api/',
					data: {
						q: 'old'
					},
					success: function(data) {
						oldEvents = data
					}
				});
				return oldEvents
			}
		},
		{
			name: 'ls new events',
			callback: function(question) {
				var oldEvents
				$.ajax({
					type: 'POST',
					async: false,
					url: 'http://hackalone.org/api/',
					data: {
						q: 'new'
					},
					success: function(data) {
						oldEvents = data
					}
				});
				return oldEvents
			}
		},
		{
			name: 'ls current events',
			callback: function(question) {
				var oldEvents
				$.ajax({
					type: 'POST',
					async: false,
					url: 'http://hackalone.org/api/',
					data: {
						q: 'current'
					},
					success: function(data) {
						oldEvents = data
					}
				});
				return oldEvents
			}
		},
		{
			name: 'what time is it',
			callback: function(question) {
				return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);
			}
		},
		{
			name: 'start event',
			callback: function(question) {
				return 'SYNTAX: create (yyyy-m-d H:m:s),(city and state),(venue name and address),(your name)<br>NOTE: Parenthesis are part of the syntax & time format is 24 hour UTC<br>EXAMPLE: `create (2012-3-5 16:30:00),(Portland Oregon),(Collective Agency (322 NW 6th Ave.)),(Jackson Gariety)`'
			}
		},
		{
			name: 'create',
			callback: function(question) {
				var createParser = question.split('),(')
				var date = createParser[0].replace('create (','')
				if (Date.parseExact(date, "yyy-m-d H:m:s") !== null) {
					$.ajax({
						type: 'POST',
						async: false,
						url: 'http://hackalone.org/api/',
						data: {
							q: 'create',
							date: date,
							city: createParser[1],
							venue: createParser[2],
							hackers: createParser[3].replace(')','')
						},
						success: function(data) {
						}
					});
					return 'Event created successfully!'
				} else {
					return 'Invalid date format'
				}
			}
		},
		{
			name: 'who are you',
			callback: function(question) {
				return 'I am the server'
			}
		},
		{
			name: 'tweet',
			callback: function(question) {
				window.open('https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fhackalone.org%2F&source=tweetbutton&text=%23hackalone:%20a%20new%20kind%20of%20hackathon%20for%20introverts%20&url=http://hackalone.org&via=Hackaloneorg');
				return 'tweeting...'
			}
		}
	]

	function answer(question) {
		for (i in commands) {
			var name = commands[i].name,
				callback = commands[i].callback
			if (question.toLowerCase().substr(0,name.length) === name) {
				if (callback.length === 1) {
					return callback(question);
				} else if (callback.length === 2) {
					return callback(question,name);
				}
			}
		}
		return 'Command not found: `' + question + '`';
	}

	function consoleSubmit(e) {
		e.preventDefault();
		var _this = $('form.active input'),
			question = $('form.active input').val(),
			response = answer(question);
		questionsAsked.push(question);
		$(this).after('<div class="answer">'+response+'</div><form class="active"><input spellcheck="false" autocomplete="off" type="text" /></form>').removeClass('active').addClass('inactive').children('input').attr('disabled','disabled')
		$('form.active input').focus();
		$('form').submit(consoleSubmit);
		$('form.active input').on('keydown',lastQuestion);
	}
	$('input').focus()
	$('form').submit(consoleSubmit);
	$('body,html').click(function(){
		$('form.active input').focus()
	})
});
$(document).ready(function() {
	var audio;

	//Hide Pause button
	$('#pause').hide();

	function initAudio(element) {
		var song = element.attr('song');
		var title = element.text();
		var cover = element.attr('cover');
		var artist = element.attr('artist');

		// Create an audio object
		audio = new Audio('media/' + song);

		if(!audio.currentTime) {
			$('#duration').html('0.00');
		}

		$('#audio-player .title').text(title);
		$('#audio-player .artist').text(artist);

		$('img.cover').attr('src','img/covers/' + cover);

		$('#playlist li').removeClass("active");
		element.addClass("active");
	}

	initAudio($('#playlist li:first-child'));

	function updateView() {
		audio.addEventListener('timeupdate', function() {
			var s = parseInt(audio.currentTime % 60);
			var m = parseInt((audio.currentTime) / 60) % 60;
			// Add 0 if less than 10
			if(s < 10) {
				s = '0' + s;
			}
			$('#duration').html(m + '.' + s);
			var duration = audio.duration;
			var value = (audio.currentTime / duration)*100;
			if(duration > 0) {
				$('#progress').css('width', value+'%');
			}
		});
	}
	// Play
	$('#play').click(function() {
		audio.play();

		$('#play').hide();
		$('#pause').show();

		$('#duration').fadeIn(400);
		updateView();
	});

	// Pause
	$('#pause').click(function() {
		audio.pause();

		$('#pause').hide();
		$('#play').show();
	});


	// Stop
	$('#stop').click(function() {
		audio.pause();
		audio.currentTime = 0;
		$('#pause').hide();
		$('#play').show();
		$('#duration').fadeOut(400);
	});

	$('#next').click(function () {
		audio.pause();
		var next = $('#playlist li.active').next();
		if(next.length === 0) {
			next = $('#playlist li:first-child');
		}
		initAudio(next);
		updateView();
		audio.play();
	});

	$('#prev').click(function () {
		audio.pause();
		var prev = $('#playlist li.active').prev();
		if(prev.length === 0) {
			prev = $('#playlist li:last-child');
		}
		initAudio(prev);
		updateView();
		audio.play();
	});


	// Volume control
	$('#volume').change(function() {
		audio.volume = parseFloat(this.value / 10);
	});


	/*
	function showDuration() {		
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt((audio.currentTime) / 60) % 60;
		// Add 0 if less than 10
		if(s < 10) {
			s = '0' + s;
		}
		$('#duration').html(m + '.' + s);
	}
	*/
});
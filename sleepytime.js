var FOURTEEN_MIN = 1000 * 60 * 14;
var NINETY_MIN = 1000 * 60 * 90;
var results = document.getElementById('results');

function formatTime (date) {
	var hours = date.getHours(),
		minutes = date.getMinutes();
	return hours + ":" + (minutes < 10 ? "0" + minutes : minutes);
}

function wakeupTimes (bedtime) {
	bedtime = +bedtime + FOURTEEN_MIN;
	return [0, 0, 0, 0, 0, 0].map(
		function(_, i){
			return new Date(bedtime + NINETY_MIN * (i + 1));
		}
	);
}

function updateWakeupTimes(wakeupTimes) {
	var timeNodes = results.children;
	for (var time in wakeupTimes) {
		timeNodes[time].textContent = formatTime(wakeupTimes[time]);
	}
}

function tick(){
	var now = new Date();
	updateWakeupTimes(wakeupTimes(now));
	setTimeout(tick, 60000 - now % 60000);
}

tick();

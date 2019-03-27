"use strict";
var cachedZeroIndex;
var timeZoneEl = document.getElementById("time-zone");
var timeEl = document.getElementById("time-span");
var chosenTZ;

(function find5pm() {
  var timeZoneArr = spacetime.whereIts("5pm");
  if (cachedZeroIndex === timeZoneArr[0]) {
    updateTime();
    setTimeout(find5pm, 1000);
    return;
  }
  cachedZeroIndex = timeZoneArr[0];
  timeZoneArr = timeZoneArr.filter(zone => {
    return !RegExp(".tc/gmt").test(zone); 
  });
  chosenTZ = timeZoneArr[Math.floor(Math.random() * timeZoneArr.length)];
  timeZoneEl.textContent = chosenTZ.split("/")[1].replace(/_/, " ");
  updateTime();
  setTimeout(find5pm, 1000);
})();

function updateTime() {
  var d = spacetime.now(chosenTZ);
  timeEl.textContent = d.time();
}
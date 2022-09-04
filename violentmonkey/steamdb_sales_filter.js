// ==UserScript==
// @name        SteamDB Sales Filter
// @namespace   Violentmonkey Scripts
// @match       https://steamdb.info/sales/*
// @grant       none
// @version     1.0
// @author      -
// @description 9/3/2022, 6:50:35 PM
// ==/UserScript==

// Run-At: "document-end"
// Base URL: https://steamdb.info/sales/?displayOnly=AllOwnedGamesDLC&min_reviews=0&min_rating=0&min_discount=0&tagid=-1756%2C-7948%2C-1621

const games_to_exclude = [
  "Monster Hunter",
  "Devil May Cry",
  "Street Fighter",
  "USFIV",
  "Killing Floor",
  "OST",
  "Soundtrack",
  "KF2",
  "Cities: Skylines",
  "Capcom Arcade Stadium",
  "Artbook",
  "Power Rangers",
  "Watch_Dogs® 2",
];

//^((?!(Devil May Cry)|(Monster Hunter)).)*$
var regex = '^((?!';
for (let i = 0; i < games_to_exclude.length; i++) {
  if(i > 0)
    regex += '|(' + games_to_exclude[i] + ')';
  else
    regex += '(' + games_to_exclude[i] + ')';
  //debugger;
}
regex += ').)*$';

var table = $('#DataTables_Table_0').DataTable();
table
  .columns(2)
  .data()
  .search(
    regex, //input
    true, //regex
    false, //smart
    true //caseInsen
  )
  .draw();

/*function needs_exclusion(text){
  var removal = false;
  games_to_exclude.forEach(game => {
    if(text.toLowerCase().includes(game.toLowerCase()))
      removal = true
  });
  return removal
}

table
  .column(2)
  .data()
  .filter(function(value, index){
    //debugger;
    return needs_exclusion(String(value)) ? false : true;
  })
  .draw(); // Draw doesn't work with filter()*/

/*table.on('draw', function() {
  doSomething();  
});*/

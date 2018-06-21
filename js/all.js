var xhr = new XMLHttpRequest();
xhr.open('get',"http://opendata2.epa.gov.tw/AQI.json",true);


xhr.send();
console.log(xhr.responseText);

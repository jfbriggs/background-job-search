var axios = require('axios');
var cheerio = require('cheerio');

module.exports = function() {
  axios.get('http://www.bing.com/search?q=site%3Ajobs.lever.co%20%22software%20engineer%22%20shopify%20-instreamset%3Aurl%3A%22%3Flever-via%22%20-instreamset%3Aurl%3A%22%3Fby%22&qs=n&form=QBRE&sp=-1&pq=site%3Ajobs.lever.co%20%22software%20engineer%22%20shopify%20-instreamset%3Aurl%3A%22%3Flever-via%22%20-instreamset%3Aurl%3A%22%3Fby%22').then(function(res) {
    var $ = cheerio.load(res.data);
    $('a').each(function(i, elem) {
      var link = $(this).attr('href');
      if (link !== undefined && link.substring(0, 4) === 'http' && !link.includes('apply') && link.substring(10, 19) !== 'microsoft') {
        console.log($(this).attr('href'));
      }
    });

    setTimeout(function() {
      axios.get('http://www.bing.com/search?q=site%3ajobs.lever.co+%22software+engineer%22+shopify+-instreamset%3aurl%3a%22%3flever-via%22+-instreamset%3aurl%3a%22%3fby%22&qs=n&sp=-1&pq=site%3ajobs.lever.co+%22software+engineer%22+shopify+-instreamset%3aurl%3a%22%3flever-via%22+-instreamset%3aurl%3a%22%3fby%22&first=11').then(function(res) {
      var $ = cheerio.load(res.data);
      $('a').each(function(i, elem) {
        var link = $(this).attr('href');
        if (link !== undefined && link.substring(0, 4) === 'http' && !link.includes('apply') && link.substring(10, 19) !== 'microsoft') {
          console.log($(this).attr('href'));
        }
      });
    }, 10000);
    
  });

  });
}
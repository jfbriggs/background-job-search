var axios = require('axios');
var cheerio = require('cheerio');

var grabPostingData = function(array, cb) {
  var postings = [];

  var getPosting = function(index) {
    console.log('Getting posting data for url:', array[index]);
    var data = {};
    axios.get(array[index]).then(function(res) {
      var $ = cheerio.load(res.data);
      data.company = $('.main-footer-text a').text().split(' ')[0];
      data.title = $('.posting-headline h2').text();
      data.location = $('.sort-by-time').text();
      data.link = array[index];

      console.log(data);
      console.log('Has title?', !!data.title);

      if (data.title) {
        postings.push(data);
      }

      if (array[index + 1]) {
        setTimeout(function() {
          getPosting(index + 1);
        }, 3000);
      } else {
        console.log('Finished.  Attempting to output.');
        cb(postings);
      }
    }).catch(function(err) {
      console.log('Not found, moving on.');
      if (array[index + 1]) {
        setTimeout(function() {
          getPosting(index + 1);
        }, 3000);
      } else {
        console.log('Finished.  Attempting to output.');
        cb(postings);
      }
    });
  }

  getPosting(0);

};

module.exports = function(cb) {
  var results = [];

  axios.get('http://www.bing.com/search?q=site%3Ajobs.lever.co%20%22software%20engineer%22%20shopify%20-instreamset%3Aurl%3A%22%3Flever-via%22%20-instreamset%3Aurl%3A%22%3Fby%22&qs=n&form=QBRE&sp=-1&pq=site%3Ajobs.lever.co%20%22software%20engineer%22%20shopify%20-instreamset%3Aurl%3A%22%3Flever-via%22%20-instreamset%3Aurl%3A%22%3Fby%22').then(function(res) {
    var $ = cheerio.load(res.data);
    $('a').each(function(i, elem) {
      var link = $(this).attr('href');
      if (link !== undefined && link.substring(0, 4) === 'http' && !link.includes('apply') && link.substring(10, 19) !== 'microsoft') {
        results.push($(this).attr('href'));
      }
    });

    setTimeout(function() {
      axios.get('http://www.bing.com/search?q=site%3ajobs.lever.co+%22software+engineer%22+shopify+-instreamset%3aurl%3a%22%3flever-via%22+-instreamset%3aurl%3a%22%3fby%22&qs=n&sp=-1&pq=site%3ajobs.lever.co+%22software+engineer%22+shopify+-instreamset%3aurl%3a%22%3flever-via%22+-instreamset%3aurl%3a%22%3fby%22&first=11').then(function(res) {
        var $ = cheerio.load(res.data);
        $('a').each(function(i, elem) {
          var link = $(this).attr('href');
          if (link !== undefined && link.substring(0, 4) === 'http' && !link.includes('apply') && link.substring(10, 19) !== 'microsoft') {
            results.push($(this).attr('href'));
          }
        });

        return grabPostingData(results, cb);
      });
    
    }, 5000);

  });
}

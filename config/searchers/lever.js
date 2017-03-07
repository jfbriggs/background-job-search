var axios = require('axios');
var cheerio = require('cheerio');

var grabPostingData = function(array, cb) {
  var postings = [];

  var getPosting = function(index) {
    console.log('Getting posting data for url:', array[index]);
    var data = {};
    axios.get(array[index]).then(function(res) {
      var $ = cheerio.load(res.data);
      data.company = $('title').text().split(' - ')[0];
      data.title = $('.posting-headline h2').text();
      data.location = $('.sort-by-time').text();
      data.link = array[index];

      console.log(data);

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

module.exports = function(metadata, cb) {
  var results = [];

  var searchTitle = metadata.title.split(' ').join('%20');
  var searchCity = metadata.city.split(' ').join('%20');

  var currentStart = 11;
  var dupes = false;

  axios.get('http://www.bing.com/search?q=site%3ajobs.lever.co+%22' + searchTitle + '%22+%22' + searchCity + '%22+-instreamset%3aurl%3a%22lever-via%22+-instreamset%3aurl%3a%22%3fby%22&qs=n&sp=-1&pq=site%3ajobs.lever.co+%22' + searchTitle + '%22+%22' + searchCity + '%22+-instreamset%3aurl%3a%22lever-via%22+-instreamset%3aurl%3a%22%3fby%22').then(function(res) {
    console.log('Getting first page of results.');
    var $ = cheerio.load(res.data);
    $('a').each(function(i, elem) {
      var link = $(this).attr('href');
      if (link !== undefined && link.substring(0, 4) === 'http' && !link.includes('apply') && link.substring(10, 19) !== 'microsoft' && !link.includes('location') && !link.includes('team') && !link.includes('commitment')) {
        results.push($(this).attr('href'));
      }
    });

    var getNextPage = function() {
      setTimeout(function() {
        axios.get('http://www.bing.com/search?q=site%3ajobs.lever.co+%22' + searchTitle + '%22+%22' + searchCity + '%22+-instreamset%3aurl%3a%22lever-via%22+-instreamset%3aurl%3a%22%3fby%22&qs=n&sp=-1&pq=site%3ajobs.lever.co+%22' + searchTitle + '%22+%22' + searchCity + '%22+-instreamset%3aurl%3a%22lever-via%22+-instreamset%3aurl%3a%22%3fby%22&first=' + currentStart + '&FORM=PERE').then(function(res) {
          console.log('Getting next pag of results starting at result #', currentStart);
          var $ = cheerio.load(res.data);
          $('a').each(function(i, elem) {
            var link = $(this).attr('href');
            if (link !== undefined && link.substring(0, 4) === 'http' && !link.includes('apply') && link.substring(10, 19) !== 'microsoft' && !link.includes('location') && !link.includes('team') && !link.includes('commitment')) {
              if (results.includes($(this).attr('href'))) {
                dupes = true;
              } else {
                results.push($(this).attr('href'));
              }
            }
          });

          currentStart += 14;
          
          console.log('Results length now:', results.length);

          var sbCount = $('span.sb_count').text().split(' ')[2] 
          console.log('sbCount is', sbCount);


          if (currentStart <= sbCount) {
            console.log('Another page of results available.  Getting.');
            getNextPage();
          } else {
            console.log('No more pages of results left or getting duplicates.  Moving on.')
            return grabPostingData(results, cb);
          }

        });
      
      }, 3000);
      
    }

    getNextPage();


  });
}

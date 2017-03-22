var axios = require('axios');
var cheerio = require('cheerio');

// var grabPostingData = function(array, cb) {
//   var postings = [];

//   var getPosting = function(index) {
//     console.log('Getting posting data for url:', array[index]);
//     var data = {};
//     axios.get(array[index]).then(function(res) {
//       var $ = cheerio.load(res.data);
//       data.company = $('title').text().split(' job at ')[1].split(' - ')[0];
//       data.title = $('title').text().split(' job at ')[0];
//       data.location = $('.high-concept').text().split(' &middot; ')[0];
//       data.link = array[index];

//       console.log(data);

//       if (data.title) {
//         postings.push(data);
//       }

//       if (array[index + 1]) {
//         setTimeout(function() {
//           getPosting(index + 1);
//         }, 3000);
//       } else {
//         console.log('Finished.  Attempting to output.');
//         cb(postings);
//       }
//     }).catch(function(err) {
//       console.log('Not found, moving on.');
//       if (array[index + 1]) {
//         setTimeout(function() {
//           getPosting(index + 1);
//         }, 3000);
//       } else {
//         console.log('Finished.  Attempting to output.');
//         cb(postings);
//       }
//     });
//   }

//   getPosting(0);

// };

module.exports = function(metadata, cb) {
  var results = [];
  var links = [];

  var searchTitle = metadata.title.split(' ').join('%20');
  var searchCity = metadata.city.split(' ').join('%20');

  var currentStart = 11;
  var dupes = false;

  axios.get('http://www.bing.com/search?q=site%3Aangel.co%20%22' + searchTitle + '%22%20%22' + searchCity + '%22%20intitle%3A%22job%20at%22&qs=n&form=QBRE&sp=-1&pq=site%3Aangel.co%20%22' + searchTitle + '%22%20%22' + searchCity + '%22%20intitle%3A%22job%20at%22').then(function(res) {
    console.log('Getting first page of results.');
    var $ = cheerio.load(res.data);
    $('li.b_algo').each(function(i, elem) {
      var link = $(this).find('a').attr('href');
      var title = $(this).find('a').text().split(' job ')[0];
      var company = $(this).find('p').text().split(' job at ')[1].split(' in ')[0];
      var location = $(this).find('p').text().split(' in ')[1].split(' ... ')[0].split(' - ')[0];

      if (link !== undefined && link.substring(0, 4) === 'http' && !link.includes('apply') && link.substring(10, 19) !== 'microsoft') {
        links.push($(this).attr('href'));
        var dataObj = {company: company, title: title, location: location, link: link}; 
        console.log(dataObj);
        results.push(dataObj);
      }
    });

    var getNextPage = function() {
      setTimeout(function() {
        axios.get('http://www.bing.com/search?q=site%3aangel.co+%22' + searchTitle + '%22+%22' + searchCity + '%22+intitle%3a%22job+at%22&qs=n&sp=-1&pq=site%3aangel.co+%22' + searchTitle + '%22+%22' + searchCity + '%22+intitle%3a%22job+at%22&first=' + currentStart + '&FORM=PERE').then(function(res) {
          console.log('Getting next pag of results starting at result #', currentStart);
          var $ = cheerio.load(res.data);
          $('li.b_algo').each(function(i, elem) {
            console.log($(this).find('p').text().substring(0, 5));
            var link = $(this).find('a').attr('href');
            var title = $(this).find('a').text().split(' job ')[0];
            if (!$(this).find('p').text().includes('job at')) {
              var company = $(this).find('p').text().split(' at ')[1].split('.')[0];
              var location = $(this).find('p').text().split('. ')[1].split(' &#183; ')[0];
            } else {
              var company = $(this).find('p').text().split(' job at ')[1].split(' in ')[0];
              var location = $(this).find('p').text().split(' in ')[1].split(' ... ')[0].split(' - ')[0];
            }

            if (link !== undefined && link.substring(0, 4) === 'http' && !link.includes('apply') && link.substring(10, 19) !== 'microsoft') {
              if (links.includes($(this).attr('href'))) {
                dupes = true;
              } else {
                links.push($(this).attr('href'));
                var dataObj = {company: company, title: title, location: location, link: link}; 
                console.log(dataObj);
                results.push(dataObj);
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
            cb(results);
          }

        });
      
      }, 3000);
      
    }

    getNextPage();


  });
}

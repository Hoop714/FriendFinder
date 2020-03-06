// Dependencies
var friends = require('../data/friends.js');

// Export the function
module.exports = function (app) {

    // Sets the get for the api/friends route
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    // Set the post for the api/friends route
    app.post('/api/friends', function (req, res) {

        // Create Variables
        var diff = 40;
        var matchedName = '';
        var matchedPhoto = '';

        // For-each loop to go through the data in friends.js and find a match
        friends.forEach(function (friend) {

            var matchedScoresArray = [];
            var totaldiff = 40;

            // Function to assist in the addition reduce() below
            function add(total, num) {
                return total + num;
            }

            // This loops through each item of the scores arrays
            for (var i = 0; i < friend.scores.length; i++) {
                matchedScoresArray.push(Math.abs(parseInt(req.body.scores[i]) - parseInt(friend.scores[i])));

            }

            // This reduces the matchScoresArray into a single value in a variable
            totaldiff = matchedScoresArray.reduce(add, 0);

            if (totaldiff < diff) {
                diff = totaldiff;

                matchedName = friend.name;
                matchedPhoto = friend.photo;
            }
        });
        // Once the cycle is complete, the match with the least diff will be sent back to the client
        res.json({
            name: matchedName,
            photo: matchedPhoto
        });

        // This adds the new users sent data object to friends.js
        friends.push(req.body);
    });
}

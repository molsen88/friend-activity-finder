var path = require( "path" );
var express = require( "express" )

var friends = require( "../app/data/friends" )

module.exports = function ( app ) {
    app.get( "/api/friends", function ( req, res ) {
        res.json( friends )
    } )


    app.post( "/api/friends", function ( req, res ) {


        var bestMatch = {
            name: "",
            favoriteTeam: "",
            friendDifference: Infinity
        }

        var userData = req.body;
        var userScores = userData.scores;

        var totalDifference;

        for ( i = 0; i < friends.length; i++ ) {
            var currentFriend = friends[i];
            totalDifference = 0;

            for ( var j = 0; j < currentFriend.scores.length; j++ ) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];

                totalDifference += Math.abs( parseInt( currentUserScore ) - parseInt( currentFriendScore ) )
            }
        }
        if ( totalDifference <= bestMatch.friendDifference ) {
            bestMatch.name = currentFriend.name;
        }


        friends.push( userData )

        res.json( bestMatch )
    } )
}
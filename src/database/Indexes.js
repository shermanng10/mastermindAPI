exports.userIndex = function (db) {
    db.collection("users").ensureIndex({ userID: 1},  {unique: true }, 
        function(err, result) {        
            if (err) { console.log (err)}
    })
}
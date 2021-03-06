import {MongoClient} from 'mongodb'
import dbIndexes from './Indexes'
var state = {
	db: null,
}

exports.connect = (url, done) => {
	if (state.db) return done()

	MongoClient.connect(url, (err, db) => {
		if (err) return done(err)
		dbIndexes.userIndex(db)
		state.db = db
		done()
	})
}

exports.get = () => {
	return state.db
}

exports.close = (done) => {
	if (state.db){
		state.db.close((err, result) => {
			state.db = null
			state.mode = null
			done(err)
		})
	}
}
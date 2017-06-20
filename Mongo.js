/**
 * Created by mriba on 18.06.2017.
 */
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/testdb';

let conn;

mongoClient.connect(url)
    .then(db => {
        conn = db;
        console.log('Соединение установлено');
        return db.collection('Students');
    })
    .then(collection => {
        return collection.insert(
                [
                    {name: 'test1', mark: 5},
                    {name: 'test2', mark: 1},
                    {name: 'test3', mark: 5},
                    {name: 'test4', mark: 3}
                ]
            )
            .then(result => {
                console.log('Добавлено строк: ' + result.insertedCount);
                result.ops.forEach(item => console.log(item));
                return collection;
            })
            .catch(err => {
                throw err.message;
            })
    })
    .then(collection => {

        return collection.updateMany({mark: 5}, {'$set':{name:'Отличник'}})
            .then(result => {
                console.log('Обновление');
                console.log(result.result);
                return collection;
            })
            .catch(err => {
                throw err.message;
            })

    })
    .then(collection => {

        return collection.find().toArray()
            .then(result => {
                console.log('Коллекция после обновления');
                console.log(result);
                return collection;
            })
            .catch(err => {
                throw err.message;
            })

    })
    .then(collection => {

        return collection.updateMany({mark: 5}, {'$unset':{name:true}})
            .then(result => {
                console.log('Удаление поля name');
                console.log(result.result);
                return collection;
            })
            .catch(err => {
                throw err.message;
            })

    })
    .then(collection => {

        return collection.find().toArray()
            .then(result => {
                console.log('Коллекция после удаления имен');
                console.log(result);
                return collection;
            })
            .catch(err => {
                throw err.message;
            })

    })
    .then(collection => {
        collection.remove();
        conn.close();
    })
    .catch(err => {
        console.log('Произошла ошибка:' + err);
        conn.close();
    });

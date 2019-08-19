const express = require('express')
const app = express()
const port = 5000

var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://127.0.0.1:8091');
// For Couchbase > 4.5 with RBAC Auth
cluster.authenticate('Administrator', 'parola')
var bucket = cluster.openBucket('licenta');

// bucket.upsert('testdoc', {name:'Frank'}, function(err, result) {
//   if (err) throw err;

//   bucket.get('testdoc', function(err, result) {
//     if (err) throw err;

//     console.log(result.value);
//     // {name: Frank}
//   });
// });
setTimeout(() => {
    console.log("bucket", bucket)
    var N1qlQuery = couchbase.N1qlQuery;
        // ...
        query = N1qlQuery.fromString('SELECT id, title FROM licenta LIMIT 10');

        bucket.query(query, function(err, rows, meta) {
            console.log("query")
            console.log(err)
            console.log(rows)
        for (row in rows) {
            console.log('id: %s. title: %s', row.id, row.title);
        }
});
}, 4000)





const response = [
    {
        id:1,
        title: "title 1 still server",
        description: "descriere text",
        category: "restaurant",
        reward: 3,
        price: 50,
        img: "/assets/imgs/pic1.jpg",
        tel: "0742000001",
        email: "a@b.com",
        facebook: "fb",
        web: "www.obiectiv.ro",
        address: "strada x nr y orasul z",
        geolocation: "36.7667,-122.084",
        timetable: "09:00-18:00",
        rating: 45,
    },
    {
        id:1,
        title: "abc 2",
        description: "descriere text",
        category: "restaurant",
        img: "/assets/imgs/pic2.jpg",
        tel: "0742000001",
        email: "a@b.com",
        facebook: "fb",
        web: "www.obiectiv.ro",
        address: "strada x nr y orasul z",
        geolocation: "46.7667,24.6",
        timetable: "09:00-18:00",
        rating: 15
    },
    {
        id:1,
        title: "abc 3",
        description: "descriere text",
        category: "hotel",
        img: "/assets/imgs/pic3.jpg",
        tel: "0742000001",
        email: "a@b.com",
        facebook: "fb",
        web: "www.obiectiv.ro",
        address: "strada x nr y orasul z",
        geolocation: "49.7667,23.6",
        timetable: "09:00-18:00",
        rating: 45
    },
    {
        id:1,
        title: "title 4",
        description: "descriere text",
        img: "/assets/imgs/pic4.jpg",
        tel: "0742000001",
        email: "a@b.com",
        facebook: "fb",
        web: "www.obiectiv.ro",
        address: "strada x nr y orasul z",
        geolocation: "46.9667,23.6",
        timetable: "09:00-18:00",
        rating: 45
    },
    {
        id:1,
        title: "title 6",
        description: "descriere text",
        img: "/assets/imgs/pic5.jpg",
        tel: "0742000001",
        email: "a@b.com",
        facebook: "fb",
        web: "www.obiectiv.ro",
        address: "strada x nr y orasul z",
        geolocation: "46.8667,23.6",
        timetable: "09:00-18:00",
        rating: 45
    },
    {
        id:1,
        title: "title 7",
        description: "descriere text",
        img: "/assets/imgs/pic6.jpg",
        tel: "0742000001",
        email: "a@b.com",
        facebook: "fb",
        web: "www.obiectiv.ro",
        address: "strada x nr y orasul z",
        geolocation: "46.7667,33.6",
        timetable: "09:00-18:00",
        rating: 45
    }

]
app.get('/getObjectives', (req, res) => res.send(response))

app.get('/login', (req, res) => res.send(response))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
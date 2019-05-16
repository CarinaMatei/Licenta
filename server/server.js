const express = require('express')
const app = express()
const port = 5000

const response = [
    {
        id:1,
        title: "title 1 still server",
        description: "descriere text",
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
        img: "/assets/imgs/pic2.jpg",
        tel: "0742000001",
        email: "a@b.com",
        facebook: "fb",
        web: "www.obiectiv.ro",
        address: "strada x nr y orasul z",
        geolocation: "46.7667,24.6",
        timetable: "09:00-18:00",
        rating: 45
    },
    {
        id:1,
        title: "abc 3",
        description: "descriere text",
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
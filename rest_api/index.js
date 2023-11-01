const express = require("express") // memanggil library express js
const bodyParser = require("body-parser") // memanggil library body-parser
const cors = require("cors") // memanggil library cors
const app = express() //implementasi express

// penggunaan body-parser untuk ekstrak data request berformat JSON
app.use(bodyParser.json())

// penggunaan body-parser untuk ekstrak data request dari body
app.use(bodyParser.urlencoded({extended: true}))

// penggunaan cors agar end point dapat diakses oleh cross platform
app.use(cors())

// endpoint "/test" dengan method GET
app.get("/test", (req,res) => {
    // req merupakan variabel yang berisi data request
    // res merupakan variabel yang berisi data response dari end-point

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        message: "Ini end-point pertama ku", // menampilkan data 
        method: req.method, // menampilkan method 
        code: res.statusCode // menampilkan response code 
    }

    // memberikan response dengan format JSON yang berisi objek di atas
    res.json(response)
})

// endpoint "/profil/nama/umur" dengan method GET
app.get("/profil/:name/:age", (req,res) => {
    // :name dan :age diberikan titik dua didepan menunjukkan "name" dan "age" 
    // bersifat dinamis yang dapat diganti nilai nya saat melakukan request

    // menampung data yang dikirimkan
    let name = req.params.name // mengambil nilai pada parameter name
    let age = req.params.age // mengambil nilai pada parameter age

    // membuat objek yang berisi data yang akan dijadikan response
    // response berisi data nama dan umur sesuai dengan nilai parameter
    let response = {
        nama: name,
        umur: age
    }

    // memberikan response dengan format JSON yang berisi objek di atas
    res.json(response)
})

// end-point "/kecepatan" dengan method POST
app.post("/kecepatan", (req,res) => {
    // menampung data dan mengkonversi menjadi tipe numerik
    let jarak = Number(req.body.jarak) // mengambil nilai pada body jarak
    let waktu = Number(req.body.waktu) // mengambil nilai pada body waktu

    //menghitung nilai kecepatan
    let kecepatan = jarak / waktu

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        jarak: jarak,
        waktu: waktu,
        kecepatan: kecepatan
    }

    // memberikan response dengan format JSON yang berisi objek di atas
    res.json(response)
})

// end-point "/bujur_sangkar" dengan method POST
app.post("/bujur_sangkar", (req,res) => {
    // menampung data dan mengkonversi menjadi tipe numerik
    let panjang = Number(req.body.panjang) // mengambil nilai pada body panjang
    let lebar = Number(req.body.lebar) // mengambil nilai pada body lebar

    let luas = panjang * lebar
    let keliling = 2 * (panjang + lebar)

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        panjang: panjang,
        lebar: lebar,
        luas: luas,
        keliling: keliling
    }

    // memberikan response dengan format JSON yang berisi objek di atas
    res.json(response)
})

app.get("/convert/:suhu/:value", (req,res) => {
    let suhu = req.params.suhu
    let value = Number(req.params.value)

    if (suhu = "celcius") {
        r = (4/5) * value
        f = ((9/5) * value) + 32
        k = value + 273

        result = {
            reamur : r,
            fahrenheit : f,
            kelvin : k
        }
    }
    else if (suhu = "reamur") {
        c = (5/4) * value
        f = ((9/4) * value) + 32
        k = ((5/4) * value) + 273

        result = {
            celcius : c,
            fahrenheit : f,
            kelvin : k
        }
    }
    else if (suhu = "fahrenheit") {
        c = (5/9) * (value - 32)
        r = (4/9) * (value - 32)
        k = ((5/9) * (value - 32)) + 273

        result = {
            celcius : c,
            reamur : r,
            kelvin : k
        }
    }
    else if (suhu = "kelvin") {
        c = K - 273
        r = (4/5) * (K-273)
        f = ((9/5) * (K-273)) + 32

        result = {
            celcius : c,
            reamur : r,
            fahrenheit : f
        }
    }

    let response = {
        suhu: value,
        result: result
    }
    res.json(response)

})


// menjalankan server pada port 8000
app.listen(8000, () => {
    console.log("Server run on port 8000");
})

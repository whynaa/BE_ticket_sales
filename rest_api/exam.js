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

app.get("/panjang/:satuan/:value", (req,res) => {
    let satuan = req.params.satuan
    let value = Number(req.params.value)

    if (satuan == "mm") {
        mm = value
    } else if (satuan == "cm") {
        mm = value * 10
    } else if (satuan == "dm") {
        mm = value * 100
    } else if (satuan == "m") {
        mm = value * 100
    } else if (satuan == "dam") {
        mm = value * 10000
    } else if (satuan == "hm") {
        mm = value * 100000
    } else if (satuan == "km") {
        mm = value * 1000000
    }

    cm = mm / 10
    dm = mm / 100
    m = mm / 1000
    dam = mm / 10000
    hm = mm / 100000
    km = mm / 1000000

    let response = {
        mm : mm,
        cm : cm,
        dm : dm,
        m : m,
        dam : dam,
        hm : hm,
        km : km
    }

    res.json(response)
})

app.get("/berat/:satuan/:value", (req,res) => {
    let satuan = req.params.satuan
    let value = Number(req.params.value)

    if (satuan == "mg") {
        mg = value
    } else if (satuan == "cg") {
        mg = value * 10
    } else if (satuan == "dg") {
        mg = value * 100
    } else if (satuan == "g") {
        mg = value * 100
    } else if (satuan == "dag") {
        mg = value * 10000
    } else if (satuan == "hg") {
        mg = value * 100000
    } else if (satuan == "kg") {
        mg = value * 1000000
    }

    cg = mg / 10
    dg = mg / 100
    g = mg / 1000
    dag = mg / 10000
    hg = mg / 100000
    kg = mg / 1000000

    let response = {
        mg : mg,
        cg : cg,
        dg : dg,
        g : g,
        dag : dag,
        hg : hg,
        kg : kg
    }

    res.json(response)
})

app.post("/kecepatan", (req,res) => {
    let dicari = req.body.dicari
    let v = 0
    let s = 0
    let t = 0
    if (dicari == "v") {
        s = req.body.s
        t = req.body.t
        v = s / t 
    } else if (dicari == "s") {
        v = req.body.v
        t = req.body.t
        s = v * t
    } else if (dicari == "t") {
        v = req.body.v
        s = req.body.s
        t = s / v
    }

    let response = {
        kecepatan : v,
        jarak : s,
        waktu : t
    }

    res.json(response)
})

app.post("/gaya", (req,res) => {
    let dicari = req.body.dicari
    let f = 0
    let m = 0
    let a = 0
    if (dicari == "f") {
        m = req.body.m
        a = req.body.a
        f = m * a 
    } else if (dicari == "m") {
        f = req.body.f
        a = req.body.a
        m = f / a
    } else if (dicari == "a") {
        f = req.body.f
        m = req.body.m
        a = f / m
    }

    let response = {
        gaya : f,
        massa : m,
        percepatan : a
    }

    res.json(response)
})

// menjalankan server pada port 8000
app.listen(8000, () => {
    console.log("Server run on port 8000");
})
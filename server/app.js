const express = require("express");
const path = require("path");
const axios = require("axios");
const { tiktokdl } = require("tiktokdl");

const app = express();
const PORT = 5000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));



// Test API
app.get("/api", (req, res) => {

    res.json({
        success: true,
        message: "Server hidup 🚀"
    });

});




// Ambil data TikTok
app.post("/download", async (req, res) => {

    try {

        const { url } = req.body;


        if (!url) {

            return res.status(400).json({
                success:false,
                message:"URL TikTok belum dimasukkan"
            });

        }



        if (!url.includes("tiktok.com")) {

            return res.status(400).json({
                success:false,
                message:"Link bukan TikTok"
            });

        }



        console.log("======================");
        console.log("Request TikTok:");
        console.log(url);



        const result = await tiktokdl(url);



        if (!result) {

            return res.status(500).json({
                success:false,
                message:"Video tidak ditemukan"
            });

        }



        console.log("HASIL TIKTOKDL:");
        console.log(JSON.stringify(result, null, 2));



        res.json({

            success:true,
            data:result

        });



    } catch(error) {


        console.log("ERROR DOWNLOAD:");
        console.log(error.message);



        res.status(500).json({

            success:false,
            message:"Gagal mengambil data TikTok",
            error:error.message

        });


    }

});







// Download Video / Watermark / MP3
app.get("/download-file", async (req,res)=>{


    try {


        let { url, type } = req.query;



        if(!url){

            return res.status(400).send(
                "URL file kosong"
            );

        }



        // Perbaiki URL TikWM
        url = url.replace(
            "https://www.tikwm.com//",
            "https://www.tikwm.com/"
        );



        console.log("Download:");
        console.log(url);



        /*
            TikWM memakai Cloudflare.
            MP3 lebih aman dibuka langsung oleh browser.
        */

        if(type === "music"){

            return res.redirect(url);

        }





        const response = await axios({

            method:"GET",

            url:url,

            responseType:"stream",

            headers:{

                "User-Agent":
                "Mozilla/5.0",

                "Referer":
                "https://www.tikwm.com/"

            }

        });





        let filename =
        "tiktok-video.mp4";



        if(type === "wm"){

            filename =
            "tiktok-watermark.mp4";

        }





        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${filename}"`
        );



        res.setHeader(
            "Content-Type",
            response.headers["content-type"] ||
            "application/octet-stream"
        );



        response.data.pipe(res);



    } catch(error) {


        console.log(
            "ERROR DOWNLOAD FILE:"
        );

        console.log(
            error.message
        );



        res.status(500).send(
            "Download gagal"
        );


    }


});








// Error handler
app.use((err,req,res,next)=>{


    console.log(err);



    res.status(500).json({

        success:false,

        message:"Server error"

    });


});







// Jalankan server
app.listen(PORT,()=>{


    console.log(
        `🚀 Server aktif di http://localhost:${PORT}`
    );


});
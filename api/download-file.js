const axios = require("axios");

module.exports = async function (req, res) {

    if (req.method !== "GET") {
        return res.status(405).send("Method tidak diizinkan");
    }

    try {

        const { url, type } = req.query;

        if (!url) {
            return res.status(400).send("URL kosong");
        }

        const response = await axios({
            method: "GET",
            url: url,
            responseType: "stream",
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        let filename = "tiktok-video.mp4";

        if (type === "music") {
            filename = "tiktok-music.mp3";
        }

        if (type === "wm") {
            filename = "tiktok-watermark.mp4";
        }

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${filename}"`
        );

        res.setHeader(
            "Content-Type",
            response.headers["content-type"] || "application/octet-stream"
        );

        response.data.pipe(res);

    } catch (error) {

        console.error(error);

        res.status(500).send("Download gagal");

    }

};
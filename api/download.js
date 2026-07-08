const { tiktokdl } = require("tiktokdl");

module.exports = async function (req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method tidak diizinkan"
        });
    }

    try {

        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "URL TikTok kosong"
            });
        }

        const result = await tiktokdl(url);

        console.log("========== HASIL TIKTOKDL ==========");
        console.log(JSON.stringify(result, null, 2));
        console.log("====================================");

        res.json({
            success: true,
            data: result
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
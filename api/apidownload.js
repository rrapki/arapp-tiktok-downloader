const { tiktokdl } = require("tiktokdl");


module.exports = async function(req, res) {

    if(req.method !== "POST"){

        return res.status(405).json({
            success:false,
            message:"Method tidak diizinkan"
        });

    }



    try {


        const { url } = req.body;



        if(!url){

            return res.status(400).json({

                success:false,

                message:"URL TikTok kosong"

            });

        }




        const result = await tiktokdl(url);



        if(!result){

            return res.status(500).json({

                success:false,

                message:"Video tidak ditemukan"

            });

        }




        console.log(
            JSON.stringify(result,null,2)
        );



        res.json({

            success:true,

            data:result

        });



    } catch(error){


        console.log(error);



        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};
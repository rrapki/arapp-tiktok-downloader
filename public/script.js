const input = document.querySelector("input");
const button = document.querySelector(".download-box button");


button.addEventListener("click", async () => {

    const url = input.value.trim();


    if (!url) {

        alert("Masukkan link TikTok.");

        return;

    }



    button.innerText = "Loading...";
    button.disabled = true;



    try {


        const res = await fetch("/api/download", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        url:url
    })

});



        const result = await res.json();



        if (!result.success) {

            alert(result.message);

            return;

        }




        const old = document.querySelector(".hasil");

        if(old){

            old.remove();

        }




        const data = result.data;



        console.log("DATA TIKTOK:");
        console.log(data);




        // Ambil URL video
        const videoUrl =
            data.video ||
            data.play ||
            data.nowm ||
            data.no_watermark;




        // Ambil URL watermark
        const wmUrl =
            data.wm ||
            data.watermark ||
            data.video;




        // Ambil URL audio
        const musicUrl =
            data.music ||
            data.audio ||
            data.music_info?.play ||
            data.music_info?.url;



        console.log("VIDEO:", videoUrl);
        console.log("WM:", wmUrl);
        console.log("MUSIC:", musicUrl);






        const div = document.createElement("div");

        div.className = "hasil";



        div.innerHTML = `

            <div class="hasil-header">

                <h3>Hasil Download</h3>

                <p>
                    Pilih format yang ingin kamu download
                </p>

            </div>



            <div class="download-buttons">


                <button id="btnVideo" class="btn video">

                    📹 Video

                </button>



                <button id="btnWM" class="btn watermark">

                    💧 Watermark

                </button>



                <button id="btnMP3" class="btn music">

                    🎵 MP3

                </button>


            </div>

        `;



        document
        .querySelector(".container")
        .appendChild(div);








        // Download Video
        document
        .getElementById("btnVideo")
        .onclick = () => {


            if(!videoUrl){

                alert("Video tidak ditemukan");

                return;

            }



            window.location.href =

            "/download-file?type=video&url=" +

            encodeURIComponent(videoUrl);



        };







        // Download Watermark
        document
        .getElementById("btnWM")
        .onclick = () => {



            if(!wmUrl){

                alert("Watermark tidak ditemukan");

                return;

            }




            window.location.href =

            "/download-file?type=wm&url=" +

            encodeURIComponent(wmUrl);



        };









        // Download MP3
        document
        .getElementById("btnMP3")
        .onclick = () => {



            if(!musicUrl){


                alert(
                    "Link MP3 tidak tersedia"
                );


                return;


            }





            window.location.href =

            "/download-file?type=music&url=" +

            encodeURIComponent(musicUrl);



        };







    } catch(err) {


        console.error(err);


        alert(
            "Terjadi error: " + err.message
        );


    } finally {


        button.innerText = "Download";

        button.disabled = false;


    }


});
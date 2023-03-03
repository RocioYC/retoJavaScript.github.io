
let bntnext = document.getElementById('next');// Visualizar la clase siguite

// contar el numero de click
var numClics = 0;

function EmpezarGrabacion() {
    // Aumenta el número de clics en 1
    numClics++;

    if (numClics === 1) {
        cambiaricono(numClics);

        //Habilitar la grabación
        navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then((stream) => {
            console.log(stream);
            let video = document.getElementById('preview');
            let recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

            video.srcObject = stream;
            video.onloadedmetadata = (ev) => video.play();


            // Guardar el video--------------------------------
            let chunks = [];

            recorder.ondataavailable = function (e) {
                chunks.push(e.data);
            };

            recorder.onstop = function (e) {
                let blob = new Blob(chunks, { type: 'video/webm' });
                let url = URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'video.webm';
                document.body.appendChild(a);
                a.click();
            };


            // pausar el video-------------------------
            let timer;
            let pauseButton = document.getElementById('btn-play');

            recorder.start();

            function stopRecording() {
                recorder.stop();
                clearInterval(timer);
            }





            timer = setInterval(() => {
                stopRecording();
            }, 12000);

            pauseButton.addEventListener('click', pauseRecording);

        });


    }


    if (numClics === 2) {
        cambiaricono(numClics);


    }

    if (numClics === 3) {
        window.location.reload();//para refresac


    }


}




function cambiaricono(numClics) {
    var play = document.getElementById("btn-play");
    play.innerHTML = '<i></i>';
    play.style.color = "white";

    if (numClics === 1) {
        play.classList = "fa-solid fa-square";
    }
    if (numClics === 2) {
        play.classList = "fa-solid fa-arrows-spin";
        bntnext.classList.remove('btn-next');
    }
}






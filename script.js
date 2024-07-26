let inputname = "";
        setTimeout(() => {
            inputname = prompt("⚠️⚠️IMPORTANT: PLEASE USE OPERA BROWSER⚠️⚠️\nWho's birthday");
            alert("Wish you very very happy birthday🥳");
            alert("Blow the candles 🎂");
        }, 1000);
        let count = 0;
        let video = document.querySelector("video");
        // const startButton = document.getElementById('start');⭐

        async function blowout() {
            // Prompt user to give permission for microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const microphone = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

            microphone.connect(analyser);
            analyser.connect(scriptProcessor);
            scriptProcessor.connect(audioContext.destination);

            scriptProcessor.onaudioprocess = (event) => {
                const inputBuffer = event.inputBuffer.getChannelData(0);
                let maxAmplitude = 0;

                for (let i = 0; i < inputBuffer.length; i++) {
                    if (inputBuffer[i] > maxAmplitude) {
                        maxAmplitude = inputBuffer[i];
                    }
                }

                const decibels = 20 * Math.log10(maxAmplitude);
                console.log(decibels);
                if (decibels > -0.0007 && decibels < -0.0001) { // Threshold for blow sound detection
                    console.log('Blowed');
                    document.querySelector("div").innerHTML = '<video src="videos/complete.mp4" type="video/mp4" autoplay loop></video>';
                    console.log('Decibels:', decibels);
                    let name = document.createElement("div");
                    name.innerText = inputname;
                    name.classList.add("namestyle");
                    document.querySelector(".cake").append(name);
                }
            };
        }
        async function call() {//⭐
            await blowout();
        }
        call();
        // start.addEventListener('click', async () => {//⭐
        //     await blowout();
        // });

    

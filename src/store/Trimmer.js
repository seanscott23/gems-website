function readAudio(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);

    //Resolve if audio gets loaded
    reader.onload = function () {
      console.log("Audio Loaded");
      resolve(reader);
    };

    reader.onerror = function (error) {
      console.log("Error while reading audio");
      reject(error);
    };

    reader.onabort = function (abort) {
      console.log("Aborted");
      console.log(abort);
      reject(abort);
    };
  });
}

async function readAndDecodeAudio(audioFile) {
  let arrBuffer = null;
  let audioBuffer = null;

  //Read the original Audio
  await readAudio(audioFile)
    .then((results) => {
      arrBuffer = results.result;
    })
    .catch((error) => {
      window.alert("Some Error occured");
      return;
    });

  //Decode the original Audio into audioBuffer
  await new AudioContext()
    .decodeAudioData(arrBuffer)
    .then((res) => {
      audioBuffer = res;
      console.log(audioBuffer);
    })
    .catch((err) => {
      console.log(err);
      window.alert("Can't decode Audio");
      return;
    });
}

export { readAndDecodeAudio };

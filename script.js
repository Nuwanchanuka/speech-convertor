const textInput = document.getElementById('text-input');
const textOutput = document.getElementById('voice-select');
const convertbtn = document.getElementById('convert-btn');

const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'pt', 'ru', 'zh', 'si'];

function populateVoiceList() {
    const voices = speechSynthesis.getVoices();
    const filteredVoices = voices.filter(voice => supportedLanguages.includes(voice.lang.split('-')[0]));

    if (filteredVoices.length === 0) {
        console.error('No Sinhala or supported voices available.');
        textOutput.innerHTML = '<option value="" disabled>No Sinhala voices available</option>';
        return;
    }

    textOutput.innerHTML = filteredVoices.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join('');
}

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList; 
}
populateVoiceList();

convertbtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    const selectedVoiceName = textOutput.value;

    if (!text) {
        alert("Please enter some text.");
        return;
    }

    if (!selectedVoiceName) {
        alert("Please select a voice.");
        return;
    }

    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);

    if (!selectedVoice) {
        alert("Selected voice is not available.");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
});

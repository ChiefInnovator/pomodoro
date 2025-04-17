// Create placeholder sound files
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Work complete sound - a pleasant bell sound
function createWorkCompleteSound() {
    const duration = 1;
    const audioBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
    const channelData = audioBuffer.getChannelData(0);
    
    for (let i = 0; i < audioBuffer.length; i++) {
        // Bell-like sound with decay
        const t = i / audioContext.sampleRate;
        channelData[i] = Math.sin(2 * Math.PI * 440 * t) * Math.exp(-3 * t);
        // Add harmonics
        channelData[i] += 0.5 * Math.sin(2 * Math.PI * 880 * t) * Math.exp(-4 * t);
        channelData[i] += 0.25 * Math.sin(2 * Math.PI * 1320 * t) * Math.exp(-5 * t);
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.5;
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    return audioBuffer;
}

// Break complete sound - a gentle chime
function createBreakCompleteSound() {
    const duration = 1;
    const audioBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
    const channelData = audioBuffer.getChannelData(0);
    
    for (let i = 0; i < audioBuffer.length; i++) {
        // Chime-like sound
        const t = i / audioContext.sampleRate;
        channelData[i] = Math.sin(2 * Math.PI * 523.25 * t) * Math.exp(-2 * t); // C5
        // Add harmonics
        channelData[i] += 0.5 * Math.sin(2 * Math.PI * 659.25 * t) * Math.exp(-3 * t); // E5
        channelData[i] += 0.25 * Math.sin(2 * Math.PI * 783.99 * t) * Math.exp(-4 * t); // G5
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.5;
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    return audioBuffer;
}

// Button click sound - a soft click
function createButtonClickSound() {
    const duration = 0.1;
    const audioBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
    const channelData = audioBuffer.getChannelData(0);
    
    for (let i = 0; i < audioBuffer.length; i++) {
        // Click sound
        const t = i / audioContext.sampleRate;
        channelData[i] = Math.random() * 2 - 1;
        channelData[i] *= Math.exp(-30 * t); // Quick decay
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.2;
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    return audioBuffer;
}

// Export sounds as WAV files
function exportSoundAsWav(audioBuffer, filename) {
    const numOfChannels = audioBuffer.numberOfChannels;
    const length = audioBuffer.length;
    const sampleRate = audioBuffer.sampleRate;
    const bitsPerSample = 16;
    const bytesPerSample = bitsPerSample / 8;
    const blockAlign = numOfChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = length * blockAlign;
    
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);
    
    // RIFF chunk descriptor
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeString(view, 8, 'WAVE');
    
    // FMT sub-chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // subchunk1size
    view.setUint16(20, 1, true); // audio format (1 for PCM)
    view.setUint16(22, numOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    
    // Data sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);
    
    // Write the PCM samples
    const data = new Float32Array(audioBuffer.getChannelData(0));
    let offset = 44;
    for (let i = 0; i < data.length; i++, offset += 2) {
        const sample = Math.max(-1, Math.min(1, data[i]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
    }
    
    return new Blob([buffer], { type: 'audio/wav' });
}

function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

// Create and save sound files
const workCompleteSound = createWorkCompleteSound();
const breakCompleteSound = createBreakCompleteSound();
const buttonClickSound = createButtonClickSound();

// Convert to Blob URLs for testing
const workCompleteSoundBlob = exportSoundAsWav(workCompleteSound, 'work-complete.wav');
const breakCompleteSoundBlob = exportSoundAsWav(breakCompleteSound, 'break-complete.wav');
const buttonClickSoundBlob = exportSoundAsWav(buttonClickSound, 'button-click.wav');

// Create URLs for testing
const workCompleteSoundURL = URL.createObjectURL(workCompleteSoundBlob);
const breakCompleteSoundURL = URL.createObjectURL(breakCompleteSoundBlob);
const buttonClickSoundURL = URL.createObjectURL(buttonClickSoundBlob);

console.log('Sound files created:');
console.log('Work complete sound:', workCompleteSoundURL);
console.log('Break complete sound:', breakCompleteSoundURL);
console.log('Button click sound:', buttonClickSoundURL);

export const getAverageColor = (imageElement) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;

    context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let r = 0, g = 0, b = 0;

    for (let i = 0; i < data.length; i += 4) {
        r += data[i];     // Red
        g += data[i + 1]; // Green
        b += data[i + 2]; // Blue
    }

    const pixelCount = data.length / 4;
    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    return `rgba(${r}, ${g}, ${b}, 0.5)`;  // Transparan renk
};

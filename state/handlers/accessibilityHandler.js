function getRGB(c) {
    return parseInt(c, 16) || c
}

function getsRGB(c) {
    return getRGB(c) / 255 <= 0.03928
        ? getRGB(c) / 255 / 12.92
        : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4)
}

function getLuminance(hexColor) {
    return (
        0.2126 * getsRGB(hexColor.substr(1, 2)) +
        0.7152 * getsRGB(hexColor.substr(3, 2)) +
        0.0722 * getsRGB(hexColor.substr(-2))
    )
}

function getContrast(f, b) {
    const L1 = getLuminance(f)
    const L2 = getLuminance(b)
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
}

function rgbToHex(rgbString) {
    // Extract the RGB values from the string
    const rgbValues = rgbString.match(/\d+/g);

    // Convert each RGB component to hexadecimal
    const hexComponents = rgbValues.map((value) => {
        const hex = parseInt(value, 10).toString(16);
        return hex.length === 1 ? '0' + hex : hex; // Add leading zero if necessary
    });

    // Combine the hexadecimal components
    const hexColor = '#' + hexComponents.join('');

    return hexColor;
}

function getContrastingTextColor(bgColor) {
    console.log(typeof bgColor, bgColor)
    if (bgColor.startsWith("rgb")) {
        bgColor = rgbToHex(bgColor);
    }

    const whiteContrast = getContrast(bgColor, '#ffffff')
    const blackContrast = getContrast(bgColor, '#000000')

    return whiteContrast > blackContrast ? '#ffffff' : '#000000'
}

export { getContrastingTextColor }
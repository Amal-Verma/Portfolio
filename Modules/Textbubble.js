export default function drawTextBubble(ctx, world, x, y, text, maxWidth, padding = 10,fontsize) {
    // Set font properties
    fontsize = Math.max(fontsize, 13);
    ctx.font = fontsize + 'px Arial';

    // // Measure text width and height
    // const textMetrics = ctx.measureText(text);
    // const textWidth = textMetrics.width;
    // const lineHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

    // Measure text width and height
    // const textWidth = ctx.measureText(text).width;
    const lineHeight = ctx.measureText('M').width * 1.5; // Approximate height

    

    // Calculate bubble height based on wrapped text
    const words = text.split(' ');
    let line = '';
    let lines = [];
    let bubbleWidth = 0
    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth - 2 * padding && i > 0) {
            bubbleWidth = Math.max(bubbleWidth, testWidth - ctx.measureText(words[i]).width + 2 * padding);
            lines.push(line);
            line = words[i] + ' ';
        } else {
            line = testLine;
        }
    }

    if (bubbleWidth === 0) bubbleWidth = ctx.measureText(line).width + 2 * padding;

    // // Calculate bubble width based on max width or text width
    // const bubbleWidth = maxWidth ? Math.min(textWidth + 2 * padding, maxWidth) : textWidth + 2 * padding;

    lines.push(line);
    const bubbleHeight = lines.length * lineHeight + 2 * padding;

    // // Draw white background
    // ctx.fillStyle = 'white';
    // ctx.fillRect(x, y, bubbleWidth, bubbleHeight);

    // Draw rounded rectangle border
    const cornerRadius = 10;
    x -= 2 * cornerRadius;
    y -= 2 * cornerRadius;
    y -= bubbleHeight
    
    x = Math.min(x, world.width - bubbleWidth - 2 * cornerRadius);

    ctx.beginPath();
    ctx.moveTo(x + cornerRadius, y);
    ctx.arcTo(x + bubbleWidth, y, x + bubbleWidth, y + bubbleHeight, cornerRadius);
    ctx.arcTo(x + bubbleWidth, y + bubbleHeight, x, y + bubbleHeight, cornerRadius);
    ctx.arcTo(x, y + bubbleHeight, x, y, cornerRadius);
    ctx.arcTo(x, y, x + bubbleWidth, y, cornerRadius);
    ctx.closePath();
    ctx.stroke();
    
     // Draw white background
     ctx.fillStyle = 'white';
     ctx.fill();

    // Draw wrapped text
    ctx.fillStyle = 'black';
    let yPos = y + padding + lineHeight;
    lines.forEach(line => {
        ctx.fillText(line, x + padding, yPos);
        yPos += lineHeight;
    });
}

// Example usage
// const canvas = document.getElementById('canvas1');
// const ctx = canvas.getContext('2d');

// const text = "Hello, this is a dynamic text bubble with a maximum width feature!";
// const maxWidth = 200;
// drawDynamicTextBubble(ctx, 50, 50, text, maxWidth);

document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const colorNum = document.getElementById('colorNum');
    const palette = document.getElementById('palette');
    const notification = document.createElement('div');
    notification.className = 'notification';
    document.body.appendChild(notification);
    
    // Generate initial palette
    generatePalette();
    
    // Generate new palette when button is clicked
    generateBtn.addEventListener('click', generatePalette);
    
    function generatePalette() {
        palette.innerHTML = '';
        const numColors = parseInt(colorNum.value);
        
        for (let i = 0; i < numColors; i++) {
            const color = getRandomColor();
            const colorElement = document.createElement('div');
            colorElement.className = 'color';
            colorElement.style.backgroundColor = color;
            
            const colorCode = document.createElement('span');
            colorCode.className = 'color-code';
            colorCode.textContent = color;
            
            colorElement.appendChild(colorCode);
            
            // Copy to clipboard when color is clicked
            colorElement.addEventListener('click', function() {
                copyToClipboard(color);
                showNotification(`Copied: ${color}`);
            });
            
            palette.appendChild(colorElement);
        }
    }
    
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
    
    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
});
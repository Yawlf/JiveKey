document.addEventListener("DOMContentLoaded", () => {
    const passwordOutput = document.getElementById('password-output');
    const lengthDisplay = document.getElementById('length-display');
    const lengthSlider = document.getElementById('password-length');
    const includeUpper = document.getElementById('include-upper');
    const includeLower = document.getElementById('include-lower');
    const includeNumbers = document.getElementById('include-numbers');
    const includeSymbols = document.getElementById('include-symbols');
    const excludeCharacters = document.getElementById('exclude-characters');
    const excludeInput = document.getElementById('exclude-input');
    const copyButton = document.getElementById('copy-button');
    const generateButton = document.getElementById('generate-button');

    lengthSlider.addEventListener('input', () => {
        lengthDisplay.textContent = lengthSlider.value;
    });

    function generatePassword() {
        const length = parseInt(lengthSlider.value);
        let characterSet = '';
        if (includeUpper.checked) characterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLower.checked) characterSet += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers.checked) characterSet += '0123456789';
        if (includeSymbols.checked) characterSet += '!@#$%^&*()_+[]{}|;:,.<>?';

        const excluded = excludeInput.value;
        characterSet = characterSet.split('').filter(char => !excluded.includes(char)).join('');

        if (characterSet.length === 0) return '';

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characterSet.length);
            password += characterSet[randomIndex];
        }
        passwordOutput.value = password;
    }

    generatePassword();

    generateButton.addEventListener('click', generatePassword);

    copyButton.addEventListener('click', () => {
        passwordOutput.select();
        document.execCommand('copy');
    });
});

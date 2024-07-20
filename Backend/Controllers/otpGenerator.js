import otpGenerator from 'otp-generator'

function generateOTP() {
    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
    });
    return otp
};

export default generateOTP
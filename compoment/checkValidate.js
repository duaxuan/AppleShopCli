export const checkValidateEmail = (text) => {
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (pattern.test(text)) {
        return true;
    } else {
        return false;
    }
}

export const checkValidatePhone = (text) => {
    const pattern = /^(0[1-9][0-9]{8}|0[1-9][0-9]{9})$/;
    if (pattern.test(text)) {
        return true;
    } else {
        return false;
    }
}

export const checkValidatePassword = (text) => {
    if (text.length >= 15) {
        return false
    } else {
        return true
    }
}
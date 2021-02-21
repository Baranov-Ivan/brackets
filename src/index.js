module.exports = function check(str, bracketsConfig) {
    let openBrackets = [];
    let closeBrackets = [];
    let sameBrackets = [];

    bracketsConfig.forEach((item) => {
        if (item[0] === item[1]) {
            sameBrackets.push(item[0]);
        } else {
            openBrackets.push(item[0]);
            closeBrackets.push(item[1]);
        }
    });

    let strArray = str.split("");

    let openStack = [];
    let stackChanged = false;

    for (let i = 0; i < strArray.length; i++) {
        if (openBrackets.indexOf(strArray[i]) !== -1) {
            openStack.push(strArray[i]);
            stackChanged = true;
        } else if (closeBrackets.indexOf(strArray[i]) !== -1) {
            if (openStack.length > 0) {
                if (
                    openBrackets.indexOf(openStack[openStack.length - 1]) ===
                    closeBrackets.indexOf(strArray[i])
                ) {
                    openStack.pop();
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else if (sameBrackets.indexOf(strArray[i]) !== -1) {
            if(openStack.includes(strArray[i])) {
                if (openStack[openStack.length - 1] === strArray[i]) {
                    openStack.pop();
                } else {
                    return false;
                }
            } else {
                openStack.push(strArray[i]);
                stackChanged = true;
            }
        }
    }

    if(openStack.length === 0 && stackChanged === true) {
        return true;
    }

    return false;
}

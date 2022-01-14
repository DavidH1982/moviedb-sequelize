const setApproval = (rating) => {
    try {
        if (rating === 0 && rating <= 2) {
            return 'Bad';
        } else if (rating > 2 && rating <= 5) {
            return 'Average';
        } else if (rating > 5 && rating <= 7) {
            return 'Good';
        } else {
            return 'Excellent';
        }
    } catch (error) {
        console.log(error);
    }
}

const firstUpper = (rawValue) => {
    try {
        return rawValue.split(" ").map((word) => `${word[0].toUpperCase()}${word.slice(1)}`).join(" ");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { 
    setApproval,
    firstUpper,
};
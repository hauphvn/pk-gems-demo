import {Platform} from "react-native";

const formatNumber = (num) => {
    if (Platform.OS === 'ios') {
        return num.toLocaleString('en-US');
    } else {
        // For Android
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
};
const formattedAmountVND =(amount) => {
    return  amount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'vnd',
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

const formatNumberIgnoreLastZero = (numberString) => {
    const number = parseFloat(numberString.replace(/,/g, ''));
    return number.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};
export {
    formatNumber,
    formattedAmountVND,
    formatNumberIgnoreLastZero,
}

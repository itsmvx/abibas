const moment = require('moment');

type DateFormatType = [
    'YYYY-MM-DD',
    'MMMM Do YYYY',
    'dddd, MMMM Do YYYY, hh:mm:ss',
];
export const dateFormat = (date: string | undefined, format?:DateFormatType[number] | string): string => {
    try {
        if (!date) {
            return 'Not set yet';
        }
        return moment(date).format(format ?? 'MMMM Do YYYY');
    } catch (error) {
        return 'Input invalid';
    }
};

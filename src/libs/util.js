let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : '享学会';
    window.document.title = title;
};

export default util;
const fs = require('fs');
const fileFolderName = "files";
const cvFileName = 'Gabriel Justin Dimailig - resume.docx';
const cvPath =  './' + fileFolderName + '/' + cvFileName;

module.exports = {
    downloadResume: function(res) {
        return downloadResume(res);
    },
    getResumeModifiedDate: function(res) {
        return getResumeModifiedDate(res);
    }
};

function downloadResume(res) {
    res.download(cvPath, cvFileName);
}

function getResumeModifiedDate(res) {
    fs.stat(cvPath, function(err,stats) {
        res.send(stats.mtime);
    });
}

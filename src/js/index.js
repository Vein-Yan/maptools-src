let fileObj;
$("#inputFile").fileinput({
    showCaption: false, 
    showUpload: false,
    dropZoneEnabled: false,
    browseLabel: '浏览文件...'
}).on('fileloaded', function(event, file, previewId, index, reader) {
    fileObj = file;
    console.log("fileloaded");
}).on('filebrowse', function(event) {
    console.log("File browse triggered.");
})
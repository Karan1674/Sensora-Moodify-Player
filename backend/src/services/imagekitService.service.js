const imagekit = require("../config/imagekit.config");

const uploadToImageKit = async (file) => {
    try {
        const response = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder: "/moody-player-songs"
        });

        return {
            url: response.url,
            fileId: response.fileId
        };

    } catch (error) {
        throw new Error("Uploading a Song failed");
    }
};

const deleteFromImageKit = async (fileId) => {
    try {
        await imagekit.deleteFile(fileId);
    } catch (error) {
        throw new Error("Deleting a Song failed");
    }
};

module.exports = { uploadToImageKit, deleteFromImageKit };
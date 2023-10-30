const { Storage } = require("@google-cloud/storage");
const connection = require("../../db/connection");

const storage = new Storage({
    keyFilename: "google-cloud-key.json", // Get this from Google Cloud -> API & Services -> Credentials
});

const bucket = storage.bucket("keacare_blob_storage"); // Get this from Google Cloud -> Storage


const uploadImage = async (req, res) => {
    try {
        if (req.file) {
            const blob = bucket.file(`caregiver_image/caregiver${req.body.id}.${req.body.fileType}`);
            const blobStream = blob.createWriteStream();

            blobStream.on("finish", () => {
                const url = "https://storage.googleapis.com/keacare_blob_storage/" + blob.name;
                connection.query(`UPDATE caregivers_ SET imageUrl = ? WHERE id = ?`, [url, req.body.id], (err) => { if (err) throw err; });
                res.status(200).json({ success: true });
            });

            blobStream.end(req.file.buffer);

        } else {
            res.status(400).json({ success: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
}

const uploadVideo = async (req, res) => {
    try {
        if (req.file) {
            const blob = bucket.file(`caregiver_video/caregiver${req.body.id}.${req.body.fileType}`);
            const blobStream = blob.createWriteStream();

            blobStream.on("finish", () => {
                const url = "https://storage.googleapis.com/keacare_blob_storage/" + blob.name;
                connection.query(`UPDATE caregivers_ SET videoUrl = ? WHERE id = ?`, [url, req.body.id], (err) => { if (err) throw err; });
                res.status(200).json({ success: true });
            });

            blobStream.end(req.file.buffer);

        } else {
            res.status(400).json({ success: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
}

module.exports = {
    uploadImage,
    uploadVideo
};
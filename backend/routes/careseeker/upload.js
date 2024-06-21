const { Storage } = require("@google-cloud/storage");
const connection = require("../../db/connection");

const storage = new Storage({
    keyFilename: "google-cloud-key.json", // Get this from Google Cloud -> API & Services -> Credentials
});

const bucket = storage.bucket("keacare_blob_storage"); // Get this from Google Cloud -> Storage


const uploadImage = async (req, res) => {
    try {
        if (req.file) {
            connection.query(`SELECT imageUrl FROM careseekers_ WHERE id = ?`, [req.body.id], (err, result) => {
                if (err) throw err;
                if (result[0].imageUrl) {
                    const filename = result[0].imageUrl.split("/").pop();
                    const file = bucket.file(`careseeker_image/${filename}`);
                    file.delete();
                }
            });
            const blob = bucket.file(`careseeker_image/careseeker${Date.now()}.${req.body.fileType}`);

            const blobStream = blob.createWriteStream();

            blobStream.on("finish", () => {
                const url = "https://storage.googleapis.com/keacare_blob_storage/" + blob.name;
                connection.query(`UPDATE careseekers_ SET imageUrl = ? WHERE id = ?`, [url, req.body.id], (err) => { if (err) throw err; });
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
    uploadImage
};
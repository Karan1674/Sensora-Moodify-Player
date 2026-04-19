const express = require('express');
const router = express.Router();

const { addSong, getAllSongs, getSongsByMood, updateSong, deleteSong} = require('../controllers/song.controller');

const upload = require('../middleware/upload.middleware');

router.post('/add', upload.single('audio'), addSong);

router.get('/', getAllSongs);

router.get('/mood/:mood', getSongsByMood);

router.put('/:id', upload.single('audio'), updateSong);

router.delete('/:id', deleteSong);

module.exports = router;
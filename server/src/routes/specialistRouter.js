const { Router } = require('express');
const SpecialistController = require('../controllers/SpecialistController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isValide = require('../middlewares/isIdValid');
const upload = require('../middlewares/upload');

const router = Router();

// Получить данные педагога текущего пользователя
router.get(
  '/:userId',
  isValide('userId'),
  verifyAccessToken,
  SpecialistController.getSpecialist,
);

// Обновить данные педагога текущего пользователя
router.put(
  '/:userId',
  isValide('userId'),
  verifyAccessToken,
  SpecialistController.editSpecialist,
);

// Загрузка одного файла с полем 'photo'
router.put(
  '/photo/:userId',
  isValide('userId'),
  verifyAccessToken,
  upload.single('photo'), // middleware multer
  SpecialistController.uploadPhoto,
);

// Создать данные педагога для текущего пользователя
router.post('/', verifyAccessToken, SpecialistController.createSpecialist);

// Удалить данные педагога текущего пользователя
router.delete('/', verifyAccessToken, SpecialistController.deleteSpecialist);

module.exports = router;

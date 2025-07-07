const fs = require('fs').promises;
const path = require('path');
const { Specialist, ServiceSpecialist, Service } = require('../../db/models');

class SpecialistService {
  // Получить данные педагога по id
  static async getSpecialistById(id) {
    const data = await Specialist.findByPk(id);
    const linksRaw = await ServiceSpecialist.findAll({
      where: { specialistId: id },
      include: { model: Service, as: 'service' },
      order: [['createdAt', 'DESC']],
    });

    // Оставляем только поле service из каждой связки
    const links = linksRaw.map((link) => link.service);
    return { data, links };
  }

  // Получить специалиста по userId
  static async getSpecialistByUserId(userId) {
    return Specialist.findOne({ where: { userId } });
  }

  // Обновить данные педагога (текстовые поля)
  static async editSpecialistByUserId(userId, updateData) {
    const specialist = await Specialist.findOne({ where: { userId } });
    if (!specialist) throw new Error('Педагог не найден');
    return specialist.update(updateData);
  }

  // Обновить одно фото (photo) с удалением старого файла
  static async updateSinglePhoto(userId, newPhotoPath) {
    const specialist = await Specialist.findOne({ where: { userId } });
    if (!specialist) throw new Error('Педагог не найден');

    const oldPhotoPath = specialist.photo;
    if (oldPhotoPath && oldPhotoPath !== newPhotoPath) {
      try {
        await fs.unlink(path.resolve(oldPhotoPath));
      } catch (err) {
        console.warn(`Не удалось удалить старый файл ${oldPhotoPath}:`, err.message);
      }
    }

    specialist.photo = newPhotoPath;
    await specialist.save();
    return specialist;
  }

  // Добавить дипломы (массив путей)
  static async addDiplomaPhotos(userId, newPhotoPaths) {
    const specialist = await Specialist.findOne({ where: { userId } });
    if (!specialist) throw new Error('Педагог не найден');

    const currentPhotos = specialist.diplomaPhoto || [];
    specialist.diplomaPhoto = [...currentPhotos, ...newPhotoPaths];
    await specialist.save();
    return specialist;
  }

  // Удалить диплом по пути и из массива
  static async removeDiplomaPhoto(userId, photoToRemove) {
    const specialist = await Specialist.findOne({ where: { userId } });
    if (!specialist) throw new Error('Педагог не найден');

    const currentPhotos = specialist.diplomaPhoto || [];
    const updatedPhotos = currentPhotos.filter((p) => p !== photoToRemove);

    try {
      await fs.unlink(path.resolve(photoToRemove));
    } catch (err) {
      console.warn(`Не удалось удалить файл ${photoToRemove}:`, err.message);
    }

    specialist.diplomaPhoto = updatedPhotos;
    await specialist.save();
    return specialist;
  }
}

module.exports = SpecialistService;

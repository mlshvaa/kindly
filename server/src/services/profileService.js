const { Specialist, User, Service } = require('../../db/models');

class ProfileService {
  static async findByUserId(userId) {
    const profile = await Specialist.findOne({
      where: { userId },
      include: [{ model: User, attributes: ['name', 'email'] }, { model: Service }],
    });
    if (!profile) {
      throw new Error('Анкета не найдена');
    }
    return profile;
  }

  static async updateProfile(userId, newData) {
    const profile = await Specialist.findOne({ where: { userId } });
    if (!profile) {
      throw new Error('Анкета не найдена');
    }
    const updatedProfile = await profile.update(newData);
    return updatedProfile;
  }

  static async deleteProfile(userId) {
    const profile = await Specialist.findOne({ where: { userId } });
    if (!profile) {
      throw new Error('Анкета не найдена');
    }
    await profile.destroy();
  }
}

module.exports = ProfileService;

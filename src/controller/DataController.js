import Avatars from '../model/Avatars.js';

const getAvatars = async (req, res) => {
  let avatarsInfo;
  try {
    if (req.query.aid) {
      avatarsInfo = await fetchAvatarById(req.query.aid);
    } else {
      avatarsInfo = await fetchAllAvatars();
    }
    res.status(200).json(avatarsInfo);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const fetchAllAvatars = async () => {
  try {
    const avatars = await Avatars.find({}).select('base64');
    return avatars.map((avat) => ({
      base64: avat.base64,
    }));
  } catch (error) {
    console.error('Error fetching avatars', error);
    throw error;
  }
};
const fetchAvatarById = async (aid) => {
  try {
    const result = await Avatars.findOne({ aid: aid }).select('base64');
    return {
      base64: result.base64,
    };
  } catch (error) {
    console.error('Error fetching avatars by aid', error);
    throw error;
  }
};

export default { getAvatars };

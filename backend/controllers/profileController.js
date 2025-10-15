import PatientProfile from "../models/PatientProfile.js";

// POST /api/profile
export const createOrUpdateProfile = async (req, res) => {
  try {
    const {
      stage,
      diagnosis_date,
      age,
      location,
      primary_symptoms,
      language_preference,
    } = req.body;

    const userId = req.user?.id || req.body.userId; // either from token or frontend

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    let profile = await PatientProfile.findOne({ userId });

    if (profile) {
      // update existing
      profile.stage = stage;
      profile.diagnosis_date = diagnosis_date;
      profile.age = age;
      profile.location = location;
      profile.primary_symptoms = primary_symptoms;
      profile.language_preference = language_preference;
      await profile.save();
    } else {
      // create new
      profile = new PatientProfile({
        userId,
        stage,
        diagnosis_date,
        age,
        location,
        primary_symptoms,
        language_preference,
        completed_modules: [],
      });
      await profile.save();
    }

    res.status(200).json({ message: "Profile saved successfully", profile });
  } catch (err) {
    console.error("Error saving profile:", err);
    res.status(500).json({ message: "Failed to save profile", error: err.message });
  }
};

// GET /api/profile/me
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId;
    if (!userId) return res.status(400).json({ message: "User ID missing" });

    const profile = await PatientProfile.findOne({ userId }).populate("userId", "username email role");
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

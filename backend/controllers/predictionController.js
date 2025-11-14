import Prediction from "../models/Prediction";

export const getLatestPrediction = async (req, res) => {
  try {
    const latest = await Prediction.findOne().sort({ timestamp: -1 });

    if (!latest) {
      return res.json({ success: true, data: null });
    }

    res.json({ success: true, data: latest });
  } catch (e) {
    res.status(500).json({ error: "Server Error" });
  }
};

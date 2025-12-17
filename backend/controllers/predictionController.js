import Prediction from "../models/Prediction";

export const getLatestPrediction = async (req, res) => {
  try {
    const userId = req.user.id;

    const latest = await Prediction.findOne({ userId }).sort({ timestamp: -1 });

    // if (!latest) {
    //   return res.json({ success: true, data: null });
    // }

    res.json({ success: true, data: latest || null });
  } catch (e) {
    res.status(500).json({ error: "Server Error" });
  }
};

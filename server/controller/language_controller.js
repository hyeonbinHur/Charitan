const get_language = async (req, res) => {
  try {
    const acceptedLanguage = req.headers["accept-language"];
    if (!acceptedLanguage) {
      throw new Error("No Accepted-Language header provided");
    }
    const languageCode = acceptedLanguage.split(",")[0];
    res.status(200).json({ languageCode: languageCode || "Unknown" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default {
  get_language,
};

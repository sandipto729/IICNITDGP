const AuditionConfig = require('../model/AuditionConfig');

// Helper to ensure a single config document exists
async function ensureConfig() {
  let cfg = await AuditionConfig.findOne();
  if (!cfg) {
    cfg = await AuditionConfig.create({});
  }
  return cfg;
}

const getConfig = async (req, res) => {
  try {
    const cfg = await ensureConfig();
    res.status(200).json({ isOpen: cfg.isOpen, message: cfg.message, updatedAt: cfg.updatedAt });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch audition config', error: err.message });
  }
};

const updateConfig = async (req, res) => {
  try {
    const { isOpen, message } = req.body || {};

    // Basic validation
    const payload = {};
    if (typeof isOpen === 'boolean') payload.isOpen = isOpen;
    if (typeof message === 'string') payload.message = message;

    const cfg = await ensureConfig();
    if (Object.keys(payload).length > 0) {
      Object.assign(cfg, payload);
      // Optionally track who updated (if auth middleware sets req.user)
      if (req.user && req.user.email) cfg.updatedBy = req.user.email;
      await cfg.save();
    }

    res.status(200).json({
      isOpen: cfg.isOpen,
      message: cfg.message,
      updatedAt: cfg.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update audition config', error: err.message });
  }
};

module.exports = { getConfig, updateConfig };

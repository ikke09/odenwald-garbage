class GarbageBin {
  constructor(shortName, displayName, color) {
    this.shortName = shortName || '';
    this.fullName = displayName || '';
    this.color = color || '';
  }
}

module.exports = GarbageBin;

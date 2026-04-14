class BiPriorityQueue {
  constructor() {
    this.data = [];
    this.counter = 0;
  }

  enqueue(value, priority) {
    this.data.push({
      value,
      priority,
      id: this.counter++
    });
  }

  peek(type) {
    const idx = this._selectIndex(type);
    return idx === -1 ? null : this.data[idx].value;
  }

  dequeue(type) {
    const idx = this._selectIndex(type);
    if (idx === -1) return null;

    return this.data.splice(idx, 1)[0].value;
  }

  _selectIndex(type) {
    if (this.data.length === 0) return -1;

    let resultIndex = 0;

    for (let i = 1; i < this.data.length; i++) {
      const current = this.data[i];
      const best = this.data[resultIndex];

      if (this._isBetter(current, best, type)) {
        resultIndex = i;
      }
    }

    return resultIndex;
  }

  _isBetter(a, b, type) {
    if (type === "highest") {
      return (
        a.priority > b.priority ||
        (a.priority === b.priority && a.id < b.id)
      );
    }

    if (type === "lowest") {
      return (
        a.priority < b.priority ||
        (a.priority === b.priority && a.id < b.id)
      );
    }

    if (type === "oldest") {
      return a.id < b.id;
    }

    if (type === "newest") {
      return a.id > b.id;
    }

    throw new Error(
      'Invalid type. Use "highest", "lowest", "oldest", or "newest".'
    );
  }
}

class DiaryView {
    constructor(containerElement, diaryId) {
      this.containerElement = containerElement;
      this.diaryId = diaryId;
      this.currEntry = null;
      this._loadDiary();
  
      this.checkButton = document.querySelector("#checked");
      this.forwardButton = document.querySelector("#forward");
      this.backButton = document.querySelector("#back");
      this.homeButton = document.querySelector("#home");
      this.textArea = document.querySelector("textarea");
      this.navBar = document.querySelector("#navigation");
      this.editBar = document.querySelector("#edit");
  
      this._save = this._save.bind(this);
      this._forward = this._forward.bind(this);
      this._back = this._back.bind(this);
      this._home = this._home.bind(this);
      this._edit = this._edit.bind(this);
      this.checkButton.addEventListener('click', this._save);
      this.forwardButton.addEventListener('click', this._forward);
      this.backButton.addEventListener('click', this._back);
      this.homeButton.addEventListener('click', this._home);
      this.textArea.addEventListener('click', this._edit);
    }
  
    _edit(event) {
        this.navBar.classList.add('hidden');
        this.editBar.classList.remove('hidden');
        this.textArea.classList.add('editing');
    }
  
    async _home(event) {
        this.currDate = new Date();
        this.currEntry = new EntryView(this.currDate, this.diaryId);
        await this.currEntry.loadEntry();
    }
  
    async _back(event) {
        this.currDate.setDate(this.currDate.getDate() - 1);
        this.currEntry = new EntryView(this.currDate, this.diaryId);
        await this.currEntry.loadEntry();
    }
  
    async _forward(event) {
        this.currDate.setDate(this.currDate.getDate() + 1);
        this.currEntry = await new EntryView(this.currDate, this.diaryId);
        await this.currEntry.loadEntry();
    }
  
  
    async _save(event) {
        await this.currEntry.saveEntry();
        this.navBar.classList.remove('hidden');
        this.editBar.classList.add('hidden');
        this.textArea.classList.remove('editing');
    }
  
    async _loadDiary() {
      const result = await fetch(`/${this.diaryId}`);
      const json = await result.json();
  
      this.currDate = new Date();
      this.currEntry = new EntryView(this.currDate, this.diaryId);
      await this.currEntry.loadEntry();
  
      this.containerElement.classList.remove('hidden');
    }
  }
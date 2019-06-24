class EntryView {
    constructor(date, diaryId) {
        this.entryContainer = document.querySelector("#entry");
        this.dateContainer = document.querySelector("#date");
        this.promptContainer = document.querySelector("#prompt");
        this.contentsContainer = document.querySelector("#contents");
        this.diaryId = diaryId;
        this.date = date;
        this.prompt = null;
    }

    generatePrompt() {
        const randInd = Math.floor(Math.random() * prompts.length);
        return prompts[randInd];
    }

    async createEntry() {
        this.prompt = this.generatePrompt();
        const params = {
            diaryId: this.diaryId,
            date: this.date.toLocaleDateString(),
            prompt: this.prompt,
            contents: ""
        };
        const fetchOptions = {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        };
        const result = await fetch('/create-entry', fetchOptions);
        const json = await result.json();
        return json;
    }

    async loadEntry() {
        const date = this.date.toLocaleDateString();
        let result = await fetch(`/id/${this.diaryId}/${date}`);
        let json = await result.json();
        // Entry does not already exist
        if (json === null) {
            json = await this.createEntry();
        }
        this.prompt = json.prompt;
        this.contents = json.contents;
        const options = { month: 'long', day: 'numeric' };
        const parsed = this.date.toLocaleDateString('en-US', options);
        this.dateContainer.textContent = parsed;
        this.promptContainer.textContent = json.prompt;
        this.contentsContainer.value = json.contents;
    }

    async saveEntry() {
        this.contents = this.contentsContainer.value;
        const params = {
            diaryId: this.diaryId,
            date: this.date.toLocaleDateString(),
            prompt: this.prompt,
            contents: this.contents
        };
        const fetchOptions = {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        };
        const result = await fetch('/create-entry', fetchOptions);
        const json = await result.json();
        return json;
    }
}
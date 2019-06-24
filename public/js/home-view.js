class HomeView {
    constructor(containerElement, showDiaryView) {
      this.containerElement = containerElement;
      this.createButton = document.querySelector("#create-button");
      this.showDiaryView = showDiaryView;
      this._onClick = this._onClick.bind(this);
      this._onMouseover = this._onMouseover.bind(this);
      this._onMouseout = this._onMouseout.bind(this);
      this.createButton.addEventListener('click', this._onClick);
      this.createButton.addEventListener('mouseover', this._onMouseover);
      this.createButton.addEventListener('mouseout', this._onMouseout);
  
      this.containerElement.classList.remove('hidden');
    }
  
    _onMouseout(event) {
        this.createButton.classList.remove('hover');
    }
  
    _onMouseover(event) {
        this.createButton.classList.add("hover");
    }
  
    async _onClick(event) {
      event.preventDefault();
  
      const params = {};
      const fetchOptions = {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      };
      const result = await fetch('/create-diary', fetchOptions);
      const json = await result.json();
      window.history.pushState(null, null, window.location.href + 'id/' + json.diaryId);
      this.showDiaryView(json.diaryId);
      this.containerElement.classList.add('hidden');
    }
  }
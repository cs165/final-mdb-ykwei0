class App {
    constructor() {
      this._showDiaryView = this._showDiaryView.bind(this);
      const urlPathString = window.location.pathname;
      const parts = urlPathString.split('/');
      if (parts.length > 2 && parts[1] === 'id') {
        const diaryId = parts[2];
        this._showDiaryView(diaryId);
      } else {
        this._showHomeView();
      }
    }
  
    _showHomeView() {
      const viewContainer = document.querySelector('#home-view');
      const homeView = new HomeView(viewContainer, this._showDiaryView);
    }
  
    _showDiaryView(diaryId) {
       const viewContainer = document.querySelector('#journal-view');
       const journalView = new DiaryView(viewContainer, diaryId);
    }
  }
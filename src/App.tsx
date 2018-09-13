import * as React from 'react';
import './App.css';
import Shapebox from './demo/Shapebox';
import Editorbox from './demo/Editor';
import Attrsbox from './demo/Attrsbox';
class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="App">
        <Shapebox />
        <Editorbox />
        <Attrsbox />
      </div>
    );
  }
}

export default App;

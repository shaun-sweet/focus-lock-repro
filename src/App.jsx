import React from 'react';
import './App.css';
import { DialogContent, DialogOverlay } from '@reach/dialog';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>this one broken, check console for logs</h1>;
    }

    return this.props.children;
  }
}

function App() {
  const [showWorking, setShowWorking] = React.useState(true);
  return (
    <div className="App">
      <h1>Showing: {showWorking ? 'Working' : 'Bugged'} input</h1>
      <br />
      <button onClick={() => setShowWorking(!showWorking)}>
        Toggle working/not working
      </button>
      {showWorking && (
        <ErrorBoundary>
          <DialogOverlay>
            <DialogContent aria-label="1">
              <form>
                <input name="working" type="text" />
              </form>
            </DialogContent>
          </DialogOverlay>
        </ErrorBoundary>
      )}
      {!showWorking && (
        <ErrorBoundary>
          <DialogOverlay>
            <DialogContent aria-label="12">
              <form>
                <input name="contains" type="text" />
              </form>
            </DialogContent>
          </DialogOverlay>
        </ErrorBoundary>
      )}
    </div>
  );
}

export default App;

import {createRoot} from 'react-dom/client'
import {flushSync} from 'react-dom'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

// Use flushSync for synchronous rendering to prevent content flash on mobile
flushSync(() => {
  root.render(<App />);
});

import './App.css';
import OTPField from './otpField';

function App() {
  return (
    <div className='App'>
      <h1 className='heading'>react OTP component</h1>
      <OTPField autoFocus fields={5} className='input' />
    </div>
  );
}

export default App;

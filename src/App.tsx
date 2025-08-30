import { useState, type ChangeEvent, type MouseEvent } from 'react';
import { fetchCreateContactForm } from './api/fetchCreateContactForm.ts';
import './App.css';
import ThemeSelect from './ThemeSelect.tsx';

const inputs = [
  { type: 'text', name: 'firstName', placeholder: 'First name' },
  { type: 'text', name: 'lastName', placeholder: 'Last name' },
  { type: 'email', name: 'email', placeholder: 'Email' },
  { type: 'text', name: 'phoneNumber', placeholder: 'Phone number' },
];

export type Form = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
};

export default function App() {
  const [formInfo, setFormInfo] = useState<Form>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [isSpanVisible, setIsSpanVisible] = useState<string>('hidden');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleErrors = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const newFormInfo = { ...formInfo, [name]: value };

    if (!validateName(newFormInfo.firstName) && newFormInfo.firstName.length != 0) {
      setErrorMessage('First name needs to be 3 to 20 letters long');
      setIsSpanVisible('not-hidden');
      return;
    }

    if (!validateName(newFormInfo.lastName) && newFormInfo.lastName.length != 0) {
      setErrorMessage('Last name needs to be 3 to 20 letters long');
      setIsSpanVisible('not-hidden');
      return;
    }

    if (!validateGmail(newFormInfo.email) && newFormInfo.email.length != 0) {
      setErrorMessage('Email needs to be a "gmail"');
      setIsSpanVisible('not-hidden');
      return;
    }

    if (!validatePhoneNumber(newFormInfo.phoneNumber) && newFormInfo.phoneNumber.length != 0) {
      setErrorMessage('Phone needs to be numbers only');
      setIsSpanVisible('not-hidden');
      return;
    }

    if (!validateMessage(newFormInfo.message) && newFormInfo.message.length != 0) {
      setErrorMessage('Message cant be more than 250 letters long');
      setIsSpanVisible('not-hidden');
      return;
    }

    setErrorMessage('');
    setIsSpanVisible('hidden');
  };

  const handleSumbit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      await fetchCreateContactForm(formInfo);

      setFormInfo({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
      setIsSpanVisible('hidden');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ThemeSelect />
      <div className='form-wrapper'>
        <form
          action=''
          className='form'
        >
          <span className='form-wrapper__title'>Contact Form</span>
          {inputs.map(input => {
            return (
              <>
                <input
                  key={input.placeholder}
                  name={input.name}
                  required
                  type={input.type}
                  value={formInfo[input.name as keyof Form]}
                  placeholder={input.placeholder}
                  onChange={e => {
                    handleChange(e);
                    handleErrors(e);
                  }}
                />
              </>
            );
          })}
          <textarea
            name='message'
            required
            value={formInfo.message}
            id=''
            placeholder='Message'
            onChange={e => {
              handleChange(e);
              handleErrors(e);
            }}
          ></textarea>
          <span className={`form-wrapper__errors ${isSpanVisible}`}>{errorMessage}</span>
          <button
            className={`form-wrapper__submit-button ${isLoading ? 'loading' : ''}`}
            type='submit'
            disabled={isLoading}
            onClick={e => handleSumbit(e)}
          >
            {isLoading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
}

function validateName(value: string): boolean {
  if (value.length < 3 || value.length > 20) {
    return false;
  }
  return true;
}

function validateGmail(value: string): boolean {
  if (!value.includes('@gmail.com')) {
    return false;
  }
  return true;
}

function validatePhoneNumber(value: string): boolean {
  if (isNaN(Number(value))) {
    return false;
  }
  return true;
}

function validateMessage(value: string): boolean {
  if (value.length > 250) {
    return false;
  }
  return true;
}

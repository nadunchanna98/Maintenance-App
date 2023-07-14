import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import ComplainForm from './ComplainForm';
import { useNavigation } from '@react-navigation/native';
jest.mock('@react-navigation/native');


jest.mock('@react-native-async-storage/async-storage', () => {
    return {
        getItem: jest.fn(() => Promise.resolve('')),
        setItem: jest.fn(() => Promise.resolve()),
        removeItem: jest.fn(() => Promise.resolve()),
    };
});
describe('ComplainForm', () => {
  test('renders the form inputs', () => {
    const { getByPlaceholder } = render(<ComplainForm />);
    
    const titleInput = getByPlaceholder('Complain Title');
    expect(titleInput).toBeTruthy();
    
    const locationInput = getByPlaceholder('Location');
    expect(locationInput).toBeTruthy();
    
    const descriptionInput = getByPlaceholder('Description');
    expect(descriptionInput).toBeTruthy();
  });

  test('validates required fields on form submission', () => {
    const { getByText } = render(<ComplainForm />);
    const submitButton = getByText('Submit');

    fireEvent.press(submitButton);

    const errorText = getByText('Title is required');
    expect(errorText).toBeTruthy();
  });

  test('updates form values and submits the form', () => {
    const { getByPlaceholder, getByText } = render(<ComplainForm />);
    
    const titleInput = getByPlaceholder('Complain Title');
    const locationInput = getByPlaceholder('Location');
    const descriptionInput = getByPlaceholder('Description');
    const submitButton = getByText('Submit');

    fireEvent.changeText(titleInput, 'Test Title');
    fireEvent.changeText(locationInput, 'Test Location');
    fireEvent.changeText(descriptionInput, 'Test Description');
    fireEvent.press(submitButton);

    
    expect(titleInput.props.value).toBe('Test Title');
    expect(locationInput.props.value).toBe('Test Location');
    expect(descriptionInput.props.value).toBe('Test Description');

    
    expect(handleFormSubmit).toHaveBeenCalledWith({
      title: 'Test Title',
      location: 'Test Location',
      description: 'Test Description',
      image: '',
    });
  });

});

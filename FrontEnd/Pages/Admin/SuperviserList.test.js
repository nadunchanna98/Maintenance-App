import React from "react";
import SuperviserList from "./SuperviserList";
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import axios from 'axios';


// Mock axios get method
jest.mock('axios');

describe('SuperviserList', () => {
  test('renders component and displays data correctly', async () => {
    const mockData = [
      {
        description: 'Supervisor 1',
        status: 'Active',
        userID: 1,
        name: 'John Doe',
        date: '2023-07-11',
      },
      // Add more mock data as needed
    ];

    // Mock the axios.get method to return the mock data
    axios.get.mockResolvedValueOnce({ data: mockData });

    // Render the component
    const { getByText } = render(<SuperviserList />);

    // Wait for the component to fetch data and update
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Check if the header and content are rendered correctly
    expect(getByText('Supervisor 1')).toBeDefined();
    expect(getByText('Active')).toBeDefined();
    expect(getByText('John Doe')).toBeDefined();
    expect(getByText('Date: 2023-07-11')).toBeDefined();

    // Perform additional assertions as needed
  });
});

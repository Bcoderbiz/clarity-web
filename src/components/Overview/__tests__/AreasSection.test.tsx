import { render, screen, fireEvent } from '@testing-library/react';
import AreasSection from '../AreasSection';

describe('AreasSection', () => {
  it('renders the section title', () => {
    render(<AreasSection />);
    expect(screen.getByText('The Areas of Your Life')).toBeInTheDocument();
  });

  it('shows empty state message when no areas exist', () => {
    render(<AreasSection />);
    expect(screen.getByText(/No areas created yet/)).toBeInTheDocument();
  });

  it('opens modal when create button is clicked', () => {
    render(<AreasSection />);
    fireEvent.click(screen.getByText('Create Area'));
    expect(screen.getByText('Create New Area')).toBeInTheDocument();
  });

  it('creates a new area when form is submitted', () => {
    render(<AreasSection />);
    fireEvent.click(screen.getByText('Create Area'));
    
    const input = screen.getByLabelText('Area Name');
    fireEvent.change(input, { target: { value: 'Test Area' } });
    fireEvent.click(screen.getByText('Create'));

    expect(screen.getByText('Test Area')).toBeInTheDocument();
  });
});
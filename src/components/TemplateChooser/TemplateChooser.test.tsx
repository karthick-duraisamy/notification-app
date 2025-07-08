import { render, screen } from '@testing-library/react';

import { TemplateChooser } from './TemplateChooser';

describe('<TemplateChooser />', () => {
  test('it should mount', async () => {
    render(<TemplateChooser onClick={() => true} title="test" subtitle="test" icon={null} />);

    const templateChooser = screen.getByTestId('TemplateChooser');

    expect(templateChooser).toBeInTheDocument();
  });
});

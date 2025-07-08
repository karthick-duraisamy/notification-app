import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TemplateLayout from './Template';
import CommonTestWrapper from '../../components/CommonTestWrapper/CommonTestWrapper';

describe('To render template layout', () => {
  it('rendered reschedule attention testing', () => {
    render(
      <CommonTestWrapper>
        <TemplateLayout />
      </CommonTestWrapper>
    );
    expect(screen.getByTestId('templatelayout')).toBeInTheDocument();
    const getUndoEle = screen.getByTestId('template_undo_action');
    if (getUndoEle) fireEvent.click(getUndoEle);
    const getRedoEle = screen.getByTestId('template_undo_action');
    if (getRedoEle) fireEvent.click(getRedoEle);
  });
  it('To click back button', async () => {
    render(
      <CommonTestWrapper>
        <TemplateLayout />
      </CommonTestWrapper>
    );
    let selectBox = screen.getByTestId('templatelayout');
    if (selectBox) fireEvent.click(selectBox);
    expect(screen.getByText('Back')).toBeInTheDocument();
  });
  it('Checking for layout like mobile', async () => {
    render(
      <CommonTestWrapper>
        <TemplateLayout />
      </CommonTestWrapper>
    );
    let preview_mobile = screen.getByTestId('preview_mobile');
    if (preview_mobile) fireEvent.click(preview_mobile);
  });
  it('Checking for layout like tablet', async () => {
    render(
      <CommonTestWrapper>
        <TemplateLayout />
      </CommonTestWrapper>
    );
    let preview_tablet = screen.getByTestId('preview_tablet');
    if (preview_tablet) fireEvent.click(preview_tablet);
  });
  it('Checking for layout like desktop', async () => {
    render(
      <CommonTestWrapper>
        <TemplateLayout />
      </CommonTestWrapper>
    );
    let preview_desktop = screen.getByTestId('preview_desktop');
    if (preview_desktop) fireEvent.click(preview_desktop);
  });
});

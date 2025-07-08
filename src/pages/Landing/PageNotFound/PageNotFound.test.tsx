import { fireEvent, render, screen } from '@testing-library/react';
import CommonTestWrapper from '@/components/CommonTestWrapper/CommonTestWrapper';
import PageNotFound from './PageNotFound';
import PageNotFoundSection from '../PageNotFound/PageNotFound.lazy';

describe('<PageNotFound />', () => {
  test('it should mount', () => {
    render(
      <CommonTestWrapper>
        <PageNotFound />
      </CommonTestWrapper>
    );

    const pageNotFound = screen.getByTestId('PageNotFound');

    expect(pageNotFound).toBeInTheDocument();
  });
  test('previous page changes', () => {
    render(
      <CommonTestWrapper>
        <PageNotFound />
      </CommonTestWrapper>
    );
    const pageNotFound = screen.getByTestId('previous_btn');
    if (pageNotFound) fireEvent.click(pageNotFound);
  });
  test('PageNotFound lazy Section', () => {
    render(
      <PageNotFoundSection>
        <PageNotFound />
      </PageNotFoundSection>
    );

    const pageNotFound = screen.getByTestId('PageNotFound');

    expect(pageNotFound).toBeInTheDocument();
  });
});

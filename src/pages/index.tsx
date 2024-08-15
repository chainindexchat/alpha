import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import IndexContent from '@/client/content/index';

const Index: NextPageWithLayout = () => {
  return <IndexContent></IndexContent>;
};
Index.getLayout = function getLayout(page: ReactElement) {
  return <div>{page}</div>;
};
export default Index;

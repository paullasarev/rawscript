import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import Button from './button';
import UploadButton from './upload-button';
import ButtonBar from './button-bar';

const styles = {
  maxWidth: '200px',
};
const WidthDecorator = (storyFn) => <div style={styles}>{storyFn()}</div>;

storiesOf('Single Button', module)
  .addDecorator(WidthDecorator)
  .add('single', () => <Button text="Run" action={action('clicked')} arg="run" />)
  .add('multiple args', () => (
    <Button text="Run2" action={action('clicked')} arg={['arg1', 'arg2']} />
  ))
  .add('upload-button', () => <UploadButton text="Upload" action={action('clicked')} />);

storiesOf('Button bar', module)
  .addDecorator(WidthDecorator)
  .add('normal', () => (
    <ButtonBar>
      <Button text="OK" action={action('clicked')} arg="OK" />
      <Button text="Cancel" action={action('clicked')} arg="Cancel" />
    </ButtonBar>
  ))
  .add('right', () => (
    <ButtonBar right>
      <Button text="OK" action={action('clicked')} arg="OK" />
      <Button text="Cancel" action={action('clicked')} arg="Cancel" />
    </ButtonBar>
  ));

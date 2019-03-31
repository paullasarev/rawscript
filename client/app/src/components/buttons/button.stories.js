import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
// import { Welcome } from '@storybook/react/demo';

import Button from './button';
import ButtonBar from './button-bar';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

const styles = {
  maxWidth: '200px',
};
const WidthDecorator = storyFn => <div style={ styles }>{storyFn()}</div>;

storiesOf('Single Button', module)
  .addDecorator(WidthDecorator)
  .add('single', () => (
    <Button text='Run' action={ action('clicked') } arg='run' />
  ))
  .add('multiple args', () => (
    <Button text='Run2' action={ action('clicked') } arg={ ['arg1', 'arg2'] } />
  ))
;

storiesOf('Button bar', module)
  .addDecorator(WidthDecorator)
  .add('normal', () => (
    <ButtonBar>
      <Button text='OK' action={ action('clicked') } arg='OK' />
      <Button text='Cancel' action={ action('clicked') } arg='Cancel' />
    </ButtonBar>
  ))
  .add('right', () => (
    <ButtonBar right>
      <Button text='OK' action={ action('clicked') } arg='OK' />
      <Button text='Cancel' action={ action('clicked') } arg='Cancel' />
    </ButtonBar>
  ))
;

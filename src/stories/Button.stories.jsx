import Button from '../shared/ui/buttons'

export default {
  title: 'shared/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    primary: { control: 'boolean' },
    secondary: { control: 'boolean' },
    warning: { control: 'boolean'},
  },
  args: {
    children: 'Press me!',
    disabled: false,
    primary: false,
    secondary: false,
    warning: false,
  }
}

export const Default = (args) => <Button {...args} />

export const Primary = (args) => <Button {...args} />

Primary.args = {
  primary: true,
  children: 'Primary button',
}

export const Secondary = (args) => <Button {...args} />;

Secondary.args = {
  secondary: true,
  children: 'Secondary button',
}

export const Disabled = (args) => <Button {...args} />;

Disabled.args = {
  disabled: true,
  children: 'Disabled button',
}

export const Warning = (args) => <Button {...args} />;

Warning.args = {
  warning: true,
  children: 'Warning button',
}
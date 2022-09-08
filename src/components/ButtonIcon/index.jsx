import { Button } from 'antd';

const ButtonIcon = ({ children, text, type, onClick, className }) => {
  return (
    <Button
      className={className ? className : ''}
      onClick={onClick}
      type={type ? type : ''}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {children}
      <span style={{ paddingLeft: 10 }}>{text}</span>
    </Button>
  );
};

export default ButtonIcon;

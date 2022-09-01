import { Button } from 'antd';
import Image from 'next/image';

const ButtonIcon = ({ icon, text, type, onClick, className }) => {
  return (
    <Button
      className={className ? className : ''}
      onClick={onClick}
      type={type ? type : ''}
      icon={<Image src={icon} alt="icon" />}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <span style={{ paddingLeft: 10 }}>{text}</span>
    </Button>
  );
};

export default ButtonIcon;

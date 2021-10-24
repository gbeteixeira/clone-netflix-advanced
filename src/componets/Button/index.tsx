//import IconType from 'react-icons';
import './index.css';

interface ButtonProps {
  filled?: boolean;
  label?: string;
  Icon: any;
  rounded?: boolean;
  onClick?: () => void;
}

export default function Button(props: ButtonProps): React.ReactElement {
  const { filled, label, Icon, rounded, /*onClick */} = props;
  const backgroundColor = filled ? 'white' : '#6d6d6db3';
  const fontColor = filled ? 'black' : 'white';
  
  /* 
  if not rounded === normal long style
  if filled ( and rounded) === round style
  if rounded and not filled === outline style
  */
  const style = !rounded ? 'button' : filled ? 'roundButton' : 'outlineRounded';

  return (
    <button className={style} style={{ backgroundColor: `${backgroundColor}`, color: `${fontColor}` }} /*onClick={onClick}*/>
      <Icon className='icon' />
      {!rounded && <span className='label'>{label}</span>}
    </button>
  );
}
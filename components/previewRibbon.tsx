import { FunctionComponent } from 'react';

type Props = {
  title: string;
  color?: string;
  icon?: string;
  ammount?: boolean;
};
const PreviewRibbon: FunctionComponent<Props> = (props) => {
  let color = 'blue';
  if (props.title[0] === '-') {
    color = 'red';
  }
  return (
    <div
      className={`p-2 w-full flex items-center mt-5 bg-white dark:bg-white/10 shadow-md `}
    >
      {props.icon && (
        <i
          style={{ background: props.color }}
          className={`aspect-square rounded text-xl p-3 mr-3 bi bi-${props.icon}`}
        ></i>
      )}
      {!props.ammount && <p className="text-xl">{props.title}</p>}
      {props.ammount && (
        <p style={{ color: color }} className="text-center w-full text-xl">
          {props.title}
        </p>
      )}
    </div>
  );
};

export default PreviewRibbon;

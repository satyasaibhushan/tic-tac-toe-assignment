const Square = props => {
  return (
    <td  className={props.value ? `square ${props.value}` : "square "} onClick={props.onClick}>
      {props.value}
    </td>
  );
};

export default Square;

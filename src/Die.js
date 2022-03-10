export default function Die(props) {
  return (
    <button
      type="button"
      className={props.isHeld ? "btn btn-info dice held" : "btn btn-info dice"}
      onClick={props.holdDice}
    >
      {props.value}
    </button>
  );
}

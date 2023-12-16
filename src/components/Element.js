import rockLogo from "../assets/rock.png";
import paperLogo from "../assets/paper.png";
import scissorLogo from "../assets/scissor.png";

const Element = (props) => {
  const type = props.elem.type;
  const coord = {
    left: `${props.elem.coord[0]}px`,
    top: `${props.elem.coord[1]}px`,
  };

  let logo;
  switch (type) {
    case "rock":
      logo = rockLogo;
      break;
    case "paper":
      logo = paperLogo;
      break;
    case "scissor":
      logo = scissorLogo;
      break;
  }

  return (
    <>
      <img src={logo} alt={type} style={coord} className="element"/>
      {/* <div className={`element ${type}`} style={coord}></div> */}
    </>
  );
};

export default Element;

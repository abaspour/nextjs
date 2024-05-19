import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";


const PriorityDisplay = ({priority}) => {
  return (
    <div className="felx justify-start align-baseline">
      <FontAwesomeIcon icon={faFire} className={`${priority > 0 ? "text-red-400" : "text-slate-400"}`} />
      <FontAwesomeIcon icon={faFire} className={`${priority > 1 ? "text-red-400" : "text-slate-400"}`} />
      <FontAwesomeIcon icon={faFire} className={`${priority > 2 ? "text-red-400" : "text-slate-400"}`} />
      <FontAwesomeIcon icon={faFire} className={`${priority > 3 ? "text-red-400" : "text-slate-400"}`} />
      <FontAwesomeIcon icon={faFire} className={`${priority > 4 ? "text-red-400" : "text-slate-400"}`} />
     </div>
  );
};
export default PriorityDisplay;

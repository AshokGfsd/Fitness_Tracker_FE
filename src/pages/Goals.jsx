import { RxTarget } from "react-icons/rx";
import { useSelector } from "react-redux";
import { GoalCard } from "../components/GoalCard/GoalCard";
import GoalModal from "../components/Modal/GoalModal";
import { PlaceholderCard } from "../components/PlaceholderCard/PlaceholderCard";
import "./Goals.css";
import { selectUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Goals = () => {
  const user = useSelector(selectUser);
  const [state, setState] = useState(false);
  const goals = user.goals;
  const loading = user.loading;
  const goalLoading = user.goalLoading;
  const navigate = useNavigate();
  const suggestions = user.suggestions;

  useEffect(() => {
    if (!user.log) {
      toast.info("Please log-in");
      navigate("/");
    }
  }, []);
  const handleClick = () => {
    setState("Add");
  };
  return (
    <div className="goals">
      {loading && <h4>Loading...</h4>}
      <div className="goals__container">
        <div className="goals__container">
          <h1>Goals</h1>
          {goalLoading.adding && <PlaceholderCard />}          
          {goals.map((goal) => (
            <GoalCard key={goal._id} goal={goal} />
          ))}
        </div>
        <div className="goals__container">
          <h1>Suggestion form others</h1>
          {suggestions.goals.map((goal) => (
            <GoalCard key={goal._id} goal={goal} state={true} />
          ))}
        </div>
      </div>
      <GoalModal state={state} setState={setState} />
      <button onClick={handleClick}>
        <RxTarget />
      </button>
    </div>
  );
};

export default Goals;

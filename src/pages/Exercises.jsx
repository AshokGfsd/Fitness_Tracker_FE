import { ExerciseCard } from "../components/ExerciseCard/ExerciseCard";
import "./Exercises.css";
import { RxLightningBolt } from "react-icons/rx";
import ExerciseModal from "../components/Modal/ExerciseModal";
import { useSelector } from "react-redux";
import { PlaceholderCard } from "../components/PlaceholderCard/PlaceholderCard";
import { selectUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Exercises = () => {
  const user = useSelector(selectUser);
  const [state, setState] = useState(false);
  const exercises = user.todayExercises;
  const loading = user.loading;
  const exerciseLoading = user.exerciseLoading;
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
    <div className="exercises">
      {loading && <h4>Loading...</h4>}
      <div className="exericise__container">
        <div className="exericise__container">
          <h1>Today Exercises</h1>
          {exerciseLoading.adding && <PlaceholderCard />}
          {exercises.length==0&& <h3>PLEASE ADD TODAY Exercise</h3> }
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise._id} {...exercise} />
          ))}
        </div>
        <div className="exericise__container">
          <h1>Suggestion form others</h1>
          {suggestions.exercises.map((exercise) => (
            <ExerciseCard key={exercise._id} {...exercise} state={true} />
          ))}
        </div>
      </div>
      <ExerciseModal state={state} setState={setState} />
      <button onClick={handleClick}>
        <RxLightningBolt />
      </button>
    </div>
  );
};

export default Exercises;

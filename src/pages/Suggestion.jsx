import { RxCopy } from "react-icons/rx";
import { useSelector } from "react-redux";
import { GoalCard } from "../components/GoalCard/GoalCard";
import SuggestionModel from "../components/Modal/SuggestionModel";
import { PlaceholderCard } from "../components/PlaceholderCard/PlaceholderCard";
import "./Suggestion.css";
import { selectUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ExerciseCard } from "./../components/ExerciseCard/ExerciseCard";
import { FoodCard } from "../components/FoodCard/FoodCard";
import { SuggestionCard } from "../components/SuggestionCard/SuggestionCard";

const Suggestion = () => {
  const user = useSelector(selectUser);
  const [state, setState] = useState(false);
  const suggestion = user.yourSuggestions;
  const loading = user.loading;
  const suggestionLoading = user.suggestionsLoading;
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.log) {
      toast.info("Please log-in");
      navigate("/");
    }
  }, []);
  const handleClick = () => {
    setState(!state);
  };
  return (
    <div className="suggestions">
      <h1>Give Suggestions for Others</h1>
      {loading && <h4>Loading...</h4>}
      <div className="suggestions__container">
        <div className="suggestions__container">
          <h2>Exercises Suggestions</h2>
          {suggestionLoading.adding && <PlaceholderCard />}
          {suggestion.exercises.map((exercise) => (
            <SuggestionCard
              key={exercise._id}
              data={exercise}
              suggestion={true}
            />
          ))}
        </div>
        <div className="suggestions__container">
          <h2>Goals Suggestions</h2>
          {suggestionLoading.adding && <PlaceholderCard />}
          {suggestion.goals.map((goal) => (
            <SuggestionCard key={goal._id} data={goal} suggestion={true} />
          ))}
        </div>
        <div className="suggestions__container">
          <h2>Food Suggestions</h2>
          {suggestionLoading.adding && <PlaceholderCard />}
          {suggestion.foods.map((food) => (
            <SuggestionCard key={food._id} data={food} suggestion={true} />
          ))}
        </div>
      </div>
      <SuggestionModel state={state} setState={setState} />
      <button onClick={handleClick}>
        <RxCopy />
      </button>
    </div>
  );
};

export default Suggestion;

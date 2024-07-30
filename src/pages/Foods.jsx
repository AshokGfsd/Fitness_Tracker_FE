import { RxOpacity } from "react-icons/rx";
import { useSelector } from "react-redux";
import { FoodCard } from "../components/FoodCard/FoodCard";
import FoodModal from "../components/Modal/FoodModal";
import { PlaceholderCard } from "../components/PlaceholderCard/PlaceholderCard";
import "./Foods.css";
import { selectUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Foods = () => {
  const user = useSelector(selectUser);
  const foods = user.todayFoods;
  const loading = user.loading;
  const foodLoading = user.foodLoading;
  const [state, setState] = useState(false);
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
    <div className="foods">
      {loading && <h4>Loading...</h4>}
      <div className="foods__container">
        <div className="foods__container">
          <h1>Foods</h1>
          {foodLoading.adding && <PlaceholderCard />}
          {foods.length == 0 && <h3>PLEASE ADD TODAY FOODS</h3>}
          {foods.map((food) => (
            <FoodCard key={food._id} {...food} />
          ))}
        </div>
        <div className="foods__container">
          <h1>Suggestion form others</h1>
          {suggestions.foods.map((food) => (
            <FoodCard key={food._id} {...food} state={true} />
          ))}
        </div>
      </div>
      <FoodModal state={state} setState={setState} />
      <button onClick={handleClick}>
        <RxOpacity />
      </button>
    </div>
  );
};

export default Foods;

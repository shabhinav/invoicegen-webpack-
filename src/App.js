import React, { useEffect } from "react";
import "./App.css";
import { auth } from "./firebase";
import Login from "./Component/Login";
import { login, logout, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Component/Navbar";
import Invoice from "./Component/Invoice";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import InvoiceBasicInfo from "./Component/InvoiceBasicInfo";
import InvoiceCopy from "./Component/InvoiceCopy";
import Preview from "./Component/Preview";

function App(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL
              ? authUser.photoURL
              : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAASFBMVEXw8PB3xdTX5en69PL08vGTzNhyw9Ntw9Kd0NvT4+d5xtRvwtPa5+pxxNP08vCPy9jq7u5jwNG/3OOm0tz+9vSFyNa72+Ku1d7kOy6EAAADxElEQVR4nO2djXKiQBCE/YFdZUFOo3fv/6ZHBD1RU/ZeDUu7didUIGWG+bZnQCvrulhIkiRJkiRJkiRJ0qeqgESZ1Q4K9WuFqE6MaJhVsQqueaXlvl1PDhWflYeyKlZu+Vq+TE1ol9U7E4bsCVEPG0pCu6w+wUMRvj+h+nAeQnkYQ5i/hyIU4RQSoQinimUnEcYR6o4/D6GqVIS3sdSH8xDKwxjC/D0UoQinkG0fcl5p8vdQhCK8jcXZh4nv+FVD6SH6H1LfK4RuO3+fd/u9bjd0O2FfHq/zH7C5G1HaPRzWfTKhTyAMKfrr4XnDZhcUdVsCOm3SqjwBSbVf0AyRYg3ouNm/nhvxk0L0X3jn6yOSFwKIqdggfWGoZpt4Ak+x8UkBK5eeMCQlXM5AiNyf7CQPpyBM62H+hKrSKQjz91B9aCv14RSE+VepPLSV+nAKQnlorOw9nOM1vjy0lZ6XTkGoKhVhnPLvQ93xpyDMvw/loa3Uh1MQykNjzUCY9v+HHaFl9og2rqq64um+q5s8qqe7r1SdH3yJNfwcH1bd68PRBIbn8yMMV42oS+9eC+zVJ394v9v4Q228aoQbvr73mn+/uBz6U719rQPE10KhHtmHwz6l82a7asTxaZmMVScPlXheG2coyxlktISGaZkN1o6VkDEUaVq2HqoPI9JiHCzSgae9W5B6yJiWqpSaEJp+TluljAVPWloiFOE4FmPz0HrIOFikAy/COELG0iJ9Pz7nYJGWFm2VMoYiLS3aPmQMRZqW+jCOkHHgVaUiHMfS3WKOtFSlIhzHYiwt9eFshIyhaD3Uq6cYQsbSoq1SxlCkadESMrY06cCLMI6QsbTk4WyEjOVAOvCf0Iekz9oYB4u0tGirlDEUaWnR9iFjKNK01IdxhIwDryoVIX9an3ClIfWQcbBoCfP3UH0YQ5i/hyKch1DX0hhCLC3oTfT9ihD917AWxMOh43w/ftMCizjUh/slEJ7Jn6BQQFKmhEt3XUziusBEv3LDzaFzv4H1IFalH0K5m+3+EMnJlhBSs0U+osVuIRjLPoSELQxkuFxRcg9pCe08hJZVlYcREuHnEKoPYdF6KEJcIKHZ8n20hG98pcneQ/Xh+xPSeqhXT7BoCfWsDRath7qWwqL1UNdSWPkTqg9FGC1daS6E6kNY+XtIS6g+hEVLKA9xgYRmJ4QWe+0IfafQb+H753/L7THCfdM/fjhb8E9PHH7cvW576NMfFnVbWqmtkSH9Y3bC9gv6MJpibafkJ0TOJ0mSJEmSJEmSJEk56i+zk7G+y6HSlQAAAABJRU5ErkJggg==",
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        {user ? (
          <>
            <Navbar />
            <Switch>
              <Route path="/" exact>
                <Invoice />
              </Route>
              <Route path="/preview" component={Preview} />
              {/* <Route path="/invoice" component={Invoice} /> */}
              <Route path="/basicInfo">
                <InvoiceBasicInfo />
              </Route>
              <Route path="/invoice" component={InvoiceCopy} />
            </Switch>
          </>
        ) : (
          <Login />
        )}
      </Router>
    </div>
  );
}

export default App;

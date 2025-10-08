import { Provider } from "react-redux";
import configureStore from "./configureStore";
import App from "./modules/core/components/App";
import { GlobalStyle } from "./globalStyles";

const store = configureStore();

export default function Root() {
  return (
    <Provider store={store}>
      <App />
      <GlobalStyle />
    </Provider>
  );
}

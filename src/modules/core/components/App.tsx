import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SplitPane from "react-split-pane";
import { ThemeProvider } from "styled-components";

import {
  addContentToCurrentPaneAction,
  createPaneManager,
  IPaneContent,
  NotificationsContainer,
} from "@/edikit";

import { IApplicationState } from "../../../store";
import themes from "../../../themes";
import { IData } from "../../../types";
import { mappingsContentTypes } from "../../mappings";
import { serversContentTypes } from "../../servers";
import { settingsContentTypes } from "../../settings";
import ExplorerContainer from "../containers/ExplorerContainer";
import { loadState } from "../store";
import { Container, Inner } from "./App_styled";
import AppBar from "./AppBar";

const PaneManager = createPaneManager<IApplicationState, IData>({
  namespace: "default",
  contentTypes: [...settingsContentTypes, ...serversContentTypes, ...mappingsContentTypes],
});

function App() {
  const dispatch = useDispatch();
  const hasBeenInitialized = useSelector(
    (state: IApplicationState) => state.core.hasBeenInitialized
  );

  const settings = useSelector((state: IApplicationState) => state.settings.settings);

  const addContentToCurrentPane = useCallback(
    (content: IPaneContent<IData>) => {
      dispatch(addContentToCurrentPaneAction<IData>("default", content));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(loadState());
  }, [dispatch]);

  if (!hasBeenInitialized) return null;

  const theme = themes[settings.theme] || themes.white;
  const AnySplitPane = SplitPane as unknown as React.ComponentType<any>;
  const AnyExplorerContainer = ExplorerContainer as unknown as React.ComponentType<any>;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar theme={theme} />
        <Inner>
          <AnySplitPane split="vertical" defaultSize={260}>
            <AnyExplorerContainer addContentToCurrentPane={addContentToCurrentPane} />
            <PaneManager />
          </AnySplitPane>
        </Inner>
        <NotificationsContainer />
      </Container>
    </ThemeProvider>
  );
}

export default App;

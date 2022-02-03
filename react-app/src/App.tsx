import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import singleSpaReact from "single-spa-react";
import { HomeContent } from "./HomeContent";
import { ParcelContainer } from "./ParcelContainer";
import { useLayoutType } from "./useLayoutType";

export default function App({ name }) {
  return (
    <Router>
      <div>
        <p>{name} is mounted</p>
        <nav>
          <ul>
            <li>
              <Link to="/react">Home</Link>
            </li>
            <li>
              <Link to="/react/about">About</Link>
            </li>
            <li>
              <Link to="/react/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/react/about">
            <About />
          </Route>
          <Route path="/react/users">
            <Users />
          </Route>
          <Route path="/react">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  const pageWidth = useLayoutType();
  const parcelInfo = useMemo(
    () => ({
      load: () =>
        Promise.resolve(
          singleSpaReact({ React, ReactDOM, rootComponent: HomeContent })
        ),
      name: "Home",
      props: { text: "foo bar baz" },
    }),
    []
  );
  return (
    <div>
      Current pageWidth value from the hook: {pageWidth}
      <ParcelContainer parcelInfo={parcelInfo} />
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
